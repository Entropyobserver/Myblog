---
title: '面试笔记：如何解释我的 Training-Data Attribution 论文'
publishDate: 2026-08-23
excerpt: '面试中解释 training-data attribution 论文的叙事模板：研究问题、方法、贡献、局限和博士阶段扩展。'
category: 'Explainability and Responsible AI'
track: 'Research & Applications'
tags: ['Training Data Attribution', 'Explainability', 'Model Evaluation', 'Shapley Values', 'NLP Research']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'interview-notes-training-data-attribution-thesis'
translationHref: '/interview-notes-training-data-attribution-thesis'
translationLabel: 'English'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">强的面试回答要区分：我已经完成了什么、我理解但尚未完整实现什么、我希望在博士阶段扩展什么。这种诚实会让研究叙事更强，而不是更弱。</p>
</div>

这篇属于 **Training Data Attribution for NLP and LLM Research** 系列。它既是我的研究笔记，也是面试准备材料：每篇文章都要帮我把概念讲清楚，连接到自己的 thesis，并说明哪些部分可以成为博士阶段的扩展。

**核心问题：** 我应该如何在面试中清楚解释这篇论文？

![Training data attribution map](/images/blog/training-data-attribution-map.png)

## 直觉

面试官不只想听最终指标。他们更想知道我是否能定义研究问题、解释方法选择、理解局限，并提出下一步有科学意义的扩展。

这在 NLP 和 LLM 研究中特别重要，因为模型行为很大程度上由数据混合方式塑造。模型可能因为大规模网页文本而流畅，因为专业文档而领域准确，因为 curated instruction data 而更安全，也可能因为语料中重复出现的偏差模式而产生偏见。Training-data attribution 让我们可以系统地讨论这些问题，而不是笼统地说“数据很重要”。

## 形式化视角

一个简洁结构是：problem -> gap -> method -> evidence -> limitation -> next step。对这篇论文来说，问题是理解哪些训练数据组影响领域 MT 行为；方法是带有明确定义 utility 和可靠性检查的 group-level coalition attribution。

解释 attribution score 之前，必须先定义清楚实验设置：

| 设计选择         | 必须回答的问题                                                 |
| ---------------- | -------------------------------------------------------------- |
| Attribution unit | 谁获得贡献：source、group、document、example 还是 token？      |
| Utility function | 解释哪种行为：质量、术语、风格、事实性还是安全性？             |
| Intervention     | 是加入、删除、重加权、修正，还是重新训练？                     |
| Estimator        | 分数来自 exact、sampling、gradient、surrogate 还是 heuristic？ |
| Uncertainty      | 分数在 seed、样本、指标和评估集上是否稳定？                    |

## NLP / LLM 例子

我会解释我关注低资源/领域 MT，因为数据质量和数据组成对模型影响很大。我不只是报告一个 best model，而是追问哪些数据组贡献于质量、术语或风格。这连接了 explainability、evaluation 和 data-centric AI。

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

我的论文研究领域机器翻译中的 training-data attribution。我定义可解释的数据组，通过 coalition-style 实验评估它们的边际贡献，并分析不同数据组如何影响质量、术语和风格。主要贡献不只是一些分数，而是一个围绕多语言模型行为提出 data-centric 问题的框架。局限包括可扩展性、近似误差，以及需要更强的 intervention-based validation。博士阶段我会扩展到 hierarchical attribution、样本级验证，以及 LLM factuality 和 style 的归因。

## 参考资料和阅读路径

- Lloyd Shapley, _A Value for n-Person Games_.
- Ghorbani and Zou, _Data Shapley: Equitable Valuation of Data for Machine Learning_.
- Koh and Liang, _Understanding Black-box Predictions via Influence Functions_.
- Pruthi et al., _Estimating Training Data Influence by Tracing Gradient Descent_.
- Ilyas et al., _Datamodels: Predicting Predictions from Training Data_.
- Rei et al., _COMET: A Neural Framework for MT Evaluation_.
