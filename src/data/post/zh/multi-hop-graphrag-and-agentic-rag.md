---
title: 'Multi-hop、GraphRAG 与 Agentic RAG：为什么一次检索不够？'
publishDate: 2026-09-12T13:00:00+02:00
excerpt: '用图理解多跳证据、图结构检索、query planning、迭代搜索、验证与 retry，以及 Agentic RAG 的能力边界。'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'Multi-hop', 'GraphRAG', 'Agentic RAG', 'Query Planning']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'multi-hop-graphrag-and-agentic-rag'
translationHref: '/multi-hop-graphrag-and-agentic-rag'
translationLabel: 'English'
series: 'RAG 基础'
seriesOrder: 6
seriesTotal: 6
seriesHref: '/zh/series/rag-foundations'
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Multi-hop 描述一个问题需要相互连接的多项证据；GraphRAG 用关系结构组织或检索知识；Agentic RAG 让控制器能够规划、搜索、检查与重试。三者可以组合，但不是同义词。
  </p>
</div>

[上一篇](/zh/evaluating-retrieval-systems)区分了部分证据和完整证据。系列最后一篇讨论：一次 retrieval call 无法收集完整证据时，系统应该怎样继续？

![Multi-hop 问题通过多个检索步骤连接证据](/images/blog/multi-hop-evidence-chain-zh.svg)

## 1. 什么让一个问题成为 Multi-hop？

一个 **hop** 是依赖证据的推理步骤。Multi-hop question 需要两项或更多相互连接的事实，而这些事实可能位于不同段落、页面、表格或文档。

例如：

1. 找到报告提到的三个安哥拉区块；
2. 找到三个区块的权益液体产量合计；
3. 找到挪威境外权益液体总产量；
4. 计算或核对比例。

关键不是步骤数量，而是**依赖关系**：后一次搜索可能需要前一步刚发现的实体或数值。

## 2. 为什么 One-shot Top-k 会失败？

单个 query embedding 把完整问题压缩成一个向量。最终证据未必重复原问题的表达，而每个 chunk 可能只回答一个 sub-question。

一次检索可能返回许多主题相关段落，却漏掉连接证据的 bridge entity 或计算所需的 denominator。增大 (k) 会增加 candidates 和 noise，但不能保证所有 hops 都出现。

## 3. Query Decomposition 与 Iterative Retrieval

Planner 可以把复杂问题拆成 sub-queries：

```text
原始问题
  ├─ 涉及哪些区块？
  ├─ 它们的产量合计是多少？
  └─ 用来比较的总量是多少？
```

系统分别检索，保存已经找到的证据和仍未解决的变量，再用中间结果构造下一次 query。

这种方法能提高覆盖，但错误 decomposition 也可能引入原问题没有的假设。每个 sub-query 都应能追溯到原问题，中间 claim 也应引用证据。

## 4. GraphRAG 是什么？

**GraphRAG** 是一类在 indexing、retrieval、organization 或 generation 中使用图结构的 RAG 设计。Node 可以表示 entity、claim、section、page、table 或 chunk；edge 可以表示关系、引用、共现、层级或时间连接。

![Vector Retrieval、Graph Traversal 与 Agentic Control 解决不同问题](/images/blog/rag-strategy-comparison-zh.svg)

当关系很重要时，图结构特别有用：

- 沿同一实体连接多份文档；
- 把表格与标题、脚注和来源页连接起来；
- 遍历 company → asset → country → metric；
- 汇总一个 related-entity community 的信息。

GraphRAG 不等于“把 embeddings 放进 graph database”。真正重要的是：哪些 nodes 与 edges 编码了对检索有用的结构。

## 5. Local Question 与 Global Question

图检索系统可以支持不同范围的问题：

- **Local search** 从具体 entity 出发，探索附近的 facts 或 text units；
- **Global search** 汇总语料大范围的模式，可能使用 graph communities 与预先生成的 summaries。

Microsoft Research 的 GraphRAG 工作重点之一，是回答“整个数据集中有哪些主要主题”这类 corpus-level question，因为普通 nearest-neighbour retrieval 很难表示这种需求。这是一种重要架构，但不是所有 graph-based RAG 的唯一含义。

## 6. Agentic RAG 增加了什么？

**Agentic RAG** 增加一个能根据中间状态选择并重复动作的 controller。一个有边界的循环可以：

1. 分类 query；
2. 规划 sub-queries；
3. 选择 lexical、vector、graph、SQL 或 web tools；
4. 检查 retrieved evidence；
5. 找出缺失信息或冲突；
6. 改写 query 并 retry；
7. 回答、拒答或请求澄清。

![具有显式停止条件的 Agentic RAG 有界循环](/images/blog/agentic-rag-bounded-loop-zh.svg)

“Agentic” 应描述真实可观察的 control flow，而不是仅仅表示系统用了 LLM。固定的 retrieve-once-then-generate pipeline，不会因为 prompt 换了名字就变成 agentic。

## 7. GraphRAG 与 Agentic RAG 可以组合

它们描述不同维度：

| 概念        | 主要关注                 | 常见机制                                 |
| ----------- | ------------------------ | ---------------------------------------- |
| Multi-hop   | 问题需要什么             | 多项相互依赖的证据                       |
| GraphRAG    | 知识与关系如何表示、遍历 | Nodes、edges、communities、paths         |
| Agentic RAG | 检索动作如何随时间控制   | Planning、tool choice、reflection、retry |

一个 agent 可以在某一 hop 使用 graph retriever，处理编号时使用 BM25，处理改写时使用 vector retriever。GraphRAG 也可以在没有 agentic loop 的情况下运行。

## 8. Retry 必须有原因，也必须停止

盲目 retry 往往只返回相同证据。有效 retry 应根据已诊断的问题改变搜索：

- 缺失实体 → 搜索 alias；
- 年份错误 → 增加 metadata filter；
- 缺少 denominator → 发出针对性 sub-query；
- 数值冲突 → 检索定义与单位；
- extraction confidence 低 → 返回原始页面。

系统还应限制 hops、tool calls、time、tokens 和 repeated evidence。当证据充分、没有新证据、预算耗尽，或不确定性要求拒答时停止。

## 9. 新能力也会带来新失败

Adaptive retrieval 可以改善困难问题，但也引入 planning error、error propagation、cycle、tool failure、更高 latency 和更差 reproducibility。Graph construction 还会引入 entity resolution 与 relation extraction 错误；community summary 可能忽略少数证据。

更复杂不等于更可靠。应该与强而简单的 baseline 比较，并按 question type 衡量收益。

## 10. 怎样评价 Multi-step System？

除最终答案外，还应记录：

- complete-evidence success 与 hop coverage；
- 每个 intermediate claim 是否正确；
- query plan 是否有效；
- 每增加一步带来的 retrieval gain；
- 重复或浪费的 calls；
- latency、token use 与 monetary cost；
- stop / abstain decision 是否正确；
- 最终 claims 到 source evidence 的可追溯性。

最终答案可能正确，但 reasoning trace 中仍包含没有证据的 claim。因此要评价完整 evidence path，而不仅是最后一句话。

## 11. 一个实用的逐级策略

优先使用能回答问题的最简单路径：

```text
简单事实问题 → hybrid retrieve + rerank
缺少相互连接的证据 → decomposition + iterative retrieval
关系密集问题 → graph traversal
证据不确定或冲突 → bounded agentic verification
证据不足 → abstain
```

这样普通 query 保持快速，只把昂贵的 control loop 留给真正需要它的问题。

## 延伸阅读

- [HotpotQA：Diverse, Explainable Multi-hop Question Answering](https://aclanthology.org/D18-1259/)
- [Microsoft Research：From Local to Global—A Graph RAG Approach](https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/)
- [Microsoft GraphRAG Repository](https://github.com/microsoft/graphrag)
- [Agentic Retrieval-Augmented Generation: A Survey](https://arxiv.org/abs/2501.09136)

<div class="my-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-between">
  <a href="/zh/evaluating-retrieval-systems">← 5. 如何评价检索系统</a>
  <a href="/zh/series/rag-foundations">查看完整 RAG 基础系列 →</a>
</div>
