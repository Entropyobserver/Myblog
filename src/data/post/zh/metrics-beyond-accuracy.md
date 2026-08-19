---
title: "Accuracy 之外的评估指标"
publishDate: 2026-08-19
excerpt: "Accuracy 容易理解，但在不平衡、排序或代价敏感任务中经常不够。"
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "metrics-beyond-accuracy"
translationHref: "/metrics-beyond-accuracy"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">指标本质上是在决定：哪些错误更重要。</p>
</div>

## 1. 为什么 accuracy 不够

Accuracy 统计预测正确的比例。当类别均衡、错误代价相近时，它很好用。但很多真实任务类别不平衡，或者错误代价不同。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">混淆矩阵视角</div>
  <div class="grid gap-0 text-sm md:grid-cols-4">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>TP</strong><br />正确预测正类</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>FP</strong><br />误报</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>FN</strong><br />漏报</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>TN</strong><br />正确预测负类</div>
  </div>
</div>

## 2. 常见指标

| 指标 | 适用场景 |
|---|---|
| Accuracy | 类别均衡、错误代价相近 |
| Precision | false positive 代价高 |
| Recall | false negative 代价高 |
| F1 | 需要平衡 precision 和 recall |
| ROC-AUC | 看正样本是否排在负样本前 |
| PR-AUC | 正类很稀有 |
| Macro-F1 | 希望每个类别同等重要 |

## 3. sklearn 例子

```python
from sklearn.metrics import classification_report, f1_score, roc_auc_score

print(classification_report(y_test, y_pred))
macro_f1 = f1_score(y_test, y_pred, average="macro")
```

## 4. AI/NLP 连接

在 NLP 里，accuracy 可能隐藏少数语言失败、稀有标签失败或安全关键 false negatives。在 RAG 中，retrieval accuracy 不代表最终答案 grounded。在 MT 中，只看 BLEU 可能隐藏术语错误。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">指标选择</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">根据任务风险、类别平衡和错误代价选择。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究结论</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">说明指标能支持什么，也不能支持什么。</p>
  </div>
</div>

## 总结

指标不是中性的。选择指标就是选择模型可以声称哪一种成功。

## 面试回答模板

如果面试问到这个概念，我会分四层回答：

1. 先给短定义；
2. 再讲直觉；
3. 指出常见失败模式；
4. 最后连接到真实评估或部署决策。

## 参考资料

- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [scikit-learn User Guide](https://scikit-learn.org/stable/user_guide)
- [scikit-learn: Model selection and evaluation](https://scikit-learn.org/stable/model_selection)
- [An Introduction to Statistical Learning / ISLP](https://www.statlearning.com/)
- [ISLP Python labs](https://intro-stat-learning.github.io/ISLP/)
- [StatQuest](https://statquest.org/)
- [Stanford CS229 materials](https://cs229.stanford.edu/materials.html-full)
- [Deep Learning Book](https://www.deeplearningbook.org/)
