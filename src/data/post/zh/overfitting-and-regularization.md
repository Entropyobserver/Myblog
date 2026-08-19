---
title: "过拟合与正则化"
publishDate: 2026-08-19
excerpt: "模型为什么会学到噪声，验证曲线如何暴露它，正则化如何控制它。"
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "overfitting-and-regularization"
translationHref: "/overfitting-and-regularization"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">过拟合是模型在训练样本上变得很优秀，却在样本外不可靠。</p>
</div>

## 1. 直觉

模型应该学习可复用结构。过拟合意味着它还学到了训练集里的偶然细节：噪声、重复、标注习惯、数据集特有捷径。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">过拟合曲线</div>
  <div class="grid gap-0 text-sm md:grid-cols-3">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>太简单</strong><br />训练误差和验证误差都高</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>有用复杂度</strong><br />验证表现改善</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>太复杂</strong><br />训练继续变好但验证变差</div>
  </div>
</div>

## 2. 正则化

正则化会抑制不必要复杂度。它可以是 L1/L2 惩罚、early stopping、dropout、data augmentation、pruning 或架构约束。

| 方法 | 实际效果 |
|---|---|
| L2 / weight decay | 让权重更小、更平滑 |
| L1 | 鼓励稀疏特征 |
| Early stopping | 在记忆加深前停止 |
| Dropout | 减少对单一路径的依赖 |
| Data augmentation | 让捷径没那么有用 |

## 3. sklearn 例子

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(C=0.1, penalty="l2", max_iter=1000)
model.fit(X_train, y_train)
```

在很多 scikit-learn 线性模型里，`C` 越小，正则化越强。

## 4. AI/NLP 连接

在小规模领域 NLP 数据中，过拟合可能意味着记住文档模板，或者记住同时出现在 train/validation 里的术语。对于 fine-tuning，正则化也意味着限制预训练模型被改动的程度。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">面试回答</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">过拟合是模型学习了噪声或样本特有模式，导致泛化失败。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究回答</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">我们用 held-out data、learning curves、seed variation 和领域错误分析来诊断它。</p>
  </div>
</div>

## 总结

正则化不只是数学惩罚，而是让模型必须“证明”复杂度值得。

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
