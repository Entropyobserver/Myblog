---
title: "NLP 和 LLM 评估中的统计检验"
publishDate: 2026-08-19
excerpt: "一张面向 NLP、MT、RAG 和 LLM 评估的统计检验选择图。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "NLP Evaluation", "LLM Evaluation"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "statistical-testing-for-nlp-and-llm-evaluation"
translationHref: "/statistical-testing-for-nlp-and-llm-evaluation"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">选择检验时，关键不是指标名字，而是比较结构。</p>
</div>

## 1. 从比较结构开始

选择统计检验之前，先描述实验。两个系统是否在同一批样本上评估？标签是二分类、有序、连续，还是人工排序？是否涉及多个语言或领域？

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">选择图</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>是否同样本？</strong><br />paired 或 unpaired</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>指标类型</strong><br />binary、continuous、ranking</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>是否多重比较？</strong><br />是否需要校正</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>是否有人类判断？</strong><br />标注不确定性</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>结论</strong><br />检验支持什么说法</div>
  </div>
</div>

## 2. 常见 NLP 场景

| 场景 | 可用方法 |
|---|---|
| MT 指标比较 | paired bootstrap 或 approximate randomization |
| 分类 accuracy | McNemar 风格 paired logic 或 bootstrap |
| F1 / macro metrics | 对样本 bootstrap |
| 人类偏好 | paired tests 或 hierarchical models |
| 很多 prompts/models | multiple-comparison control |

## 3. LLM evaluation 的复杂性

LLM evaluation 还会受到 prompt sensitivity、stochastic decoding、judge model、污染风险和题目难度影响。统计检验不能消除这些设计问题，它只能在给定协议下量化不确定性。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">检验能回答</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">观察到的差异在这个协议下是否稳定？</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">检验不能单独回答</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">benchmark 是否有效、公平、足够贴近真实任务？</p>
  </div>
</div>

## 4. 报告模板

我会报告：

- 指标分数；
- 不确定性区间；
- paired comparison 结果；
- 效应量；
- 按错误类别的分析；
- benchmark 和 judge 的限制。

## 总结

好的 NLP/LLM 评估不是一个检验，而是一条证据链：指标、不确定性、配对比较、效应量和定性错误分析。

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
