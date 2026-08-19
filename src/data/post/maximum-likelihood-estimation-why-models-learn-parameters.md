---
title: "Maximum Likelihood Estimation: Why Models Learn Parameters"
publishDate: 2026-08-19
excerpt: "Maximum likelihood connects probability models to parameter learning."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "MLE", "Machine Learning"]
language: "en"
author: "Xiaojing Yang"
translationKey: "maximum-likelihood-estimation-why-models-learn-parameters"
translationHref: "/zh/maximum-likelihood-estimation-why-models-learn-parameters"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">MLE chooses parameters that make the observed data look most plausible under the model.</p>
</div>

## 1. The core question

If a model has parameters, how should we choose them? Maximum likelihood estimation says: choose the parameter values that assign high probability to the data we actually observed.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">MLE workflow</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Model family</strong><br />A probability story with parameters</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Observed data</strong><br />What we saw</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Likelihood</strong><br />How plausible the data is</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Optimization</strong><br />Search for best parameters</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Fitted model</strong><br />Use parameters for prediction or analysis</div>
  </div>
</div>

## 2. From probability to learning

Many ML losses are negative log-likelihoods in disguise. Minimizing cross-entropy for classification can be understood as maximizing the likelihood of the correct labels.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Likelihood view</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Choose parameters that explain the observed data.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Loss view</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Minimize the penalty for assigning low probability to observed labels.</p>
  </div>
</div>

## 3. AI/NLP example

Language modeling trains a model to assign high probability to observed token sequences. The next-token prediction loss is not just engineering; it is a likelihood-based learning objective.

## 4. Caution

MLE depends on the model family and the data. If the data is biased, noisy, or not representative, the fitted parameters inherit that problem.

## Takeaway

MLE is a bridge between statistical modeling and ML training: learning means finding parameters that make the observed data probable.

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
