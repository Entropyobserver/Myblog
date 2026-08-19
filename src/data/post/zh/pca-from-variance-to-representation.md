---
title: "PCA：从方差到表示空间"
publishDate: 2026-08-19
excerpt: "PCA 连接了方差、投影和表示空间，是理解 embedding 与降维的重要入口。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "PCA", "Representation Learning"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "pca-from-variance-to-representation"
translationHref: "/pca-from-variance-to-representation"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">PCA 找到数据变化最大的方向，并把这些方向作为更简洁的表示。</p>
</div>

## 1. 几何直觉

PCA 从一团点开始问：数据沿哪些方向变化最大？这些方向就是 principal components。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">PCA 流程</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>数据矩阵</strong><br />样本 × 特征</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>中心化</strong><br />去掉均值</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>协方差</strong><br />衡量共同变化</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>特征向量</strong><br />找到主要方向</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>投影</strong><br />用更少维度表示数据</div>
  </div>
</div>

## 2. 为什么方差重要

如果某个方向方差大，说明点在这个方向上分散得多。PCA 保留高方差方向，是因为这些方向在线性投影下保留更多结构。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">原始空间</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">维度很多，通常很难观察。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">PCA 空间</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">维度更少，保留主要变化。</p>
  </div>
</div>

## 3. AI/NLP 例子

Embedding 空间通常是高维的。PCA 可以把 word、sentence 或 document embeddings 投影到 2D/3D，用于观察 cluster、domain shift、outlier 和 artifact。它不能完全解释神经表示，但很适合作为探索工具。

## 4. 注意事项

| 注意 | 含义 |
|---|---|
| PCA 是线性的 | 可能看不见非线性结构 |
| 高方差不一定等于语义 | 频率或风格可能主导 |
| 可视化可能误导 | 2D 投影会丢信息 |
| scaling 很重要 | 特征尺度会改变 component |

## 总结

PCA 的价值在于把方差转化为表示。对 AI 研究来说，它常常是探索性镜头，不是最终证明。

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
