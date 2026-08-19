---
title: "Grid Search 和 Randomized Search"
publishDate: 2026-08-19
excerpt: "如何调超参数，同时避免把搜索努力误认为科学证据。"
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "grid-search-and-randomized-search"
translationHref: "/grid-search-and-randomized-search"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">超参数搜索有用，但每多试一次，就多一次过拟合验证集的机会。</p>
</div>

## 1. 参数和超参数

参数是从数据中学习的。超参数是在训练外选择的：正则化强度、树深度、学习率、邻居数、batch size、LoRA rank 等。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">搜索流程</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>定义空间</strong><br />允许哪些取值？</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>选择策略</strong><br />Grid 或 random</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>交叉验证</strong><br />给每个设置打分</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>选择</strong><br />选择验证表现最好设置</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>测试一次</strong><br />使用 untouched test data</div>
  </div>
</div>

## 2. Grid 和 random

| 方法 | 优点 | 弱点 |
|---|---|---|
| Grid search | 小空间里系统完整 | 昂贵，浪费 trial |
| Randomized search | 大空间更高效 | 不穷尽 |
| Successive halving | 自适应分配资源 | 复杂度更高 |

## 3. sklearn 例子

```python
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

param_grid = {"C": [0.01, 0.1, 1, 10], "penalty": ["l2"]}
search = GridSearchCV(model, param_grid, cv=5, scoring="f1_macro")
search.fit(X_train, y_train)
```

## 4. AI/NLP 连接

NLP fine-tuning 中，超参数包括 learning rate、batch size、epochs、warmup、dropout、rank、alpha 和 decoding settings。清楚的搜索记录本身就是研究可信度的一部分。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">好的报告</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">说明 search space、budget、metric、validation protocol 和 final test result。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">坏的报告</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">隐藏大量尝试，只报告最好的数字。</p>
  </div>
</div>

## 总结

调参不是通往好模型的魔法，而是在公平评估协议下进行受控搜索。

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
