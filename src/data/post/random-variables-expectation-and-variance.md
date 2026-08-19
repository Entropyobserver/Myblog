---
title: "Random Variables, Expectation, and Variance"
publishDate: 2026-08-19
excerpt: "A practical introduction to random variables, expectation, and variance for AI experiments."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Probability", "Uncertainty"]
language: "en"
author: "Xiaojing Yang"
translationKey: "random-variables-expectation-and-variance"
translationHref: "/zh/random-variables-expectation-and-variance"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">A random variable is how uncertainty becomes something we can calculate with.</p>
</div>

## 1. The idea

In AI research, many quantities are not fixed facts. Accuracy on a test set, BLEU on a translation benchmark, annotation agreement, loss after fine-tuning, and latency under real traffic all vary with sampling and experimental conditions. A random variable is a disciplined way to represent this variation.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Mental picture</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Outcome</strong><br />One possible thing that can happen</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Number</strong><br />A value assigned to the outcome</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Distribution</strong><br />How often values occur</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Expectation</strong><br />The long-run center</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Variance</strong><br />The spread around the center</div>
  </div>
</div>

## 2. Expectation is a long-run center

Expectation is not a promise about the next observation. It is the average we would expect after many repetitions under the same data-generating process.

```text
E[X] = sum over values: value × probability
```

For a classifier, if we sample many test sets from the same population, the average score across those test sets estimates the model's expected performance under that population.

## 3. Variance tells us how unstable the number is

Two models can have the same mean score but very different stability. This matters in NLP because small test sets, rare phenomena, domain-specific terminology, or low-resource settings can make scores jump around.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Low variance</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Scores are tightly clustered. A single score is more representative.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">High variance</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Scores move a lot across samples or seeds. One score is risky to overinterpret.</p>
  </div>
</div>

## 4. AI/NLP example

Imagine evaluating a machine translation model on 500 sentence pairs. If the test set contains many short generic sentences, BLEU may look stable. If it contains rare petroleum terms, long legal sentences, or noisy alignments, the observed score may depend strongly on which examples appear.

The statistical habit is: treat the score as one draw from a process, not as the whole truth about the model.

## 5. Common mistakes

| Mistake | Better habit |
|---|---|
| Reporting one number without context | Report the score and the evaluation setup |
| Ignoring random seeds | Track seed variation when training is unstable |
| Treating small differences as decisive | Ask whether the difference is large relative to variance |
| Forgetting the population | Name what real task the dataset is supposed to represent |

## Takeaway

Expectation helps me talk about the center of an uncertain quantity. Variance helps me talk about how much trust to place in one observed result.

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
