---
title: "Cross-Validation for Model Evaluation"
publishDate: 2026-08-19
excerpt: "Why one split is fragile, how K-fold works, and when cross-validation can mislead in NLP."
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "en"
author: "Xiaojing Yang"
translationKey: "cross-validation-for-model-evaluation"
translationHref: "/zh/cross-validation-for-model-evaluation"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Cross-validation estimates performance by rotating which part of the data plays the validation role.</p>
</div>

## 1. Why one split is fragile

One train/validation split can be unlucky. Maybe the validation set is unusually easy, unusually hard, or missing important subgroups. Cross-validation reduces dependence on one split.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">K-fold cross-validation</div>
  <div class="grid gap-0 text-sm md:grid-cols-4">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Split into K folds</strong><br />Each fold is one block</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Train K times</strong><br />Hold out one fold each time</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Score each fold</strong><br />Collect K validation scores</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Average</strong><br />Estimate performance and variation</div>
  </div>
</div>

## 2. Common variants

| Variant | Use when |
|---|---|
| KFold | Regression or balanced general data |
| StratifiedKFold | Classification with class imbalance |
| GroupKFold | Examples share users, documents, speakers, or sources |
| TimeSeriesSplit | Future must not leak into past |
| Nested CV | Hyperparameter tuning and performance estimation both matter |

## 3. sklearn example

```python
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.linear_model import LogisticRegression

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(LogisticRegression(max_iter=1000), X, y, cv=cv, scoring="f1_macro")
print(scores.mean(), scores.std())
```

## 4. When CV can mislead in NLP

Cross-validation assumes that the split structure matches the real generalization problem. In NLP, random folds can leak near-duplicate documents, same templates, same speakers, same topics, or same source corpora.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Good NLP CV</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Use group-aware, document-aware, time-aware, or domain-aware folds.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Bad NLP CV</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Randomly split sentence-level examples when documents or sources overlap.</p>
  </div>
</div>

## Takeaway

Cross-validation is not just a function call. It is a way to ask whether the evaluation result survives different views of the data.

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
