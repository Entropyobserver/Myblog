---
title: "NLP 研究中的 Training Data Attribution"
publishDate: 2026-08-23
excerpt: "一篇面向研究和面试的 training-data attribution 笔记：归因单位、utility function、Shapley value、influence methods、因果性、可扩展性和不确定性。"
category: "Explainability and Responsible AI"
track: "Research & Applications"
tags: ["Data Attribution", "Explainability", "Model Evaluation", "Shapley Values", "Machine Translation"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "training-data-attribution-for-nlp-research"
translationHref: "/training-data-attribution-for-nlp-research"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Training-data attribution 不是简单问“哪条数据重要”，而是问：在什么归因单位、什么 utility、什么干预和什么不确定性假设下，哪些训练数据影响了模型行为？
  </p>
</div>

这篇文章是给我自己的研究和面试准备写的。它把 training-data attribution 连接到 multilingual/domain machine translation，尤其是我在 English--Norwegian domain adaptation 中使用的 group-level attribution 思路。

这个问题说起来很简单：

> 哪些训练数据影响了这个模型行为？

真正难的是把这句话里的每个词都说清楚。

![Training data attribution map](/images/blog/training-data-attribution-map.png)

## 1. 什么是 training-data attribution？

Training-data attribution 试图把模型行为解释为训练数据的影响、贡献或价值。

在 NLP 中，被解释的行为可以是：

- BLEU、chrF、COMET 这类翻译指标；
- 领域 MT 系统中的术语保留；
- 模型偏向 Bokmål-like 或 Nynorsk-like 输出；
- 某个具体生成回答；
- hallucination 或 factual error；
- 跨语言、领域或群体的 bias pattern。

所以 training-data attribution 不只是找一条“可疑样本”。它也可以问：哪些数据来源、领域、语言或 written-standard groups 塑造了模型整体行为？

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Global attribution</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">
      哪些数据组影响模型整体行为？例如哪个 written-standard group 改变了 BLEU、chrF、TermF1 或输出风格？
    </p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Local / instance attribution</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">
      哪些训练样本最可能影响某个具体预测或生成回答？
    </p>
  </div>
</div>

我的论文式设置主要是 global group-level attribution。我关心的是 written-standard training-data groups 如何影响领域 MT 行为。Instance-level retrieval 也有用，但它更像 candidate-finding step，不自动等于因果证明。

## 2. Attribution unit：到底给谁分配贡献？

Attribution unit 是我们分配贡献的对象。

它可以是：

| 单位 | 例子 | 典型问题 |
|---|---|---|
| dataset | 全部领域数据 | 领域语料是否有帮助？ |
| source | NPD vs web data | 哪个数据来源重要？ |
| domain | petroleum vs general text | 哪个领域造成了行为变化？ |
| language/style group | Bokmål-like vs Nynorsk-like | 哪个 written standard 塑造输出？ |
| document | 一个 PDF 或 report | 哪个文档影响了行为？ |
| example | 一个句对 | 哪个句对影响这条翻译？ |
| token/feature | 一个术语或短语 | 哪个短语推动了输出？ |

在我的项目里，归因单位是：

```text
written-standard training-data groups
```

这个选择不是普通数据管理问题，而是研究设计问题。只有当数据组边界有意义时，归因结果才容易解释。一个干净的 group 可以支持清楚结论；一个 boundary group 则是很好的反例：如果组内混合了风格、质量或难度，归因结果就会难解释。

## 3. Utility function：我们到底在解释什么行为？

Attribution 需要 utility function。Utility 定义什么算模型行为。

在简单分类任务里，utility 可能就是 accuracy。但在我的领域 MT 设置中，一个 scalar 不够。

我会把 utility 描述成多维的：

```text
v(S) = (
  BLEU,
  chrF,
  TermF1,
  Bokmål output rate,
  Nynorsk output rate
)
```

这里 `S` 是用于训练或适配的数据组 coalition。

关键点是：

> 同一个数据组可以帮助一个 utility，同时伤害另一个 utility。

例如 Nynorsk-like group 可能：

- 提升 BLEU；
- 降低 TermF1；
- 提高 Nynorsk output rate；
- 在某个 evaluation slice 上有利，在另一个 slice 上不利。

所以我会把这种归因称为 multi-faceted attribution。如果把所有行为压缩成一个分数，最有意思的结果反而可能被藏起来。

## 4. Coalition 和 marginal contribution

Coalition 是训练数据组的一个子集。假设我有四个组：

```text
G = {H, B, N, O}
```

其中：

- `H` = high-Bokmål；
- `B` = boundary group；
- `N` = Nynorsk-like；
- `O` = other domain data。

那么一共有：

```text
2^4 = 16
```

种 coalition，包括空集合。

例子：

| Coalition | 含义 |
|---|---|
| ∅ | 不使用领域组 |
| {H} | 只有 high-Bokmål |
| {H, N} | high-Bokmål + Nynorsk-like |
| {H, B, N, O} | 全部组 |

模型在 coalition `S` 上的行为写作：

```text
v(S)
```

数据组 `g` 在已有 context `S` 中的 marginal contribution 是：

```text
v(S ∪ {g}) - v(S)
```

普通语言就是：

> 当前训练数据组合是 S 时，加入 group g 后，模型行为改变了多少？

例如：

```text
v({H, N}) - v({H})
```

表示：在 high-Bokmål 数据基础上加入 Nynorsk-like group，会带来什么变化？

## 5. Shapley value：跨 context 的平均贡献

Leave-one-out ablation 问的是一个问题：

```text
如果从完整数据里删除 group g，会怎样？
```

也就是：

```text
v(G) - v(G \ {g})
```

Shapley value 问的是更宽的问题：

```text
在所有可能 coalition contexts 中，group g 的平均边际贡献是多少？
```

公式通常写成：

```text
φ_g = Σ_{S ⊆ G \ {g}} w(S) [v(S ∪ {g}) - v(S)]
```

面试时不需要死背公式，但必须能解释它做了什么。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Ablation vs Shapley</div>
  <div class="grid gap-0 text-sm md:grid-cols-2">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800">
      <strong>Ablation</strong><br />一个 context：从完整集合中删除 g。
    </div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800">
      <strong>Shapley</strong><br />所有 contexts：平均 g 在不同 coalition 中的贡献。
    </div>
  </div>
</div>

Shapley 为什么有用？

- 它比单次 ablation 更全面；
- 它能反映 context dependence；
- 它可以揭示数据组之间的 interaction；
- 它有清楚的 game-theoretic interpretation。

它为什么难？

- Exact computation 是指数级；
- 4 个组需要 16 个 coalition utilities；
- 20 个组有 1,048,576 种 coalition；
- 100 个组无法穷举。

这个 scalability problem 不是小细节，而是主要研究问题之一。

## 6. Correlation、attribution 和 causality

这个区别非常适合面试。

| 概念 | 含义 | 不能证明什么 |
|---|---|---|
| similarity | 两个样本看起来相似，或梯度方向相似 | 不能证明一个导致另一个 |
| attribution | 方法把行为变化分配给某些数据 | 不等于完整因果机制 |
| causal evidence | 改变数据后，行为按预测变化 | 不等于普遍性结论 |

我的 group-level coalition retraining 提供了更强的 intervention evidence，因为它真的改变了训练数据并观察模型行为。

Gradient similarity 更弱。它可以检索和某个 test behavior 相关的候选训练样本，但它不能单独证明：

```text
这条训练样本导致了这个回答。
```

更诚实的说法是：

```text
在这个近似方法下，这些样本是 plausible influence candidates。
```

## 7. Intervention validation

验证 attribution 最直观的方法是做干预。

一个实用验证流程是：

1. 找到高归因数据；
2. 删除、修正、重新加权，或加入 counterfactual examples；
3. 重新训练或 fine-tune；
4. 观察模型行为是否按预测变化；
5. 和 random baseline 或 size-matched baseline 比较。

可能的干预包括：

| 干预 | 例子 |
|---|---|
| deletion | 删除高影响 group 或 examples |
| correction | 修正错标或噪声样本 |
| reweighting | 降低过强数据的权重 |
| counterfactual addition | 加入替代风格或术语例子 |
| retraining | 在干预设置下重新训练 |

在我的设置中，size-matched random baseline 很重要，因为 group size 是 confounder。如果一个大组看起来很有影响，我必须问：这个影响来自数据身份、数量、质量，还是它们共同作用？

## 8. Gradient similarity、Hessian、influence function 和 TracIn

Instance-level attribution 经常使用 gradients。

对训练样本 `z_i`，gradient 写作：

```text
g_i = ∇_θ L(z_i; θ)
```

直觉是：

> Gradient 指向能降低这个样本 loss 的参数方向。

如果一个训练样本和一个测试样本 gradient 方向相似，它们可能推动模型朝相似方向更新。

```text
cos(g_train, g_test)
```

但 gradient similarity 不等于 causal influence。

### Influence functions

Influence function 问的是：

> 如果轻微提高或删除某个训练样本的权重，模型参数和 test loss 会如何变化？

经典表达大致包含：

```text
- ∇_θ L_test^T H^{-1} ∇_θ L_train
```

其中 `H` 是 Hessian，也就是 loss 的二阶导数矩阵。

直觉：

- gradient 告诉我局部方向；
- Hessian 描述局部曲率；
- inverse Hessian 估计参数变化如何传播。

限制是：这是局部近似。大型神经网络非凸、计算昂贵，并且可能不完全满足 influence-function 假设。

### TracIn

TracIn 不计算 inverse Hessian。它沿着训练过程中的 checkpoints 追踪影响，并使用训练轨迹中的 gradient similarity。

核心思想是：

> 如果一个训练样本在训练过程中反复推动模型朝有利于某个测试样本的方向更新，它可能具有较高 influence。

相比 influence functions，TracIn 通常更容易扩展，因为它使用保存的 checkpoints 和 gradients。但它仍然是近似，不等于删除样本后重新训练的真实效果。

## 9. Attribution 如何扩展？

Exact Shapley 无法扩展到很多 groups 或 examples。

三个方向特别相关：

### Monte Carlo Shapley

不枚举所有 coalitions，而是随机采样数据组加入顺序。每次记录某个 group 加入当前组合时 utility 改变了多少，然后对许多 sampled permutations 求平均。

需要问：

- 采样多少次足够？
- estimator variance 有多大？
- 什么时候停止？
- 能否构造 confidence intervals？
- 哪些 coalitions 信息量最大？

### Surrogate models / datamodels

每个 coalition 都训练模型太贵。Surrogate 或 datamodel 学习：

```text
S → v(S)
```

也就是：给定哪些数据被包含，预测训练在这个 subset 上会产生什么行为。

这可以降低 attribution 成本，但也带来新风险：

> surrogate attribution 只有在 surrogate 能准确预测 retraining behavior 时才可靠。

### Hierarchical attribution

一个实际研究方向是逐层搜索：

```text
data source → document → example → token / phrase
```

例如先发现某个数据来源影响大，再定位文档，再定位样本，最后定位术语或风格模式。

这很适合作为博士方向，因为它同时涉及 scalability、interpretability 和 intervention validation。

## 10. 不确定性：bootstrap、bias、variance 和 random seed

Attribution estimates 不是固定真理，它们有不确定性。

### Bootstrap confidence intervals

Bootstrap 从 evaluation set 中有放回抽样，并重新计算 metrics 或 attribution estimates。

在我的设置中，bootstrap 主要衡量：

```text
在固定训练模型条件下，由测试集抽样产生的不确定性
```

它没有完全覆盖：

- training randomness；
- data grouping uncertainty；
- attribution estimator uncertainty；
- hyperparameter search uncertainty。

### Bias 和 variance

这里的 bias 指 statistical estimator bias，不是社会偏见。

| 术语 | 含义 |
|---|---|
| estimator bias | 平均估计是否偏离真实目标 |
| variance | 重复估计时结果波动多大 |

对 Monte Carlo Shapley，我会问：

- estimator 是否无偏？
- 采样次数增加后 variance 是否下降？
- 多花多少 compute 能换来多少 precision？

### Random seed

Random seed 会影响参数初始化、数据顺序、dropout、优化轨迹和最终模型行为。三个 seed 可以发现不稳定性，但三个 seed 仍然是有限证据。

## 11. Confounding 和 generalization

Confounding 是 data attribution 中最大的风险之一。

如果某个 group 看起来很有影响，原因可能是：

- group identity；
- group size；
- data quality；
- task difficulty；
- duplicated templates；
- label 或 alignment errors；
- domain coverage；
- written-standard imbalance。

Size-matched random baseline 可以帮助检查 group size 是否解释了结果。但它不能解决所有 confounders。

正确的 generalization claim 应该很窄：

> 在当前 English--Norwegian domain MT 设置、当前 written-standard groups 和当前训练流程中，我观察到了稳定的 attribution patterns。

错误说法是：

> 这证明所有 LLM、所有语言和所有预训练数据都遵循同样规律。

研究可信度来自准确说明证据到底支持什么。

## 12. 我会怎么在面试里解释这个项目

如果别人问我的项目做什么，我会说：

> My project studies training-data attribution for English--Norwegian domain machine translation. Instead of asking only whether domain data improves the model, I ask which written-standard data groups contribute to which behaviors. I define utilities such as BLEU, chrF, terminology F1, and Bokmål/Nynorsk output rates. Then I retrain or evaluate models under different coalitions of data groups and use Shapley-style marginal contributions to estimate group-level effects.

如果问为什么使用 group-level attribution：

> Single-example attribution is expensive and noisy for large neural models. Group-level attribution is more interpretable for my research question because I care about written-standard data groups, not only individual sentence pairs.

如果问为什么用 Shapley：

> Leave-one-out ablation measures one context: removing a group from the full data. Shapley averages marginal contribution across coalition contexts, so it better captures context dependence and interactions between data groups.

如果问 causality：

> My coalition retraining gives stronger intervention evidence than pure similarity methods, because I actually change the training data and observe behavior. But I would still avoid overclaiming universal causality; the claim is conditional on the data, grouping, model, and training protocol.

## 13. 学习顺序

面试前我会按这个顺序复习：

1. attribution unit、utility、coalition；
2. marginal contribution；
3. Shapley value；
4. ablation vs Shapley；
5. attribution vs causality；
6. deletion / retraining validation；
7. gradient 和 cosine similarity；
8. influence function 和 Hessian；
9. TracIn；
10. Monte Carlo Shapley；
11. surrogate models / datamodels；
12. bootstrap、bias、variance、confidence intervals。

## 总结

Training-data attribution 不是一个单一方法，而是一套研究框架：

```text
define the unit
define the behavior
intervene on data
measure changes
estimate contribution
validate uncertainty
limit the claim
```

对我来说，最重要的不是背复杂公式，而是能准确解释每个 attribution result 意味着什么、不意味着什么，以及我会如何通过数据干预验证它。

## 参考资料和延伸阅读

- [Shapley, L. S. A Value for n-Person Games](https://doi.org/10.1515/9781400829156-012)
- [Data Shapley: Equitable Valuation of Data for Machine Learning](https://proceedings.mlr.press/v97/ghorbani19c.html)
- [A Distributional Framework for Data Valuation](https://proceedings.mlr.press/v119/ghorbani20a.html)
- [Understanding Black-box Predictions via Influence Functions](https://proceedings.mlr.press/v70/koh17a.html)
- [Estimating Training Data Influence by Tracing Gradient Descent](https://papers.nips.cc/paper/2020/hash/e6385d39ec9394f2f3a354d9d2b88eec-Abstract.html)
- [Google Research: TracIn](https://research.google/blog/tracin-a-simple-method-to-estimate-training-data-influence/)
- [Datamodels: Understanding Predictions with Data and Data with Predictions](https://proceedings.mlr.press/v162/ilyas22a.html)
- [COMET: A Neural Framework for MT Evaluation](https://aclanthology.org/2020.emnlp-main.213/)
