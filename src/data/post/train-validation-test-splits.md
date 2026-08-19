---
title: "Train / Validation / Test Splits"
publishDate: 2026-08-19
excerpt: "A practical guide to splitting data so model evaluation stays honest."
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "en"
author: "Xiaojing Yang"
translationKey: "train-validation-test-splits"
translationHref: "/zh/train-validation-test-splits"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">The test set is not for making decisions; it is for checking the decision after it has been made.</p>
</div>

## 1. Why splitting matters

Machine learning is not only about fitting a model. It is about estimating how the model will behave on examples it has not seen. If training and evaluation share information, the score becomes too optimistic.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">A healthy development loop</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Train</strong><br />Fit parameters</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Validation</strong><br />Choose features, models, thresholds, and hyperparameters</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Iterate</strong><br />Improve using validation evidence</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Test</strong><br />Final check</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Deploy</strong><br />Monitor real data</div>
  </div>
</div>

## 2. The roles

| Split | Role | What not to do |
|---|---|---|
| Training set | Learn parameters | Report it as final performance |
| Validation set | Make development choices | Treat it as untouched evidence |
| Test set | Final estimate | Reuse it for tuning |

Google MLCC has a very useful phrase: validation and test sets can effectively wear out when repeatedly used for decisions. That is a wonderful intuition for interviews.

## 3. sklearn example

```python
from sklearn.model_selection import train_test_split

X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.30, random_state=42, stratify=y)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.50, random_state=42, stratify=y_temp)
```

## 4. AI/NLP connection

For NLP, random splitting can be unsafe. Near-duplicate documents, translated versions, same authors, same topics, or same source documents can leak across splits. In domain MT, a sentence pair duplicated across train and test can make a system look better than it is.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Good split</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Representative, deduplicated, and aligned with the real deployment population.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Bad split</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Random-looking but contaminated by duplicates, time leakage, or source overlap.</p>
  </div>
</div>

## Takeaway

Splitting is experimental design. A clean split protects the meaning of every score that comes later.

## Interview pattern

When this appears in an interview, I would answer in four layers:

1. give the short definition;
2. explain the intuition;
3. name the common failure mode;
4. connect it to a real evaluation or deployment decision.

## References

- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [scikit-learn User Guide](https://scikit-learn.org/stable/user_guide)
- [scikit-learn: Model selection and evaluation](https://scikit-learn.org/stable/model_selection)
- [An Introduction to Statistical Learning / ISLP](https://www.statlearning.com/)
- [ISLP Python labs](https://intro-stat-learning.github.io/ISLP/)
- [StatQuest](https://statquest.org/)
- [Stanford CS229 materials](https://cs229.stanford.edu/materials.html-full)
- [Deep Learning Book](https://www.deeplearningbook.org/)
