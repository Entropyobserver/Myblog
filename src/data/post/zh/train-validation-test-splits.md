---
title: "训练集、验证集和测试集"
publishDate: 2026-08-19
excerpt: "如何划分训练集、验证集和测试集，才能让模型评估保持诚实。"
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "train-validation-test-splits"
translationHref: "/train-validation-test-splits"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">测试集不是用来做决策的，而是用来检验决策之后是否可靠的。</p>
</div>

## 1. 为什么数据划分重要

机器学习不只是拟合模型，而是估计模型在没见过的数据上会怎样。如果训练和评估之间共享了信息，分数就会过于乐观。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">健康的开发循环</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Train</strong><br />学习参数</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Validation</strong><br />选择特征、模型、阈值和超参数</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Iterate</strong><br />根据验证集证据改进</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Test</strong><br />最终检查</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Deploy</strong><br />监控真实数据</div>
  </div>
</div>

## 2. 三个集合的角色

| 数据集 | 角色 | 不该做什么 |
|---|---|---|
| 训练集 | 学习参数 | 当成最终表现报告 |
| 验证集 | 做开发选择 | 当成完全未使用的证据 |
| 测试集 | 最终估计 | 反复拿来调参 |

Google MLCC 里一个非常好的直觉是：validation/test set 会被反复使用“磨损”。这句话面试里很好用。

## 3. sklearn 例子

```python
from sklearn.model_selection import train_test_split

X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.30, random_state=42, stratify=y)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.50, random_state=42, stratify=y_temp)
```

## 4. AI/NLP 连接

NLP 里随机划分不一定安全。近重复文档、翻译版本、同一作者、同一话题、同一来源文档，都可能跨集合泄漏。在领域机器翻译里，如果同一句对同时出现在训练和测试中，系统会显得比真实情况更强。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">好的划分</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">有代表性、去重，并且接近真实部署总体。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">坏的划分</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">看似随机，但被重复、时间泄漏或来源重叠污染。</p>
  </div>
</div>

## 总结

数据划分是实验设计。干净的 split 会保护之后每一个分数的意义。

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
