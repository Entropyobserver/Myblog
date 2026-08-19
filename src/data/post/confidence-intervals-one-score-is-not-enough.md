---
title: "Confidence Intervals: Why One Score Is Not Enough"
publishDate: 2026-08-19
excerpt: "A model score without uncertainty is easy to read but easy to overtrust."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Confidence Intervals", "Model Evaluation"]
language: "en"
author: "Xiaojing Yang"
translationKey: "confidence-intervals-one-score-is-not-enough"
translationHref: "/zh/confidence-intervals-one-score-is-not-enough"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">A confidence interval turns a lonely score into a range of plausible values.</p>
</div>

## 1. The problem with one number

Model evaluation often ends with a table of scores. That table is useful, but it can quietly hide sampling uncertainty. If the test set had been slightly different, the score might have moved.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">From score to interval</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Test examples</strong><br />A finite sample</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Metric</strong><br />A rule for measuring output</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Observed score</strong><br />One result</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Uncertainty estimate</strong><br />How much the score may vary</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Interval</strong><br />A plausible range</div>
  </div>
</div>

## 2. What an interval does

A confidence interval is not decorative. It changes the claim from “the model scored 87.4” to “under this evaluation process, plausible values are roughly around this range.”

```text
score = 87.4
95% CI = [86.1, 88.6]
```

That range is the beginning of responsible interpretation.

## 3. Comparing models

If Model A scores 87.4 and Model B scores 87.1, the difference may not be meaningful if their uncertainty ranges heavily overlap or if paired differences are unstable.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Leaderboard habit</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Pick the larger number.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Research habit</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Ask whether the difference is stable, meaningful, and visible under the right metric.</p>
  </div>
</div>

## 4. AI/NLP example

In LLM evaluation, a benchmark accuracy can vary because prompts, sampled examples, decoding settings, and judge behavior vary. Reporting a confidence interval makes the result less shiny but more credible.

## 5. Writing pattern

| Weak claim | Better claim |
|---|---|
| Model A is better than Model B. | Model A scored higher on this test set, but the interval suggests the difference is small. |
| The system achieves 91%. | The system achieved 91% on this sample; uncertainty should be checked before generalizing. |
| The improvement is obvious. | The observed improvement is larger than seed variation and supported by bootstrap intervals. |

## Takeaway

One score is an observation. A confidence interval helps turn that observation into evidence.

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
