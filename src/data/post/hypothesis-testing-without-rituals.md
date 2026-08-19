---
title: "Hypothesis Testing Without Rituals"
publishDate: 2026-08-19
excerpt: "Hypothesis testing is a way to discipline claims, not a ritual for producing p-values."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Hypothesis Testing", "Research Methods"]
language: "en"
author: "Xiaojing Yang"
translationKey: "hypothesis-testing-without-rituals"
translationHref: "/zh/hypothesis-testing-without-rituals"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">A test is useful only when the hypothesis, data, metric, and claim actually match.</p>
</div>

## 1. What hypothesis testing is for

The point of hypothesis testing is not to decorate a paper with p-values. It is to ask whether the observed evidence is surprising under a baseline assumption.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Testing as disciplined doubt</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Null idea</strong><br />No real difference or no effect</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Observed result</strong><br />What the experiment produced</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Test statistic</strong><br />A summary of the evidence</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Reference behavior</strong><br />What would happen under the null</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Decision</strong><br />How cautious the claim should be</div>
  </div>
</div>

## 2. The p-value trap

A small p-value does not mean the effect is large. It also does not mean the hypothesis is true. It means that, under the null model, results at least this extreme would be unusual.

This distinction matters in AI because large benchmarks can make tiny effects look statistically significant while small benchmarks can hide useful effects.

## 3. Match the test to the experiment

| Situation | Better question |
|---|---|
| Same examples evaluated by two models | Use a paired comparison |
| Many prompts tested | Control multiple comparisons |
| Non-normal metric distribution | Prefer bootstrap or permutation logic |
| Human labels with disagreement | Model uncertainty in annotation |

## 4. AI/NLP example

In machine translation evaluation, a paired bootstrap test asks whether the observed BLEU difference remains under resampling. In LLM evaluation, a permutation or paired test can ask whether one model wins consistently on the same items.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Bad use</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Run a test after looking at many metrics, then report the smallest p-value.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Good use</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Define the comparison first, choose the test for the data structure, and report uncertainty plus effect size.</p>
  </div>
</div>

## Takeaway

Hypothesis testing should make research claims more humble and precise. If it becomes a ritual, it can make weak claims look stronger than they are.

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
