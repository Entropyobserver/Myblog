---
title: "最大似然估计：模型为什么能学习参数"
publishDate: 2026-08-19
excerpt: "最大似然把概率模型和参数学习连接起来。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "MLE", "Machine Learning"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "maximum-likelihood-estimation-why-models-learn-parameters"
translationHref: "/maximum-likelihood-estimation-why-models-learn-parameters"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">MLE 选择的是让观察数据在模型下最“合理”的参数。</p>
</div>

## 1. 核心问题

如果一个模型有参数，我们应该怎么选？最大似然估计的答案是：选择让观察数据在模型下概率最高的参数。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">MLE 流程</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>模型族</strong><br />带参数的概率故事</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>观察数据</strong><br />我们看到了什么</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>似然</strong><br />数据在参数下有多合理</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>优化</strong><br />寻找最佳参数</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>拟合模型</strong><br />用于预测或分析</div>
  </div>
</div>

## 2. 从概率到学习

很多 ML loss 本质上可以理解为 negative log-likelihood。分类任务里最小化 cross-entropy，可以看成最大化正确标签的似然。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">似然视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">选择最能解释观察数据的参数。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">损失视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">减少给真实标签低概率带来的惩罚。</p>
  </div>
</div>

## 3. AI/NLP 例子

语言模型训练模型给观察到的 token 序列高概率。next-token prediction loss 不只是工程技巧，它也是基于似然的学习目标。

## 4. 注意

MLE 依赖模型族和数据。如果数据有偏、噪声大或不代表真实任务，拟合出来的参数也会继承这些问题。

## 总结

MLE 是统计建模和 ML 训练之间的桥：学习就是找到让观察数据更可能的参数。

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
