---
title: "Bias–Variance Trade-off"
publishDate: 2026-08-19
excerpt: "偏差和方差解释了为什么模型太简单或太灵活都会失败。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Bias-Variance", "Machine Learning"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "bias-variance-tradeoff"
translationHref: "/bias-variance-tradeoff"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">泛化失败通常来自两端：模型太僵硬学不到信号，或太灵活记住了噪声。</p>
</div>

## 1. 直觉图

Bias 是模型假设太简单带来的错误。Variance 是模型对训练样本太敏感带来的错误。这个 trade-off 不是课本术语，而是诊断 ML 行为的方法。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">模型复杂度曲线</div>
  <div class="grid gap-0 text-sm md:grid-cols-3">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>太简单</strong><br />高 bias，underfitting</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>较平衡</strong><br />学到信号，控制噪声</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>太复杂</strong><br />高 variance，overfitting</div>
  </div>
</div>

## 2. 它看起来是什么样

| 症状 | 可能问题 |
|---|---|
| train 和 test 都差 | 高 bias |
| train 很好，test 很差 | 高 variance |
| 不同 seed 差异大 | 高 variance |
| 稳定但平庸 | 高 bias |

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">高 bias</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">模型表达不了足够复杂的模式。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">高 variance</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">数据稍微变化，模型就变化太多。</p>
  </div>
</div>

## 3. AI/NLP 例子

在低资源领域适配中，太小的 adapter 可能学不到领域术语；完整 fine-tuning 大模型又可能过拟合小而噪的语料。更好的方法往往是折中：容量足够适配，约束足够稳定。

## 4. 如何应对

高 bias 可能需要更好特征、更大模型、更强架构或重定义任务。高 variance 可能需要更多数据、更强正则、更好验证、ensemble 或更简单的适配方式。

## 总结

Bias-variance 思维给我一张诊断图：不是简单说“模型不好”，而是问“它是哪一种不好？”

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
