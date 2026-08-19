---
title: "效应量：显著不等于重要"
publishDate: 2026-08-19
excerpt: "统计显著的结果，仍然可能小到没有研究或应用意义。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Effect Size", "Model Evaluation"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "effect-size-statistical-significance-is-not-enough"
translationHref: "/effect-size-statistical-significance-is-not-enough"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">统计显著问“能不能检测到”，效应量问“到底重要不重要”。</p>
</div>

## 1. 为什么这篇要放得很早

AI 论文经常关注一个模型是否超过另一个模型。但当测试集很大时，很小的提升也可能统计显著。下一步应该问：这个效果在研究或应用上真的重要吗？

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">两个不同问题</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>差异</strong><br />分数相差多少？</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>不确定性</strong><br />噪声能否解释？</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>效应量</strong><br />效果到底多大？</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>成本</strong><br />我们付出了什么代价？</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>结论</strong><br />是否值得强调？</div>
  </div>
</div>

## 2. 例子

```text
Model A: 87.20 accuracy
Model B: 87.35 accuracy
difference: +0.15
```

这个差异在巨大 benchmark 上可能可以被检测出来。但如果新模型成本翻倍、速度更慢、可解释性更差，或者在少数安全关键样本上更差，那么 headline improvement 远远不够。

## 3. AI/NLP 中的效应量问题

| 场景 | 效应量问题 |
|---|---|
| 分类 | 到底多修正了几个样本？ |
| MT | BLEU/COMET 提升是否能在人类错误分析中看见？ |
| RAG | 是否减少了 unsupported answers？ |
| Bias evaluation | 差异是否有实际意义？ |
| 系统 | 质量收益是否值得成本和延迟？ |

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">指标提升</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">一个数字变了。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究贡献</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">这个变化改变了系统能稳定做到什么。</p>
  </div>
</div>

## 4. 我会怎么写

比起“our method significantly improves performance”，我更喜欢：

> 这个提升在统计上可检测，但幅度较小；它的实际价值取决于术语错误减少是否对目标领域重要。

## 总结

效应量让统计检验重新连接到研究意义。

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
