---
title: '为什么需要 Hybrid Retrieval 和 Reranking？从候选到更可靠的证据'
publishDate: 2026-09-12T11:00:00+02:00
excerpt: '用图理解候选生成、BM25 与向量检索融合、Reciprocal Rank Fusion、Cross-Encoder Reranking，以及两阶段检索的边界。'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'Hybrid Retrieval', 'RRF', 'Reranking', 'Cross-Encoder']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'hybrid-retrieval-and-reranking'
translationHref: '/hybrid-retrieval-and-reranking'
translationLabel: 'English'
series: 'RAG 基础'
seriesOrder: 4
seriesTotal: 6
seriesHref: '/zh/series/rag-foundations'
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Hybrid Retrieval 通过组合不同搜索信号扩大覆盖；Reranking 再把更多计算用在较小的候选集上，改善最终顺序。Fusion 负责找到更多可能性，Reranker 负责更仔细地判断。
  </p>
</div>

[上一篇](/zh/keyword-vs-vector-retrieval)说明了 BM25 与 dense retrieval 会以不同方式失败。实际系统可以同时使用两者，而不必强迫一种方法解决所有 query。

![Hybrid Retrieval 融合关键词与向量候选列表](/images/blog/hybrid-retrieval-rrf-zh.svg)

## 1. 为什么 Retrieval 常被分成多个阶段？

真实语料可能包含数百万 chunks。表达能力很强的模型无法以高成本逐一比较 query 与全部 chunks。

常见折中是一个漏斗：

```text
大规模语料
   ↓ 快速候选检索
Top-50 或 Top-100
   ↓ 更强的 Reranker
Top-5 或 Top-10
   ↓ Context 构造
Generator
```

第一阶段主要优化**覆盖率与速度**；第二阶段主要优化候选集内部的**排序精度**。

## 2. Hybrid Retrieval 是什么？

Hybrid retrieval 组合两个或更多 Retriever 的结果。常见方案是并行运行 BM25 与 dense retrieval：

- BM25 提供精确术语、数字、编号和罕见名称；
- dense retrieval 提供同义改写与语义相似；
- metadata filters 执行年份、文档类型等硬约束。

Hybrid retrieval 不是新的“事实检测器”。它只是利用互补信号，构造覆盖更好的 candidate pool。

## 3. 为什么不能直接相加分数？

BM25 score 与 cosine similarity 位于不同数值空间，它们的分布还可能随 query 改变。直接相加，可能只是因为数值尺度不同而让某个 Retriever 控制结果。

常见选择有：

1. 先归一化分数，再组合；
2. 使用 relevance labels 学习 fusion model；
3. 不组合原始分数，而是组合排名。

第三种方法引出 Reciprocal Rank Fusion。

## 4. Reciprocal Rank Fusion（RRF）

RRF 根据文档在每个列表中的排名计算融合分数：

$$
\operatorname{RRF}(d)=\sum_{r\in R}\frac{1}{k+\operatorname{rank}_r(d)}
$$

(R) 是 Retriever 集合，(k) 是削弱极端头部排名影响的常数。一个结果如果在多个列表中都排名靠前，就会获得较高融合分数。

RRF 的优点是不要求原始分数可比；局限是它看不到原始 relevance scores 之间的差距，而且每个 Retriever 必须先返回足够深的列表。

## 5. Reranking 之前还要去重与保留来源

Fusion 后，同一来源可能以多个 overlapping chunks 重复出现。如果 duplicates 占满 Top-k，Generator 能看到的独立证据反而更少。

因此 fusion layer 应保留 source IDs、合并完全重复项、控制 near-duplicates、保留最好的 provenance，同时避免误删文字相似但语义不同的表格行。

## 6. Reranker 改变了什么？

![快速 Retriever 与 Cross-Encoder Reranker 的不同任务](/images/blog/retrieve-rerank-funnel-zh.svg)

常见 neural reranker 是 **cross-encoder**。与 bi-encoder 不同，它把 query 和 candidate 一起读入模型：

```text
[query ; candidate] → Transformer → relevance score
```

Joint attention 让模型能够检查更细的关系：哪个年份修饰哪个指标、句子是否否定，以及 candidate 是否真正回答 query。

Cross-encoder 成本更高，因为每个 query–candidate pair 都需要单独前向计算。所以它通常只重排几十或几百个 candidates，而不是搜索整个 corpus。

## 7. Candidate Recall 是 Reranker 的上限

最重要的限制非常简单：

> Reranker 可以把已经检索到的结果向前移动，但不能找回从未进入候选集的证据。

如果正确表格不在 Top-100 中，即使 Reranker 完美也无法成功。因此应该先测 first-stage Recall@k，再判断是不是 Reranker 的问题。

## 8. Reranking 不等于 Evidence Verification

Relevance score 回答的是“这个 candidate 与 query 多匹配”。它不会自动证明数字正确、所需证据已经找全，或者 citation 真能支持最终 claim。

必须精确满足的条件，应由 metadata constraints 和后续 verifier 检查。对于年报问题，错误年份的表格仍可能语义相关，因此年份一致性需要显式验证。

## 9. 一个实用流程

```text
query
 ├─ BM25 Top-50
 ├─ dense Top-50
 └─ metadata constraints
          ↓
      RRF + deduplication
          ↓
     60 unique candidates
          ↓
    cross-encoder reranker
          ↓
  evidence-aware Top-5 context
```

Candidate depth、fusion、reranker cutoff 与 context size 应分别调试。把所有数字同时增大，通常只会增加延迟和噪声，不保证证据更好。

## 10. 怎样评价这条 Pipeline？

不要只看最终答案，应检查每个边界：

| 阶段             | 核心问题                           |
| ---------------- | ---------------------------------- |
| 单个 Retriever   | 每种方法找到了哪些独有的正确证据？ |
| Fused candidates | 去重之后 Recall 是否提高？         |
| Reranker         | 正确证据是否被移到更前面？         |
| Final context    | 证据是否正确、多样且充分？         |
| Answer           | Generator 是否忠实使用这些证据？   |

比较 BM25、dense、hybrid 和 hybrid + reranker 的 ablation，才能判断增加的复杂度是否值得。

## 延伸阅读

- [Cormack、Clarke 与 Büttcher（2009）：Reciprocal Rank Fusion](https://research.google/pubs/reciprocal-rank-fusion-outperforms-condorcet-and-individual-rank-learning-methods/)
- [Sentence Transformers：Retrieve & Re-Rank](https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html)
- [Sentence Transformers：Cross-Encoders](https://www.sbert.net/examples/cross_encoder/applications/README.html)

<div class="my-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-between">
  <a href="/zh/keyword-vs-vector-retrieval">← 3. 关键词检索与向量检索</a>
  <a href="/zh/evaluating-retrieval-systems">5. 如何评价检索系统 →</a>
</div>
