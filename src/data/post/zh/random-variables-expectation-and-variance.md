---
title: "随机变量、期望和方差"
publishDate: 2026-08-19
excerpt: "从 AI 实验角度理解随机变量、期望和方差：分数为什么会波动，我们如何描述这种波动。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Probability", "Uncertainty"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "random-variables-expectation-and-variance"
translationHref: "/random-variables-expectation-and-variance"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">随机变量的意义，是把“不确定的事情”变成可以计算、比较和建模的对象。</p>
</div>

## 1. 核心想法

在 AI 研究里，很多量都不是固定事实。测试集 accuracy、翻译任务里的 BLEU、人工标注一致性、fine-tuning 之后的 loss、真实系统里的延迟，都会随着样本和实验条件变化。随机变量就是用一种严谨方式描述这种变化。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">直觉图</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>结果</strong><br />可能发生的一种情况</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>数值</strong><br />给这个结果赋予的数字</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>分布</strong><br />不同数值出现的规律</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>期望</strong><br />长期平均中心</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>方差</strong><br />围绕中心的波动</div>
  </div>
</div>

## 2. 期望是长期平均中心

期望不是对下一次观察的保证，而是在同一个生成过程下重复很多次之后的平均趋势。

```text
E[X] = 每个数值 × 它出现的概率，然后求和
```

对于分类模型，如果我们从同一个总体中抽取很多个测试集，那么这些测试集分数的平均值，可以看成模型在这个总体上的期望表现。

## 3. 方差描述数字有多不稳定

两个模型可以有相同的平均分数，但稳定性完全不同。这对 NLP 很重要，因为测试集小、稀有现象多、领域术语密集、低资源语料噪声大时，分数可能明显波动。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">低方差</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">分数集中在一个较窄范围内，单次分数更有代表性。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">高方差</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">分数会随着样本或随机种子明显变化，不能过度解读一次结果。</p>
  </div>
</div>

## 4. AI/NLP 例子

假设你在 500 个句对上评估机器翻译模型。如果测试集里大多是短而普通的句子，BLEU 可能比较稳定。如果测试集包含石油领域术语、长法律句、噪声对齐，观察到的分数就可能强烈依赖具体抽到了哪些例子。

统计思维会提醒我：分数是一个过程中的一次观察，不是模型全部真实能力。

## 5. 常见误区

| 误区 | 更好的习惯 |
|---|---|
| 只报告一个数字 | 同时说明评估设置 |
| 忽略随机种子 | 对不稳定训练记录 seed variation |
| 把很小差异当成决定性结果 | 问差异相对方差是否足够大 |
| 忘记总体 | 说明数据集代表的真实任务是什么 |

## 总结

期望帮助我描述不确定量的中心，方差帮助我判断一次观察结果到底有多可靠。

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
