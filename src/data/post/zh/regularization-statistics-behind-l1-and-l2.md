---
title: "正则化：L1 和 L2 背后的统计思想"
publishDate: 2026-08-19
excerpt: "正则化通过约束参数，让模型复杂度不至于吞掉泛化能力。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Regularization", "Machine Learning"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "regularization-statistics-behind-l1-and-l2"
translationHref: "/regularization-statistics-behind-l1-and-l2"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">正则化是在说：除非数据强烈支持，否则优先选择更简单的解释。</p>
</div>

## 1. 过拟合问题

灵活模型可以把训练数据解释得“太好”。它可能学到了信号，也可能记住了噪声。正则化加入惩罚项，让过度复杂的参数设置变得昂贵。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">正则化学习</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>训练损失</strong><br />拟合观察数据</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>惩罚项</strong><br />抑制复杂度</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>目标函数</strong><br />loss + penalty</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>参数</strong><br />偏好稳定取值</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>泛化</strong><br />降低过拟合风险</div>
  </div>
</div>

## 2. L2 和 L1 直觉

L2 正则化平滑地惩罚大权重。L1 正则化可以把一些权重推向零，因此在简单模型里常用于特征选择。

| 方法 | 惩罚 | 直觉 |
|---|---|---|
| L2 / Ridge | 权重平方和 | 平滑缩小权重 |
| L1 / Lasso | 权重绝对值和 | 鼓励稀疏解 |

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">没有正则化</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">模型可能追逐训练集里的每个细节。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">有正则化</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">模型必须用足够证据证明复杂性值得。</p>
  </div>
</div>

## 3. 深度学习连接

在神经网络里，weight decay 和 L2 风格的正则化关系很近。Dropout、early stopping、data augmentation 也有正则化效果，只是机制不同。

## 4. AI/NLP 例子

在小规模领域数据上 fine-tune 语言模型时，full fine-tuning 很容易过拟合。LoRA 这类参数高效方法不等同于经典正则化，但它们有相似的实际目标：在限制变化范围的同时完成适配。

## 总结

正则化不是技巧，而是一种统计偏好：优先选择能泛化的模型，而不是只会记住训练集的模型。

## 参考资料和学习路线

这篇笔记采用的是适合我 AI/NLP 研究目标的路线：先用 Seeing Theory、看见统计和 StatQuest 建立直觉，再用 Think Stats 连接 Python 实践，最后用 ISLR/ISLP、CS229 和统计推断资料补足机器学习与研究表达。

- [An Introduction to Statistical Learning / ISLP](https://www.statlearning.com/)
- [Think Stats, 3rd edition](https://greenteapress.com/wp/think-stats-3e/)
- [All of Statistics — Larry Wasserman](https://www.stat.cmu.edu/~larry/all-of-statistics/index.html)
- [Seeing Theory](https://seeing-theory.brown.edu/index.html)
- [看见统计](https://seeing-theory.brown.edu/cn.html)
- [StatQuest](https://statquest.org/)
- [Stanford CS229 materials](https://cs229.stanford.edu/materials.html-withcomments)
- [scikit-learn: model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html)
