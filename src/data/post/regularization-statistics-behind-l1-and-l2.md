---
title: "Regularization: Statistics Behind L1 and L2"
publishDate: 2026-08-19
excerpt: "Regularization controls model complexity by making some parameter values less plausible."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Regularization", "Machine Learning"]
language: "en"
author: "Xiaojing Yang"
translationKey: "regularization-statistics-behind-l1-and-l2"
translationHref: "/zh/regularization-statistics-behind-l1-and-l2"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Regularization is a way of saying: prefer simpler explanations unless the data strongly argues otherwise.</p>
</div>

## 1. The overfitting problem

A flexible model can explain training data too well. It may learn signal, but it may also memorize noise. Regularization adds a penalty that makes overly complex parameter settings costly.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Regularized learning</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Training loss</strong><br />Fit the observed data</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Penalty</strong><br />Discourage complexity</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Objective</strong><br />Loss + penalty</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Parameters</strong><br />Prefer stable values</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Generalization</strong><br />Reduce overfitting risk</div>
  </div>
</div>

## 2. L2 and L1 intuition

L2 regularization discourages large weights smoothly. L1 regularization can push some weights exactly toward zero, which makes it useful for feature selection in simpler models.

| Method | Penalty | Intuition |
|---|---|---|
| L2 / Ridge | squared weights | shrink weights smoothly |
| L1 / Lasso | absolute weights | encourage sparse solutions |

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Without regularization</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">The model may chase every detail in the training set.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">With regularization</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">The model must justify complexity with enough evidence.</p>
  </div>
</div>

## 3. Deep learning connection

In neural networks, weight decay is closely related to L2-style regularization. Dropout, early stopping, and data augmentation also act as regularizing strategies, although through different mechanisms.

## 4. AI/NLP example

For fine-tuning language models on small domain data, full fine-tuning can overfit quickly. Parameter-efficient methods like LoRA are not identical to classical regularization, but they share a practical goal: adapt the model while limiting how much can change.

## Takeaway

Regularization is not a trick. It is a statistical preference for models that generalize rather than merely remember.

## References and learning path

This note uses the statistics-to-machine-learning route that fits my AI/NLP research goals: build intuition with Seeing Theory and StatQuest, connect it to Python practice with Think Stats, then deepen the ML connection with ISLR/ISLP, CS229, and selected statistical inference references.

- [An Introduction to Statistical Learning / ISLP](https://www.statlearning.com/)
- [Think Stats, 3rd edition](https://greenteapress.com/wp/think-stats-3e/)
- [All of Statistics — Larry Wasserman](https://www.stat.cmu.edu/~larry/all-of-statistics/index.html)
- [Seeing Theory](https://seeing-theory.brown.edu/index.html)
- [看见统计](https://seeing-theory.brown.edu/cn.html)
- [StatQuest](https://statquest.org/)
- [Stanford CS229 materials](https://cs229.stanford.edu/materials.html-withcomments)
- [scikit-learn: model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html)
