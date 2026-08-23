---
title: 'Coalitions、边际贡献与 Shapley Values'
publishDate: 2026-08-23
excerpt: '数据归因中的 Shapley 基础：coalition value、边际贡献、跨上下文平均，以及为什么它比一次 ablation 更全面。'
category: 'Explainability and Responsible AI'
track: 'Research & Applications'
tags: ['Training Data Attribution', 'Explainability', 'Model Evaluation', 'Shapley Values', 'NLP Research']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'coalitions-marginal-contributions-shapley-values'
translationHref: '/coalitions-marginal-contributions-shapley-values'
translationLabel: 'English'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Shapley value 是一个单位在许多 coalition context 中的期望边际贡献。它问的不只是这个单位单独有没有用，而是它被加入不同数据子集时平均带来多少变化。</p>
</div>

这篇属于 **Training Data Attribution for NLP and LLM Research** 系列。它既是我的研究笔记，也是面试准备材料：每篇文章都要帮我把概念讲清楚，连接到自己的 thesis，并说明哪些部分可以成为博士阶段的扩展。

**核心问题：** 当数据单位之间存在交互时，Shapley values 如何定义公平贡献？

![Training data attribution map](/images/blog/training-data-attribution-map.png)

## 直觉

训练数据很少独立发挥作用。一个石油术语表可能只有在模型也看到足够句子上下文时才有价值；一个噪声网页源在干净数据很少时可能伤害很大，但当干净数据很大时影响变小。Shapley values 把这种上下文依赖显式化。

这在 NLP 和 LLM 研究中特别重要，因为模型行为很大程度上由数据混合方式塑造。模型可能因为大规模网页文本而流畅，因为专业文档而领域准确，因为 curated instruction data 而更安全，也可能因为语料中重复出现的偏差模式而产生偏见。Training-data attribution 让我们可以系统地讨论这些问题，而不是笼统地说“数据很重要”。

## 形式化视角

给定单位集合 N 和 utility v(S)，单位 i 的 Shapley value 是所有不包含 i 的 coalition S 上 v(S union {i}) - v(S) 的加权平均。权重对应所有可能的加入顺序。常见性质包括 efficiency、symmetry、dummy 和 additivity。

解释 attribution score 之前，必须先定义清楚实验设置：

| 设计选择         | 必须回答的问题                                                 |
| ---------------- | -------------------------------------------------------------- |
| Attribution unit | 谁获得贡献：source、group、document、example 还是 token？      |
| Utility function | 解释哪种行为：质量、术语、风格、事实性还是安全性？             |
| Intervention     | 是加入、删除、重加权、修正，还是重新训练？                     |
| Estimator        | 分数来自 exact、sampling、gradient、surrogate 还是 heuristic？ |
| Uncertainty      | 分数在 seed、样本、指标和评估集上是否稳定？                    |

## NLP / LLM 例子

在四组 MT 实验中，我可以训练或近似评估 {general}、{domain}、{Bokmål-like}、{Nynorsk-like} 等 coalition。一个组如果在许多不同上下文中加入后都提升指标，就会获得较高贡献。

所以我不想把 attribution 写成普通可解释性教程。对我的背景来说，它最自然地连接到 multilingual and domain-specific NLP：低资源设定、技术术语、书面语标准差异，以及不止一个 headline metric 的模型评估。

## 和我的 thesis 的关系

在我的 thesis 叙事中，training-data attribution 的价值在于把模糊的数据问题变成实验设计：

1. 定义可解释的数据单位；
2. 定义要解释的模型行为；
3. 比较受控的数据 coalition 或 intervention；
4. 估计贡献；
5. 报告不确定性和局限；
6. 判断证据是否足够支持更强的因果式表述。

这个结构能帮助我避免 overclaiming。一个分数不会自动成为因果解释；它是特定设置下得到的测量结果。

## 我已经完成、理解、以及博士阶段可以扩展的内容

| 层次                  | 状态                                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 已完成 / thesis-ready | Group-level attribution、coalition thinking、基于指标的 utilities、谨慎解释、random baselines、bootstrap-style reliability checks。      |
| 理解但未必完整实现    | Instance-level gradient attribution、influence functions、TracIn、Monte Carlo Shapley、surrogate/datamodel approximations。              |
| 很适合博士扩展        | Hierarchical attribution、intervention-based validation、factuality/style-specific utilities、面向 LLM 数据混合的 scalable attribution。 |

## 面试回答版本

我会把 v(S) 定义为用 coalition S 训练出的模型评估分数，然后计算或近似每个组的平均边际贡献。关键点是 Shapley 不把数据贡献简化成一次 leave-one-out，而是跨 coalition context 取平均，这在数据组存在交互时很重要。

## 参考资料和阅读路径

- Lloyd Shapley, _A Value for n-Person Games_.
- Ghorbani and Zou, _Data Shapley: Equitable Valuation of Data for Machine Learning_.
- Koh and Liang, _Understanding Black-box Predictions via Influence Functions_.
- Pruthi et al., _Estimating Training Data Influence by Tracing Gradient Descent_.
- Ilyas et al., _Datamodels: Predicting Predictions from Training Data_.
- Rei et al., _COMET: A Neural Framework for MT Evaluation_.
