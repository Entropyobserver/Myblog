---
title: "Effect Size: Statistical Significance Is Not Enough"
publishDate: 2026-08-19
excerpt: "A statistically significant result can still be too small to matter in research or deployment."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Effect Size", "Model Evaluation"]
language: "en"
author: "Xiaojing Yang"
translationKey: "effect-size-statistical-significance-is-not-enough"
translationHref: "/zh/effect-size-statistical-significance-is-not-enough"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Statistical significance asks whether an effect is detectable; effect size asks whether it matters.</p>
</div>

## 1. Why this topic belongs early

AI papers often focus on whether a model beats another model. But a tiny gain can become statistically significant when the test set is large. The next question is practical and scientific: is the effect big enough to care about?

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Two different questions</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Difference</strong><br />How far apart are the scores?</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Uncertainty</strong><br />Could noise explain it?</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Effect size</strong><br />How large is the effect?</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Cost</strong><br />What did we pay?</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Claim</strong><br />Is it worth saying?</div>
  </div>
</div>

## 2. Example

```text
Model A: 87.20 accuracy
Model B: 87.35 accuracy
difference: +0.15
```

This might be statistically detectable on a huge benchmark. But if the model is twice as expensive, slower, less interpretable, or worse on rare safety-critical cases, the headline improvement is not enough.

## 3. AI/NLP effect sizes

| Context | Effect-size question |
|---|---|
| Classification | How many more examples are corrected? |
| MT | Is the BLEU/COMET gain visible in human error analysis? |
| RAG | Does the improvement reduce unsupported answers? |
| Bias evaluation | Is the disparity practically meaningful? |
| Systems | Is the quality gain worth the cost and latency? |

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Metric improvement</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">A number moved.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Research contribution</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">The movement changed what the system can reliably do.</p>
  </div>
</div>

## 4. How I would write it

Instead of “our method significantly improves performance,” I prefer:

> The improvement is statistically detectable but small; its practical value depends on whether the reduced terminology errors matter for the target domain.

## Takeaway

Effect size is what keeps statistical testing connected to research meaning.

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
