---
title: "置信区间：为什么一个分数不够"
publishDate: 2026-08-19
excerpt: "没有不确定性的模型分数很好读，也最容易被过度相信。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Confidence Intervals", "Model Evaluation"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "confidence-intervals-one-score-is-not-enough"
translationHref: "/confidence-intervals-one-score-is-not-enough"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">置信区间把一个孤零零的分数，变成一段更诚实的可能范围。</p>
</div>

## 1. 一个数字的问题

模型评估经常以分数表结束。分数表有用，但它会悄悄隐藏抽样不确定性。如果测试集稍微换一批样本，分数可能就会变化。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">从分数到区间</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>测试样本</strong><br />有限样本</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>指标</strong><br />测量输出的规则</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>观察分数</strong><br />一次结果</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>不确定性估计</strong><br />分数可能怎么波动</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>区间</strong><br />可能值范围</div>
  </div>
</div>

## 2. 区间的作用

置信区间不是装饰。它会把“模型得了 87.4”改写成：“在这个评估流程下，合理的真实表现大概落在这个范围附近。”

```text
score = 87.4
95% CI = [86.1, 88.6]
```

这个范围是负责任解释的开始。

## 3. 比较模型

如果 Model A 是 87.4，Model B 是 87.1，仅靠数字大小并不能说明差异有意义。它们的不确定性范围可能大量重叠，或者 paired difference 并不稳定。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">排行榜习惯</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">选择更大的数字。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究习惯</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">问这个差异是否稳定、是否有实际意义、是否被合适指标看见。</p>
  </div>
</div>

## 4. AI/NLP 例子

在 LLM evaluation 里，benchmark accuracy 会受到 prompt、抽样样本、decoding setting、judge behavior 的影响。报告置信区间会让结果没那么“漂亮”，但更可信。

## 5. 写作模板

| 薄弱说法 | 更好的说法 |
|---|---|
| Model A 比 Model B 好。 | Model A 在这个测试集上更高，但区间显示差异较小。 |
| 系统达到 91%。 | 系统在这个样本上达到 91%；推广前需要检查不确定性。 |
| 提升很明显。 | 观察到的提升大于 seed variation，并被 bootstrap intervals 支持。 |

## 总结

一个分数只是一次观察。置信区间帮助我们把观察变成更可靠的证据。

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
