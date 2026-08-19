---
title: "PCA: From Variance to Representation"
publishDate: 2026-08-19
excerpt: "PCA explains how variance, projection, and representation are connected."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "PCA", "Representation Learning"]
language: "en"
author: "Xiaojing Yang"
translationKey: "pca-from-variance-to-representation"
translationHref: "/zh/pca-from-variance-to-representation"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">PCA finds directions where the data varies the most, then uses those directions as a simpler representation.</p>
</div>

## 1. The geometric idea

PCA starts with a cloud of points and asks: along which directions does the data vary most? Those directions become principal components.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">PCA workflow</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Data matrix</strong><br />Examples by features</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Center</strong><br />Remove the mean</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Covariance</strong><br />Measure shared variation</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Eigenvectors</strong><br />Find main directions</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Projection</strong><br />Represent data in fewer dimensions</div>
  </div>
</div>

## 2. Why variance matters

If a direction has high variance, points are spread out along it. PCA keeps high-variance directions because they preserve more structure under a linear projection.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Original space</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Many dimensions, often hard to inspect.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">PCA space</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Fewer dimensions that preserve dominant variation.</p>
  </div>
</div>

## 3. AI/NLP example

Embedding spaces are high-dimensional. PCA can project word, sentence, or document embeddings into 2D or 3D for inspection. It will not fully explain a neural representation, but it can reveal clusters, domain shift, outliers, and artifacts.

## 4. Cautions

| Caution | Meaning |
|---|---|
| PCA is linear | It may miss nonlinear structure |
| High variance is not always semantic | Frequency or style can dominate |
| Visualization can mislead | 2D projection loses information |
| Scaling matters | Feature scale can change components |

## Takeaway

PCA is useful because it turns variance into representation. For AI research, it is often an exploratory lens, not final proof.

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
