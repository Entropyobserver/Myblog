---
title: "Metrics Beyond Accuracy"
publishDate: 2026-08-19
excerpt: "Accuracy is easy to understand, but often wrong for imbalanced, ranked, or cost-sensitive tasks."
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "en"
author: "Xiaojing Yang"
translationKey: "metrics-beyond-accuracy"
translationHref: "/zh/metrics-beyond-accuracy"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">A metric is a decision rule about what kinds of mistakes matter.</p>
</div>

## 1. Why accuracy is not enough

Accuracy counts correct predictions. That is fine when classes are balanced and mistakes have similar costs. But many real tasks are imbalanced or cost-sensitive.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Confusion matrix view</div>
  <div class="grid gap-0 text-sm md:grid-cols-4">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>TP</strong><br />Correct positive</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>FP</strong><br />False alarm</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>FN</strong><br />Missed positive</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>TN</strong><br />Correct negative</div>
  </div>
</div>

## 2. Common metrics

| Metric | Best when |
|---|---|
| Accuracy | balanced classes, equal costs |
| Precision | false positives are expensive |
| Recall | false negatives are expensive |
| F1 | need balance between precision and recall |
| ROC-AUC | ranking positives above negatives |
| PR-AUC | rare positive class |
| Macro-F1 | each class should matter equally |

## 3. sklearn example

```python
from sklearn.metrics import classification_report, f1_score, roc_auc_score

print(classification_report(y_test, y_pred))
macro_f1 = f1_score(y_test, y_pred, average="macro")
```

## 4. AI/NLP connection

In NLP, accuracy can hide minority-language failures, rare-label failures, or safety-critical false negatives. In RAG, retrieval accuracy may not mean the answer is grounded. In MT, BLEU alone may hide terminology errors.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Metric choice</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Choose based on task risk, class balance, and decision cost.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Research claim</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Explain what the metric can and cannot support.</p>
  </div>
</div>

## Takeaway

Metrics are not neutral. Choosing a metric is choosing what kind of success the model is allowed to claim.

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
