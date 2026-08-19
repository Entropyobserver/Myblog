---
title: "Bootstrap Resampling for Model Evaluation"
publishDate: 2026-08-19
excerpt: "Bootstrap resampling estimates uncertainty by repeatedly reusing the observed test set."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Bootstrap", "NLP Evaluation"]
language: "en"
author: "Xiaojing Yang"
translationKey: "bootstrap-resampling-for-model-evaluation"
translationHref: "/zh/bootstrap-resampling-for-model-evaluation"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Bootstrap asks: if this test set is the evidence I have, how much would the score move under resampling?</p>
</div>

## 1. The intuition

In many AI projects, collecting a much larger test set is expensive. Bootstrap gives us a practical way to estimate uncertainty from the test set we already have.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Bootstrap loop</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Original test set</strong><br />N evaluated examples</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Resample with replacement</strong><br />Create a new pseudo-test set</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Compute metric</strong><br />BLEU, chrF, accuracy, COMET, F1</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Repeat</strong><br />Hundreds or thousands of times</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Summarize</strong><br />Interval or difference distribution</div>
  </div>
</div>

## 2. Why sampling with replacement?

Sampling with replacement lets one example appear multiple times and another not appear at all. This mimics the idea that the observed test set is one sample from a broader population.

```text
original: [1, 2, 3, 4, 5]
sample:   [2, 2, 4, 5, 5]
```

The bootstrap distribution of scores shows how sensitive the metric is to the composition of the test set.

## 3. Model comparison

For paired tasks like MT, summarization, or classification on the same examples, bootstrap is often more useful when applied to the difference between systems on each resampled set.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Single-score bootstrap</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">How uncertain is this model score?</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Paired bootstrap</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">How stable is the difference between two systems?</p>
  </div>
</div>

## 4. AI/NLP example

For English--Norwegian domain MT, I would bootstrap over sentence pairs. Each resampled test set produces BLEU, chrF, and maybe COMET for both systems. If most resamples show LoRA beating the baseline, the evidence is stronger than a single metric table.

## 5. Limitations

Bootstrap does not fix a bad test set. If the test set is biased, too small, duplicated, or missing the hard domain cases, bootstrap estimates uncertainty around that flawed sample.

## Takeaway

Bootstrap is one of the most practical bridges between statistics and AI evaluation: it makes uncertainty visible without requiring a new dataset.

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
