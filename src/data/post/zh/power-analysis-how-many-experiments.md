---
title: "Power Analysis：到底需要多少实验"
publishDate: 2026-08-19
excerpt: "Power analysis 连接样本量、效应大小，以及检测到真实提升的概率。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Power Analysis", "Experimental Design"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "power-analysis-how-many-experiments"
translationHref: "/power-analysis-how-many-experiments"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Power analysis 问的是：实验规模是否足够检测到我们关心的效果？</p>
</div>

## 1. 为什么 power 重要

不显著的结果可能表示没有效果，也可能表示实验太小，检测不到这个效果。Power analysis 帮助我们在花时间和算力之前区分这两种可能。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Power 取决于</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>效应量</strong><br />真实效果有多大</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>样本量</strong><br />收集了多少证据</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>噪声</strong><br />测量有多波动</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>阈值</strong><br />检验有多严格</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Power</strong><br />检测到效果的概率</div>
  </div>
</div>

## 2. AI 实验很贵

在 NLP 和 LLM evaluation 里，更多样本可能意味着更多人工标注、API 成本、推理时间或专家评审。Power analysis 是计划工具：它帮助判断一个实验是否值得运行。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">太小</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">实验可能错过真正重要的效果。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">足够大</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">实验有合理概率检测到目标效果。</p>
  </div>
</div>

## 3. 实用问法

不要只问“我需要多少样本”，而要问：

| 问题 | 例子 |
|---|---|
| 什么效果值得关注？ | +1 COMET 或少 10 个严重错误 |
| 指标有多噪？ | seed variation 或 item-level variance |
| 可接受的错误率是什么？ | false positive 和 false negative |
| 预算是多少？ | 标注和推理限制 |

## 4. AI/NLP 例子

如果 RAG evaluation 只有 50 个问题，它可能太弱，检测不到 groundedness 的小但有用提升。如果目标是把 unsupported answers 从 20% 降到 10%，所需样本量取决于置信要求和 power。

## 总结

Power analysis 让评估从“我们测了手上有的东西”，变成“我们设计了一个能回答问题的实验”。

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
