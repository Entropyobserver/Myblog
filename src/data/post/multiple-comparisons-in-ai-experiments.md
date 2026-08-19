---
title: "Multiple Comparisons in AI Experiments"
publishDate: 2026-08-19
excerpt: "When we try many models, prompts, seeds, and metrics, false discoveries become easier than they look."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Multiple Comparisons", "Evaluation"]
language: "en"
author: "Xiaojing Yang"
translationKey: "multiple-comparisons-in-ai-experiments"
translationHref: "/zh/multiple-comparisons-in-ai-experiments"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">The more comparisons we try, the easier it is to find a “winner” by chance.</p>
</div>

## 1. The hidden multiplication

AI experiments often contain many comparisons: models, checkpoints, prompts, datasets, random seeds, metrics, and subgroups. Even if each test has a low false-positive rate, the whole experiment can accumulate many chances to fool us.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Where comparisons multiply</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Models</strong><br />A, B, C...</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Prompts</strong><br />templates and wording</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Seeds</strong><br />training randomness</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Metrics</strong><br />accuracy, F1, COMET...</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Subgroups</strong><br />domains, languages, user groups</div>
  </div>
</div>

## 2. The research risk

If we report only the best result after many trials, the result may reflect search over randomness rather than a stable improvement.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Visible report</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">One clean winning number.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Hidden process</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Many attempted comparisons behind the winner.</p>
  </div>
</div>

## 3. AI/NLP example

Prompt engineering is especially vulnerable. If I test 40 prompt variants and report the best one without validation, the selected prompt may simply fit quirks of the development set.

## 4. Better habits

| Habit | Why it helps |
|---|---|
| Separate dev and test | Prevent final test from becoming a tuning set |
| Report search space | Shows how many chances existed |
| Use correction when needed | Controls false positives |
| Validate the selected method | Checks whether the winner generalizes |

## Takeaway

Multiple comparisons are not a minor statistical technicality. They are one of the main ways AI experiments accidentally overclaim.

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
