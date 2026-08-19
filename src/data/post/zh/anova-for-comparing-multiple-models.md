---
title: "用于多模型比较的 ANOVA"
publishDate: 2026-08-19
excerpt: "ANOVA 问的是：组间差异是否大于组内噪声。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "ANOVA", "Model Comparison"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "anova-for-comparing-multiple-models"
translationHref: "/anova-for-comparing-multiple-models"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">当问题不是比较一对模型，而是多个组是否整体不同，ANOVA 就有用了。</p>
</div>

## 1. 问题是什么

如果比较三个或更多模型，反复做 pairwise tests 会带来多重比较问题。ANOVA 先问一个更宽的问题：是否有证据表明至少一个组的均值不同？

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">ANOVA 直觉</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>组</strong><br />模型、prompt、领域</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>组内变化</strong><br />每组内部的噪声</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>组间变化</strong><br />组均值之间的差异</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>F ratio</strong><br />相对噪声的信号</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>后续分析</strong><br />哪些组不同？</div>
  </div>
</div>

## 2. AI/NLP 用法

当比较多个模型家族、多个 prompt strategy、或多个领域表现时，ANOVA 可能有用。它不一定是最终答案，但会鼓励正确结构：先问组间是否整体不同，再分析哪里不同。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">只做 pairwise 的思路</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">把每一对都检验一遍，然后寻找显著。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">ANOVA 思路</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">问组结构是否解释了有意义的变化。</p>
  </div>
</div>

## 3. 注意

经典 ANOVA 有假设。NLP 指标可能违反这些假设。在很多现代评估场景中，bootstrap、permutation tests、mixed-effects models 或 Bayesian 方法可能更合适。

## 4. 报告方式

把 ANOVA 放在更完整的证据链里：说明组、报告不确定性、做校正后的后续比较，并把差异连接到实际效应量。

## 总结

ANOVA 不是魔法，但它训练了一个重要研究习惯：区分组间信号和组内噪声。

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
