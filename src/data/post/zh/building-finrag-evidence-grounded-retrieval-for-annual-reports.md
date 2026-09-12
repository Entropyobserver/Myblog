---
title: '构建 FinRAG：面向长篇年报的证据定位与可靠问答'
publishDate: 2026-09-12
excerpt: '从 15 年企业年报 PDF 出发，构建可审计的检索 benchmark，并研究 GraphRAG、失败恢复和有证据支撑的问答。'
category: 'Retrieval & Knowledge Systems'
track: 'Research & Applications'
tags: ['RAG', 'Information Retrieval', 'GraphRAG', 'Financial QA', 'Research Story']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'building-finrag-evidence-grounded-retrieval-for-annual-reports'
translationHref: '/building-finrag-evidence-grounded-retrieval-for-annual-reports'
translationLabel: 'English'
---

<div class="my-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900 dark:bg-cyan-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">研究叙事</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    FinRAG 研究一个看似简单的问题：在让语言模型回答之前，系统能否先找对报告、页面和具体证据对象？
  </p>
</div>

RAG 经常被描述成一条很短的 pipeline：切分文档、生成 embedding、检索最近的 chunks，然后把结果交给语言模型。这个描述隐藏了真实企业文档中最困难的部分。

年报很长、有明确结构，而且不同年份之间高度重复。同一个指标可能每年都会出现；一个语义相关的句子可能来自错误年份；数字可能在表格里，而解释它的文字在另一个页面。因此，一条 retrieval result 可能“看起来相关”，却不是回答问题所需的正确证据。

我构建 FinRAG，就是为了把这个问题当作 evidence localisation，而不只是 text similarity 来研究。

## 1. 研究问题

核心问题是：

> RAG 系统如何从跨年度长篇年报中检索完整、可追溯的证据？当第一次检索失败时，系统又该如何检测并恢复？

这个问题有多个层级。系统必须识别正确报告和年份，定位正确页面，找出正确段落或表格；有些问题还需要组合多个 evidence objects。只有完成这些步骤，answer generation 才真正有意义。

## 2. 从 PDF 到可审计 benchmark

项目从 2010–2024 年连续 15 份 Equinor/Statoil 年报开始。

| 阶段 | 规模 |
| --- | ---: |
| 年报 | 15 |
| PDF 页面 | 4,369 |
| Retrieval units | 41,736 |
| QA items | 720 |
| 可回答问题 | 660 |
| 不可回答问题 | 60 |

PDF extraction pipeline 没有把每份文档简单地视为纯文本，而是创建带有稳定 ID 的 evidence objects。每个段落、标题和 table candidate 都保留 document、page、object type 和 object identifier，可以追溯回原始页面。

这种 traceability 改变了评估方式。我不仅能检查一段文字是否包含相似词，还能检查系统是否找到了回答问题必须使用的准确证据。

Benchmark 还包括 item-level human screening、100 页 PDF extraction audit，以及独立的 100-item QA reliability audit。目标不是默认自动生成的数据一定正确，而是让数据质量决策能够被检查和复现。

## 3. 五个相互连接的研究层

FinRAG 由五个相互连接、但边界清晰的研究项目组成：

| 研究层 | 研究内容 |
| --- | --- |
| FinRAG Benchmark | PDF 处理、benchmark 构建、retrieval baselines、可靠性审计和 end-to-end QA |
| FinRAG GraphRAG | Typed graph、graph expansion、path retrieval 和 edge ablation |
| Agentic RAG | Report routing、planning、evidence verification 和 adaptive recovery |
| Embedding Research | Embedding confusion 与 retrieval alignment 的受控分析 |
| Multimodal RAG | 面向图表、图片和视觉结构证据的页面准备与 QA |

这种分层很重要。每个研究层分别管理自己的 scripts 和 results，后续实验只消费前一层的稳定 artifacts。这样可以判断改进究竟来自哪个组件，而不是一次改变整个系统。

## 4. Benchmark 揭示了什么

第一个重要发现是 reference year 非常有价值。Oracle year filtering 能显著提升 retrieval，因为它可以避免其他年份中语义相似的段落超过正确证据。

但是，year filtering 不能解决 evidence completeness。对于 multi-hop questions，系统在 91.1% 的问题中至少找到了一个 required object，却只在 53.3% 的问题中找全了所有必要证据。

这个差距是整个项目的核心：

```text
部分证据不等于完整证据
主题相关不等于可以回答
一个正确 chunk 不等于完整的 multi-hop context
```

同样的差距也出现在 end-to-end QA。Hybrid retrieval 加 reranking 把 answer accuracy 从 58.5% 提高到 71.1%，而使用 gold evidence 的 oracle setting 达到 82.1%。Retrieved evidence 与 oracle evidence 之间仍然存在明显差距，说明 retrieval 依旧是主要瓶颈。

## 5. GraphRAG 带来了什么，又没有带来什么

Graph retrieval 可以找回 semantic similarity 遗漏的证据，但“增加连接”本身不一定有用。

我构建了 typed metadata evidence graph，并分别评估不同关系。Same-entity links 提供了最强的有效关系信号，same-metric links 带来较小的正向作用，而 adjacent-page links 经常引入噪声：相邻页面在结构上相关，却不一定包含问题需要的证据。

在受控 candidate fusion 下，selected graph candidates 把 object Recall@10 从 0.838 提升到 0.856。加入 typed graph paths 对 object recall 的额外提升很小，但把 page Recall@10 从 0.903 提高到 0.918。

Per-question 分析比总体分数更有解释力：selected graph fusion 找回了 hybrid baseline 遗漏的 18 个问题，但同时丢失了原来命中的 6 个问题。因此，GraphRAG 提供的是选择性的 complementary value，而不是对强 hybrid retrieval 的全面替代。

## 6. Failure-aware recovery

面向实际使用的 RAG 系统不应该假设第一次检索一定足够。项目的 agentic 部分研究第二个问题：

```text
初始检索
  -> 检测潜在失败
  -> 选择 recovery action
  -> 再次检索
  -> 验证或拒答
```

在一个 offline diagnostic experiment 中，BM25-year retrieval 在 80 个 stress-test questions 中失败了 38 个。非 oracle retrieval settings 找回了其中 18 个；另外 14 个只有在直接提供 gold evidence 时才能回答；剩余 6 个仍未解决。

这里必须严格区分结果。不能说系统成功恢复了 32 个问题，因为其中 14 个使用的是 oracle evidence，只代表理论上界，不是可部署的系统能力。严谨的 system recovery 结果是 18/38，也就是 47.4%。

后续 held-out experiments 进一步比较 threshold、learned 和 benefit-aware recovery policies。这些结果有潜力，但仍然属于 exploratory research：failure classifier 更准确，不一定会自动带来更好的 recovery policy；较小的数值提升也需要谨慎的显著性检验。

## 7. 我从项目中学到的几点

### Retrieval 需要结构信息

长文档检索依赖 document identity、year、page structure、object type，以及 evidence units 之间的关系。一个 embedding vector 只能表达其中一部分。

### 评估必须测量 evidence completeness

“命中任意一个 gold object”可能掩盖 multi-hop failure。因此，我分别评估 object recall、page recall、complete-evidence recall 和 multi-hop all-evidence recall。

### 更多 candidates 也可能造成伤害

Graph expansion 和 recovery 可以增加缺失证据，也可能把原本正确的结果挤出 top-k。每种 recovery policy 都需要同时报告 benefit 和 harm。

### Oracle 是诊断工具，不是系统能力

Oracle year 和 oracle evidence experiments 可以帮助定位瓶颈，但不能和真实系统表现混在一起。

### Abstention 也是一种系统能力

如果没有足够证据，明确返回 insufficient evidence 往往比生成流畅但没有依据的答案更可靠。真正困难的是：在已有足够 context 时，减少错误拒答。

## 8. 局限

当前项目集中在一家公司和一种文档类型。年报的跨年度重复结构让它成为有价值的研究场景，但结论未必能直接推广到其他公司、语言或 enterprise archives。

Benchmark 比未经审计的 synthetic dataset 更可靠，但 human screening 和抽样审计仍不能消除所有 annotation error。一些 visual questions 也确实需要 multimodal model，而不能只依赖从图表中抽取的文本。

此外，部分 agentic results 来自受控 offline experiments。它们展示了研究方向，但还不能被描述为 production-ready autonomous RAG system。

## 9. 下一步

最值得继续推进的方向包括：

- 测试对其他公司年报的迁移能力；
- 加强 multimodal evidence extraction 和 visual QA；
- 直接优化 recovery utility，而不只预测 failure label；
- 改进 semantic answer verification；
- 在现实成本设定下研究 calibration 和 abstention；
- 更明确地连接 retrieval error 与 downstream answer error。

## 面试回答

FinRAG 是我面向长篇年报构建的 evidence-grounded retrieval 研究项目。我建立了一条 PDF-to-benchmark pipeline，覆盖 15 份 Equinor/Statoil 年报、4,369 页、41,736 个 retrieval units 和 720 个经过审计的 QA items。项目系统比较 sparse、dense、hybrid、reranked、hierarchical、graph、agentic 和 multimodal retrieval。核心发现是：即使 topical retrieval 已经很强，完整证据检索仍然困难，尤其是在 multi-hop questions 上。Graph structure 和 adaptive recovery 可以提供帮助，但作用具有选择性，所以我同时评估 recovered cases 和 harmed cases，并严格把 oracle 上界与可部署系统表现分开。
