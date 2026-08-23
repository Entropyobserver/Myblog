---
title: 'Utility Functions：我们到底在解释哪种模型行为？'
publishDate: 2026-08-23
excerpt: 'Training-data attribution 依赖 utility function。质量、事实性、风格、安全、公平性和术语表现可能指向不同的高影响数据。'
category: 'Explainability and Responsible AI'
track: 'Research & Applications'
tags: ['Training Data Attribution', 'Explainability', 'Model Evaluation', 'Shapley Values', 'NLP Research']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'utility-functions-model-behaviours'
translationHref: '/utility-functions-model-behaviours'
translationLabel: 'English'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">不存在抽象的 attribution score。每一个分数都必须相对于某个 utility：accuracy、COMET、事实性、toxicity、术语保持、风格、鲁棒性，或复合目标。</p>
</div>

这篇属于 **Training Data Attribution for NLP and LLM Research** 系列。它既是我的研究笔记，也是面试准备材料：每篇文章都要帮我把概念讲清楚，连接到自己的 thesis，并说明哪些部分可以成为博士阶段的扩展。

**核心问题：** 当我们给训练数据分配归因分数时，这个分数到底对应哪种模型行为？

![Training data attribution map](/images/blog/training-data-attribution-map.png)

## 直觉

同一批数据可能帮助一种行为、伤害另一种行为。领域数据可能提升石油术语，却降低通用领域流畅度；安全过滤可能减少有害输出，但在某些请求上降低 helpfulness。如果 utility 模糊，归因结论也会模糊。

这在 NLP 和 LLM 研究中特别重要，因为模型行为很大程度上由数据混合方式塑造。模型可能因为大规模网页文本而流畅，因为专业文档而领域准确，因为 curated instruction data 而更安全，也可能因为语料中重复出现的偏差模式而产生偏见。Training-data attribution 让我们可以系统地讨论这些问题，而不是笼统地说“数据很重要”。

## 形式化视角

为行为 j 定义 u_j(D)。一个标量 utility 会得到一个归因向量 phi^j。多维评估会得到多个向量：phi^quality、phi^terminology、phi^style、phi^fairness。比较这些向量通常比压成一个总分更有信息量。

解释 attribution score 之前，必须先定义清楚实验设置：

| 设计选择         | 必须回答的问题                                                 |
| ---------------- | -------------------------------------------------------------- |
| Attribution unit | 谁获得贡献：source、group、document、example 还是 token？      |
| Utility function | 解释哪种行为：质量、术语、风格、事实性还是安全性？             |
| Intervention     | 是加入、删除、重加权、修正，还是重新训练？                     |
| Estimator        | 分数来自 exact、sampling、gradient、surrogate 还是 heuristic？ |
| Uncertainty      | 分数在 seed、样本、指标和评估集上是否稳定？                    |

## NLP / LLM 例子

在英挪 MT 中，我不会只依赖 BLEU。我会用 chrF 或 COMET 看整体质量，用 terminology metrics 看领域术语，在需要时再看风格或书面语标准指标。同一个数据组可能对术语有正贡献，但对风格一致性有负贡献。

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

我项目中的关键设计之一就是 utility function。我会为翻译质量、术语和风格分别定义 utility，因为一个 Shapley 值无法解释所有行为。这也让工作更像研究，而不是简单排名：归因变成了结构化评估问题。

## 参考资料和阅读路径

- Lloyd Shapley, _A Value for n-Person Games_.
- Ghorbani and Zou, _Data Shapley: Equitable Valuation of Data for Machine Learning_.
- Koh and Liang, _Understanding Black-box Predictions via Influence Functions_.
- Pruthi et al., _Estimating Training Data Influence by Tracing Gradient Descent_.
- Ilyas et al., _Datamodels: Predicting Predictions from Training Data_.
- Rei et al., _COMET: A Neural Framework for MT Evaluation_.
