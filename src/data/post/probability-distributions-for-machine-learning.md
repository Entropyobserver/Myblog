---
title: "Probability Distributions for Machine Learning"
publishDate: 2026-08-19
excerpt: "How distributions become assumptions about data, labels, errors, and model behavior."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Probability Distributions", "Machine Learning"]
language: "en"
author: "Xiaojing Yang"
translationKey: "probability-distributions-for-machine-learning"
translationHref: "/zh/probability-distributions-for-machine-learning"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">A distribution is a compact story about what values are possible and how likely they are.</p>
</div>

## 1. Why distributions matter

Machine learning is full of distributional assumptions, even when we do not name them. Classification assumes labels come from some process. Regression assumes errors have structure. Language modeling learns a distribution over tokens. Retrieval systems face query distributions that shift over time.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Where distributions appear</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Data</strong><br />What examples look like</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Labels</strong><br />How outcomes are generated</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Errors</strong><br />How predictions miss</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Parameters</strong><br />What values are plausible</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Scores</strong><br />How evaluation results vary</div>
  </div>
</div>

## 2. Discrete and continuous distributions

Discrete distributions describe countable outcomes, such as token IDs, class labels, or whether a retrieval result is relevant. Continuous distributions describe quantities such as embedding dimensions, latency, loss values, or annotation time.

| Distribution | Useful mental model | AI example |
|---|---|---|
| Bernoulli | yes/no event | correct vs incorrect prediction |
| Binomial | count of successes | number of correct answers in N cases |
| Categorical | one of many labels | sentiment class or next token |
| Normal | noisy measurement around a center | repeated metric estimates |
| Long-tailed | many rare events | words, domains, user queries |

## 3. The hidden danger: real data is often not neat

Text data is rarely cleanly normal. Token frequencies are long-tailed. Domains are uneven. Annotation errors are not always independent. A benchmark may overrepresent easy cases and underrepresent rare but important failures.

That is why distributional thinking is not only mathematical. It is also diagnostic: What kinds of examples are common? What kinds are rare? What changes between training and deployment?

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Formula view</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">A distribution gives probabilities or densities.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Research view</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">A distribution tells us what the experiment is actually sampling from.</p>
  </div>
</div>

## 4. AI/NLP example

In domain machine translation, general web text and petroleum regulatory documents come from different distributions. The model may have learned common language patterns, but the test domain may contain uncommon technical phrases. A model can look strong on the broad distribution and still fail on the tail that matters.

## Takeaway

Distributions help me avoid treating data as a neutral pile of examples. They make me ask: what world does this dataset represent, and what world will the model face later?

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
