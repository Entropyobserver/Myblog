---
title: "Hyperparameter Optimization with Grid Search and Optuna/ASHA"
publishDate: 2026-08-13
excerpt: "A practical research-engineering note on tuning LoRA rank, alpha, dropout, Pareto selection, ASHA pruning, and fANOVA analysis."
category: "Research Engineering"
track: "Foundations"
tags: ["Hyperparameter Optimization", "Optuna", "ASHA", "LoRA", "fANOVA"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "这篇文章解释如何用 grid search 和 Optuna/ASHA 调 LoRA 超参数，并用 fANOVA 理解哪些参数真正影响性能。"
---

## 中文导读

超参数优化不只是“找最高分”。在我的 LoRA NMT 项目里，HPO 的目标有三层：找到好配置、验证配置稳定性、理解参数空间。

所以我用了 dual-track strategy：一边用 grid search 做固定空间探索，一边用 Optuna + ASHA 做更高效的连续空间搜索，再用 fANOVA 分析 rank、alpha、dropout 对性能变化的贡献。

## Why HPO matters for LoRA

LoRA has fewer trainable parameters than full fine-tuning, but it still has important hyperparameters.

The most important ones are rank \(r\), scaling factor \(\alpha\), dropout, target modules, learning rate, and training schedule.

In a low-resource setting, small hyperparameter choices can have visible effects because the model has limited training signal.

## Grid search: simple but useful

Grid search tries a fixed set of configurations. It is not the most efficient method, but it has one major advantage: it gives a structured view of the landscape.

For example, we can compare configurations like:

- \(r = 4, 8, 16\);
- \(\alpha = 16, 32, 64\);
- dropout \(= 0, 0.05, 0.1\).

This makes it easier to see broad patterns. Does higher rank help? Does dropout regularize or hurt? Does alpha dominate? Are there interactions between rank and alpha?

The limitation is that grid search is expensive and rigid. It only tests the combinations we choose in advance. If each configuration is run once, noise can also affect the landscape.

## Optuna and ASHA: search more efficiently

Optuna allows sampling from a search space rather than checking only a fixed grid.

ASHA, or Asynchronous Successive Halving Algorithm, improves efficiency by pruning weak trials early. The idea is simple: if a configuration performs poorly early in training, it may not be worth spending full compute on it.

This matters when GPU time is limited. Instead of running every configuration to completion, ASHA helps allocate more resources to promising candidates.

Of course, pruning has risk. A configuration that starts slowly could become strong later. This is why I do not treat ASHA as the final authority. I use it as a search tool, then validate promising configurations more carefully.

## Why use two tracks?

Grid search and Optuna answer slightly different questions.

Grid search gives a controlled comparison across a fixed parameter grid.

Optuna explores more flexibly and efficiently.

When both methods converge toward the same configuration, that increases confidence that the optimum is not an artifact of one search method.

In my project, both approaches supported a similar final LoRA configuration: small rank, high alpha, and zero dropout.

## Pareto selection

In machine translation, optimizing one metric can be misleading. A configuration that improves BLEU may not improve chrF or COMET.

One way to handle this is Pareto selection. A configuration is Pareto-optimal if no other configuration is clearly better on all selected objectives.

For fast HPO, I used BLEU and chrF because they are cheaper to compute than COMET. A harmonic mean can balance them: BLEU rewards exact n-gram overlap, while chrF captures character-level similarity and morphology better.

COMET can then be reserved for final evaluation.

## fANOVA: understanding the search space

Finding a good configuration is useful. Understanding why it works is better.

fANOVA, or functional ANOVA, decomposes performance variation across the hyperparameter space. In practice, it estimates how much of the observed performance variance is explained by each hyperparameter and by interactions.

In my experiments, alpha explained most of the performance variation. This was important because it suggested that update magnitude mattered more than simply increasing rank.

The LoRA update is scaled by:

\[
\frac{\alpha}{r}
\]

So alpha controls how strongly the adapter modifies the frozen base model.

## Why dropout can be zero

It may feel counterintuitive that dropout \(=0\) can work well, because dropout is usually associated with preventing overfitting.

But LoRA is already constrained: the base model is frozen, only a small number of parameters are trainable, and the update is low-rank.

In this setting, additional dropout can prevent the adapter from learning useful domain signals. This does not mean dropout is always bad. It means regularization must be interpreted in context.

## Practical lessons

From this project, my HPO takeaways are:

1. Use grid search when you want a readable landscape.
2. Use Optuna/ASHA when you need efficient exploration.
3. Validate promising configurations with multiple seeds.
4. Do not optimize only one metric.
5. Use fANOVA or similar tools to interpret the search.
6. Treat HPO findings as task-specific, not universal.

## Takeaway

Hyperparameter optimization should not be only a leaderboard exercise.

For research engineering, HPO is also a way to understand the behavior of the adaptation method. In my LoRA NMT project, the most useful result was not only the final configuration, but the insight that alpha dominated the adaptation landscape.

