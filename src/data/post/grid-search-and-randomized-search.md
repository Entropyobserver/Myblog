---
title: "Grid Search and Randomized Search"
publishDate: 2026-08-19
excerpt: "How to tune hyperparameters without confusing search effort with scientific evidence."
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "en"
author: "Xiaojing Yang"
translationKey: "grid-search-and-randomized-search"
translationHref: "/zh/grid-search-and-randomized-search"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Hyperparameter search is useful, but every extra trial is another chance to overfit validation data.</p>
</div>

## 1. Parameters vs hyperparameters

Parameters are learned from data. Hyperparameters are chosen outside training: regularization strength, tree depth, learning rate, number of neighbors, batch size, or LoRA rank.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Search workflow</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Define space</strong><br />What values are allowed?</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Choose strategy</strong><br />Grid or random</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Cross-validate</strong><br />Score each setting</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Select</strong><br />Pick best validation setting</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Test once</strong><br />Use untouched test data</div>
  </div>
</div>

## 2. Grid vs random

| Method | Strength | Weakness |
|---|---|---|
| Grid search | systematic over small spaces | expensive, wastes trials |
| Randomized search | efficient in large spaces | less exhaustive |
| Successive halving | allocates resources adaptively | more moving parts |

## 3. sklearn example

```python
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

param_grid = {"C": [0.01, 0.1, 1, 10], "penalty": ["l2"]}
search = GridSearchCV(model, param_grid, cv=5, scoring="f1_macro")
search.fit(X_train, y_train)
```

## 4. AI/NLP connection

In NLP fine-tuning, hyperparameters include learning rate, batch size, epochs, warmup, dropout, rank, alpha, and decoding settings. A clean search log is part of research credibility.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Good report</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">State search space, budget, metric, validation protocol, and final test result.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Bad report</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Only report the best number after many hidden trials.</p>
  </div>
</div>

## Takeaway

Hyperparameter tuning is not a magic path to better models. It is controlled search under a fair evaluation protocol.

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
