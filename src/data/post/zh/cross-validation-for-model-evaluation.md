---
title: "用于模型评估的交叉验证"
publishDate: 2026-08-19
excerpt: "为什么一次划分很脆弱，K-fold 如何工作，以及交叉验证什么时候会在 NLP 中误导我们。"
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "cross-validation-for-model-evaluation"
translationHref: "/cross-validation-for-model-evaluation"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">交叉验证通过轮换验证集，估计模型表现是否依赖某一次划分。</p>
</div>

## 1. 为什么一次划分很脆弱

一次 train/validation split 可能很倒霉。验证集可能异常简单、异常困难，或者缺少重要子群体。交叉验证可以降低结果对一次划分的依赖。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">K-fold 交叉验证</div>
  <div class="grid gap-0 text-sm md:grid-cols-4">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>分成 K 折</strong><br />每一折是一个数据块</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>训练 K 次</strong><br />每次留出一折</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>每折打分</strong><br />得到 K 个验证分数</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>求平均</strong><br />估计表现和波动</div>
  </div>
</div>

## 2. 常见变体

| 变体 | 适用情况 |
|---|---|
| KFold | 回归或比较均衡的数据 |
| StratifiedKFold | 分类且类别不平衡 |
| GroupKFold | 样本共享用户、文档、说话人或来源 |
| TimeSeriesSplit | 未来不能泄漏到过去 |
| Nested CV | 调参和性能估计都重要 |

## 3. sklearn 例子

```python
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.linear_model import LogisticRegression

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(LogisticRegression(max_iter=1000), X, y, cv=cv, scoring="f1_macro")
print(scores.mean(), scores.std())
```

## 4. 什么时候 CV 会误导 NLP

交叉验证默认 split 结构和真实泛化问题匹配。但 NLP 里，随机折可能泄漏近重复文档、同一模板、同一说话人、同一话题或同一来源语料。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">好的 NLP CV</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">使用 group-aware、document-aware、time-aware 或 domain-aware folds。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">坏的 NLP CV</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">当文档或来源有重叠时，仍然随机拆句子级样本。</p>
  </div>
</div>

## 总结

交叉验证不只是一个函数调用，而是在问：评估结果能否经受住不同数据视角的检验。

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
