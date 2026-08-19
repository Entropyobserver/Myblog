---
title: "模型评估中的 Bootstrap Resampling"
publishDate: 2026-08-19
excerpt: "Bootstrap 通过反复重采样已有测试集，估计模型分数和模型差异的不确定性。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Bootstrap", "NLP Evaluation"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "bootstrap-resampling-for-model-evaluation"
translationHref: "/bootstrap-resampling-for-model-evaluation"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Bootstrap 问的是：如果我只有这个测试集，反复重采样后分数会怎么波动？</p>
</div>

## 1. 直觉

在很多 AI 项目里，重新收集一个大测试集很贵。Bootstrap 给了我们一种实用方法：用已经有的测试集估计不确定性。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Bootstrap 循环</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>原始测试集</strong><br />N 个已评估样本</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>有放回重采样</strong><br />构造一个伪测试集</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>计算指标</strong><br />BLEU、chrF、accuracy、COMET、F1</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>重复</strong><br />几百或几千次</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>总结</strong><br />区间或差异分布</div>
  </div>
</div>

## 2. 为什么是有放回抽样？

有放回抽样允许某个样本出现多次，另一个样本完全不出现。这是在模拟：我们手上的测试集只是更大总体中的一次抽样。

```text
original: [1, 2, 3, 4, 5]
sample:   [2, 2, 4, 5, 5]
```

bootstrap 得到的分数分布，可以告诉我们指标对测试集组成有多敏感。

## 3. 模型比较

对于 MT、摘要、分类这类同一批样本上的 paired tasks，bootstrap 更常用于比较系统差异，而不只是估计单个分数。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">单模型 bootstrap</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">这个模型分数有多不确定？</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">配对 bootstrap</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">两个系统的差异有多稳定？</p>
  </div>
</div>

## 4. AI/NLP 例子

对于 English--Norwegian 领域机器翻译，我会在句对层面做 bootstrap。每个重采样测试集都为两个系统计算 BLEU、chrF、COMET。如果大多数重采样都显示 LoRA 优于 baseline，这比单一分数表更有证据力。

## 5. 局限

Bootstrap 不能修复坏测试集。如果测试集本身有偏、小、重复、缺少困难领域样本，bootstrap 只能估计这个有缺陷样本附近的不确定性。

## 总结

Bootstrap 是统计和 AI 评估之间最实用的桥之一：它不要求新数据，却能让不确定性可见。

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
