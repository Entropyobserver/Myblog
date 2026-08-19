---
title: "机器学习中的概率分布"
publishDate: 2026-08-19
excerpt: "概率分布不是抽象曲线，而是关于数据、标签、误差和模型行为的假设。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Probability Distributions", "Machine Learning"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "probability-distributions-for-machine-learning"
translationHref: "/probability-distributions-for-machine-learning"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">分布是一种压缩叙事：哪些值可能出现，它们分别有多可能。</p>
</div>

## 1. 为什么分布重要

机器学习里到处都是分布假设，即使我们没有明确说出来。分类任务假设标签来自某种过程；回归任务假设误差有结构；语言模型学习 token 的概率分布；检索系统面对的 query 分布也会随时间变化。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">分布出现在哪里</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>数据</strong><br />样本长什么样</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>标签</strong><br />结果如何生成</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>误差</strong><br />预测如何偏离</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>参数</strong><br />哪些参数值更合理</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>分数</strong><br />评估结果如何波动</div>
  </div>
</div>

## 2. 离散分布和连续分布

离散分布描述可数结果，比如 token ID、类别标签、某个 retrieval result 是否相关。连续分布描述连续量，比如 embedding 维度、延迟、loss、标注时间。

| 分布 | 直觉 | AI 例子 |
|---|---|---|
| Bernoulli | 是/否事件 | 预测正确或错误 |
| Binomial | 成功次数 | N 个样本里答对几个 |
| Categorical | 多类别之一 | 情感类别或下一个 token |
| Normal | 围绕中心的噪声测量 | 重复评估得到的指标 |
| Long-tailed | 大量稀有事件 | 词频、领域、用户查询 |

## 3. 隐藏风险：真实数据经常不整齐

文本数据很少真的“像正态分布一样干净”。token frequency 是长尾的，领域分布是不均匀的，标注错误也不一定独立。一个 benchmark 可能包含很多简单样本，却低估少数但重要的失败类型。

所以分布思维不只是数学，它也是诊断工具：哪些样本常见？哪些样本稀有？训练、测试、部署之间发生了什么变化？

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">公式视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">分布给出概率或密度。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">分布告诉我们实验实际上从哪里抽样。</p>
  </div>
</div>

## 4. AI/NLP 例子

在领域机器翻译里，通用网页文本和石油监管文件来自不同分布。模型可能学会了常见语言模式，但测试领域包含大量不常见技术短语。一个模型可以在大分布上看起来很强，却在真正重要的长尾案例上失败。

## 总结

分布帮助我不把数据看成中性的样本堆，而是追问：这个数据集代表哪个世界？模型之后会面对哪个世界？

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
