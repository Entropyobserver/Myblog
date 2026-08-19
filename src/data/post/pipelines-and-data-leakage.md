---
title: "Pipelines and Data Leakage"
publishDate: 2026-08-19
excerpt: "Why preprocessing belongs inside the validation pipeline, not before the split."
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "en"
author: "Xiaojing Yang"
translationKey: "pipelines-and-data-leakage"
translationHref: "/zh/pipelines-and-data-leakage"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Data leakage happens when information from evaluation data sneaks into training decisions.</p>
</div>

## 1. The leakage problem

Data leakage can make a weak model look strong. The classic mistake is fitting preprocessing steps on the full dataset before splitting or cross-validation.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Safe pipeline</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Raw data</strong><br />Before learning anything</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Split / CV fold</strong><br />Separate train and validation</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Fit preprocessing on train only</strong><br />Scaler, vectorizer, imputer</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Transform validation</strong><br />Use train-fitted steps</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Evaluate</strong><br />No validation information leaked</div>
  </div>
</div>

## 2. Leakage examples

| Leakage source | Why it is dangerous |
|---|---|
| Scaling before split | Validation distribution influences training transform |
| Feature selection before CV | Validation labels guide features |
| Duplicate documents | Model sees near-test examples |
| Time leakage | Future information predicts past |
| Target leakage | Feature directly encodes the label |

## 3. sklearn example

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000)),
])
scores = cross_val_score(pipe, X, y, cv=5)
```

## 4. AI/NLP connection

In NLP, leakage can occur through deduplication failure, preprocessing vocabulary learned from all text, topic overlap, prompt examples that resemble test items, or benchmark contamination in LLM pretraining.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Pipeline mindset</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Every learned preprocessing step belongs inside the training fold.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Research mindset</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Every evaluation score needs a leakage audit.</p>
  </div>
</div>

## Takeaway

Pipelines are not just cleaner code. They are evaluation protection.

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
