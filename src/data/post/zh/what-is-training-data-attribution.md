---
title: '什么是 Training Data Attribution？'
publishDate: 2026-08-23
excerpt: '从 NLP 与 LLM 研究角度解释 training-data attribution：它解释什么、它和 feature attribution 有什么不同，以及为什么它对模型评估和数据中心研究重要。'
category: 'Explainability and Responsible AI'
track: 'Research & Applications'
tags: ['Training Data Attribution', 'Explainability', 'Model Evaluation', 'Shapley Values', 'NLP Research']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'what-is-training-data-attribution'
translationHref: '/what-is-training-data-attribution'
translationLabel: 'English'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Training-data attribution 不是解释输入句子里的哪个词导致了输出，而是追问：在推理发生之前，哪些训练数据源、数据组、文档或样本塑造了这个模型行为。</p>
</div>

这篇属于 **Training Data Attribution for NLP and LLM Research** 系列。它既是我的研究笔记，也是面试准备材料：每篇文章都要帮我把概念讲清楚，连接到自己的 thesis，并说明哪些部分可以成为博士阶段的扩展。

**核心问题：** 训练数据中的哪些部分，对某个模型行为负有责任？

![Training data attribution map](/images/blog/training-data-attribution-map.png)

## 直觉

普通可解释性经常盯着一次预测：输入里的哪些 token 影响了这个答案？Training-data attribution 把镜头往前推，关注模型形成的过程：如果我们能比较不同训练集训练出的模型，哪些训练数据应该得到贡献或责任？

这在 NLP 和 LLM 研究中特别重要，因为模型行为很大程度上由数据混合方式塑造。模型可能因为大规模网页文本而流畅，因为专业文档而领域准确，因为 curated instruction data 而更安全，也可能因为语料中重复出现的偏差模式而产生偏见。Training-data attribution 让我们可以系统地讨论这些问题，而不是笼统地说“数据很重要”。

## 形式化视角

最小形式化方式是定义一个 utility function u(D)，它衡量模型在训练集 D 上训练后表现出的某种行为。归因就是给某个单位 i（数据源、数据组、文档、样本等）分配分数 phi_i，看加入、删除、重加权或干预该单位时 u 如何变化。

解释 attribution score 之前，必须先定义清楚实验设置：

| 设计选择         | 必须回答的问题                                                 |
| ---------------- | -------------------------------------------------------------- |
| Attribution unit | 谁获得贡献：source、group、document、example 还是 token？      |
| Utility function | 解释哪种行为：质量、术语、风格、事实性还是安全性？             |
| Intervention     | 是加入、删除、重加权、修正，还是重新训练？                     |
| Estimator        | 分数来自 exact、sampling、gradient、surrogate 还是 heuristic？ |
| Uncertainty      | 分数在 seed、样本、指标和评估集上是否稳定？                    |

## NLP / LLM 例子

在英挪领域机器翻译里，模型行为可以是 petroleum 测试句上的 COMET、reservoir pressure 等术语的 TermF1，或者输出更像 Bokmål 的倾向。归因单位可以是 NPD 来源、书面语标准组，或者一类文档。好的归因结论必须把这些选择说清楚。

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

Training-data attribution 研究训练数据如何贡献于模型行为。在我的项目中，我主要关注领域机器翻译中的 group-level attribution：先定义可解释的数据组，再在受控的数据 coalition 下训练或评估模型，并观察质量、术语和风格如何变化。我会把 attribution 视为数据影响的证据，而不是未经干预验证的因果证明。

## 参考资料和阅读路径

- Lloyd Shapley, _A Value for n-Person Games_.
- Ghorbani and Zou, _Data Shapley: Equitable Valuation of Data for Machine Learning_.
- Koh and Liang, _Understanding Black-box Predictions via Influence Functions_.
- Pruthi et al., _Estimating Training Data Influence by Tracing Gradient Descent_.
- Ilyas et al., _Datamodels: Predicting Predictions from Training Data_.
- Rei et al., _COMET: A Neural Framework for MT Evaluation_.
