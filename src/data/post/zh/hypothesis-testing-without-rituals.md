---
title: "不要仪式化地使用假设检验"
publishDate: 2026-08-19
excerpt: "假设检验不是为了制造 p-value，而是为了约束我们能说什么。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Hypothesis Testing", "Research Methods"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "hypothesis-testing-without-rituals"
translationHref: "/hypothesis-testing-without-rituals"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">只有当假设、数据、指标和结论彼此匹配时，检验才有意义。</p>
</div>

## 1. 假设检验是用来做什么的

假设检验的目的不是给论文装饰 p-value，而是问：如果基线假设成立，我们观察到这样的结果是否反常？

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">作为理性怀疑的检验</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>零假设</strong><br />没有真实差异或没有效应</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>观察结果</strong><br />实验产生了什么</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>检验统计量</strong><br />对证据的总结</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>参考行为</strong><br />零假设下会怎样</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>结论</strong><br />我们应该多谨慎地表达</div>
  </div>
</div>

## 2. p-value 陷阱

小 p-value 不等于效应很大，也不等于你的研究假设为真。它只是说：在零假设模型下，至少这么极端的结果不太常见。

这对 AI 很重要，因为大 benchmark 可能让极小效果也显著，小 benchmark 又可能让有用效果看起来不显著。

## 3. 让检验匹配实验

| 情况 | 更好的问题 |
|---|---|
| 同一批样本被两个模型评估 | 使用 paired comparison |
| 测试了很多 prompts | 控制 multiple comparisons |
| 指标分布不接近正态 | 考虑 bootstrap 或 permutation 思路 |
| 人工标注有分歧 | 把 annotation uncertainty 纳入考虑 |

## 4. AI/NLP 例子

在机器翻译评估里，paired bootstrap test 会问 BLEU 差异在重采样下是否仍然存在。在 LLM evaluation 里，permutation 或 paired test 可以问一个模型是否在同一批题目上稳定胜出。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">糟糕用法</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">看完很多指标后再做检验，然后报告最小的 p-value。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">更好用法</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">先定义比较，再根据数据结构选检验，同时报告不确定性和效应量。</p>
  </div>
</div>

## 总结

假设检验应该让研究结论更谦逊、更精确。如果它变成仪式，反而会让薄弱结论显得过强。

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
