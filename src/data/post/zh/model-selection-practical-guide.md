---
title: "模型选择实用指南"
publishDate: 2026-08-19
excerpt: "模型选择是有纪律地在多个模型之间做选择，同时避免欺骗自己。"
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "model-selection-practical-guide"
translationHref: "/model-selection-practical-guide"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">模型选择不是选择最高分，而是选择对真实任务证据最强的模型。</p>
</div>

## 1. 模型选择包括什么

模型选择包括选择算法、特征、预处理、超参数、阈值，有时甚至包括选择指标本身。危险在于：每一个选择都可能过拟合验证集。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">选择循环</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>候选模型</strong><br />定义选项</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>验证协议</strong><br />选择公平比较方式</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>指标</strong><br />匹配任务代价</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>选择</strong><br />根据验证证据决定</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>最终测试</strong><br />只在 untouched test 上估计一次</div>
  </div>
</div>

## 2. 实用标准

| 标准 | 为什么重要 |
|---|---|
| 性能 | 是否解决任务？ |
| 稳定性 | 是否经得起不同 split/seed？ |
| 简洁性 | 复杂度是否值得？ |
| 成本 | 训练和推理预算 |
| 可解释性 | 错误能否被解释？ |
| 鲁棒性 | 跨领域是否稳定？ |

## 3. sklearn 例子

```python
from sklearn.model_selection import cross_validate

results = cross_validate(model, X, y, cv=5, scoring=["accuracy", "f1_macro"], return_train_score=True)
```

## 4. AI/NLP 连接

对 NLP 来说，平均分最高的模型不一定最好。一个整体略低但能更好处理领域术语、少数语言或严重错误案例的模型，可能是更强的研究选择。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">排行榜思维</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">一个指标决定一切。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究思维</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">证据、不确定性、成本和失败模式一起决定。</p>
  </div>
</div>

## 总结

模型选择是研究判断过程，不是一次简单排序。

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
