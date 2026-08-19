---
title: "AI 研究中的相关性与因果性"
publishDate: 2026-08-19
excerpt: "相关性是有用证据，但因果结论需要更强的实验设计和假设。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Causality", "Research Methods"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "correlation-vs-causation-in-ai-research"
translationHref: "/correlation-vs-causation-in-ai-research"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">相关性可以引导调查；因果性需要排除其他解释的设计。</p>
</div>

## 1. 区别

相关性表示两个变量一起变化。因果性表示在明确干预下，改变一个变量会改变另一个变量。AI 研究里很容易从前者太快滑到后者。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">结论阶梯</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>关联</strong><br />X 和 Y 一起变化</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>预测</strong><br />X 能帮助预测 Y</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>干预</strong><br />改变 X 会改变 Y</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>机制</strong><br />我们知道为什么</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>泛化</strong><br />在其他设置下也成立</div>
  </div>
</div>

## 2. 为什么 AI 论文容易出问题

模型训练在复杂数据上。混杂因素到处都是：领域、语言、标签质量、prompt 风格、标注者行为、数据来源、算力预算。一个模式可能真实存在，但不一定是因果关系。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">相关性说法</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">更长 prompts 和更高分数相关。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">因果说法</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">在其他条件控制后，让 prompt 更长会提高分数。</p>
  </div>
</div>

## 3. AI/NLP 例子

假设一个多语模型在某个语言上表现更差。语言本身未必是原因。真正原因可能是训练数据质量较低、领域混合不同、tokenization 效率差，或者评估数据更差。

## 4. 更好的习惯

| 习惯 | 为什么有帮助 |
|---|---|
| 指出混杂因素 | 避免过度简单解释 |
| 使用受控比较 | 减少替代解释 |
| 做 ablation | 检查机制 |
| 观察性设计中避免因果语言 | 保持结论诚实 |

## 总结

相关性不是没用，它常常是第一条线索。但 AI 研究要可信，因果语言必须被实验设计赢得，而不是默认拥有。

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
