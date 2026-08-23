---
title: '样本级归因：Gradient Similarity、Influence Functions 与 TracIn'
publishDate: 2026-08-23
excerpt: '面向 NLP 的样本级归因方法比较：gradient similarity、influence functions 与 TracIn，以及它们的假设和局限。'
category: 'Explainability and Responsible AI'
track: 'Research & Applications'
tags: ['Training Data Attribution', 'Explainability', 'Model Evaluation', 'Shapley Values', 'NLP Research']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'instance-level-attribution-gradient-influence-tracin'
translationHref: '/instance-level-attribution-gradient-influence-tracin'
translationLabel: 'English'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">样本级归因很适合诊断，但 gradient similarity、influence functions 和 TracIn 估计的是不同意义上的 influence，不能混为一谈。</p>
</div>

这篇属于 **Training Data Attribution for NLP and LLM Research** 系列。它既是我的研究笔记，也是面试准备材料：每篇文章都要帮我把概念讲清楚，连接到自己的 thesis，并说明哪些部分可以成为博士阶段的扩展。

**核心问题：** 哪些训练样本和某个预测或评估行为最相关？

![Training data attribution map](/images/blog/training-data-attribution-map.png)

## 直觉

Gradient similarity 问两个样本是否会把参数推向相似方向。Influence functions 近似某个训练样本被上调权重后会怎样。TracIn 则跨多个 checkpoint 累积梯度对齐，避免一次昂贵的 inverse-Hessian，但依赖保存的训练状态。

这在 NLP 和 LLM 研究中特别重要，因为模型行为很大程度上由数据混合方式塑造。模型可能因为大规模网页文本而流畅，因为专业文档而领域准确，因为 curated instruction data 而更安全，也可能因为语料中重复出现的偏差模式而产生偏见。Training-data attribution 让我们可以系统地讨论这些问题，而不是笼统地说“数据很重要”。

## 形式化视角

Gradient similarity 常用 cos(grad_theta L(z_train), grad_theta L(z_test))。Influence functions 用 -grad L_test^T H^{-1} grad L_train 近似上调 z_train 对测试损失的影响。TracIn 跨 checkpoints 求梯度内积和，通常按学习率加权。

解释 attribution score 之前，必须先定义清楚实验设置：

| 设计选择         | 必须回答的问题                                                 |
| ---------------- | -------------------------------------------------------------- |
| Attribution unit | 谁获得贡献：source、group、document、example 还是 token？      |
| Utility function | 解释哪种行为：质量、术语、风格、事实性还是安全性？             |
| Intervention     | 是加入、删除、重加权、修正，还是重新训练？                     |
| Estimator        | 分数来自 exact、sampling、gradient、surrogate 还是 heuristic？ |
| Uncertainty      | 分数在 seed、样本、指标和评估集上是否稳定？                    |

## NLP / LLM 例子

如果 MT 中某个石油术语翻译错了，基于梯度的检索可能找到术语或句法模式相似的训练句对。这对错误分析有帮助，但仍需要验证：被检索出的样本可能和错误相关，却不一定导致错误。

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

我会清楚区分这些方法。Gradient similarity 更简单便宜；influence functions 更接近因果干预思想，但依赖较强近似；TracIn 是基于 checkpoint 的实用替代。对我当前工作来说，样本级方法是 group-level attribution 之后的诊断扩展。

## 参考资料和阅读路径

- Lloyd Shapley, _A Value for n-Person Games_.
- Ghorbani and Zou, _Data Shapley: Equitable Valuation of Data for Machine Learning_.
- Koh and Liang, _Understanding Black-box Predictions via Influence Functions_.
- Pruthi et al., _Estimating Training Data Influence by Tracing Gradient Descent_.
- Ilyas et al., _Datamodels: Predicting Predictions from Training Data_.
- Rei et al., _COMET: A Neural Framework for MT Evaluation_.
