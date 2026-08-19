---
title: "多重比较：AI 实验中的隐藏问题"
publishDate: 2026-08-19
excerpt: "当我们测试很多模型、prompt、seed 和指标时，假阳性会比想象中更容易出现。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Multiple Comparisons", "Evaluation"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "multiple-comparisons-in-ai-experiments"
translationHref: "/multiple-comparisons-in-ai-experiments"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">比较次数越多，越容易偶然找到一个看起来赢了的结果。</p>
</div>

## 1. 隐藏的比较膨胀

AI 实验通常包含很多比较：模型、checkpoint、prompt、数据集、随机种子、指标、子群体。即使每次检验的假阳性率都不高，整个实验也会积累很多“被骗”的机会。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">比较在哪里膨胀</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>模型</strong><br />A、B、C...</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Prompts</strong><br />模板和措辞</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Seeds</strong><br />训练随机性</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>指标</strong><br />accuracy、F1、COMET...</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>子群体</strong><br />领域、语言、用户群</div>
  </div>
</div>

## 2. 研究风险

如果我们在很多尝试之后只报告最好的结果，这个结果可能反映的是对随机性的搜索，而不是稳定提升。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">报告里可见的</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">一个干净的胜出数字。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">背后隐藏的</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">为了找到胜者做过很多比较。</p>
  </div>
</div>

## 3. AI/NLP 例子

Prompt engineering 特别容易受影响。如果我测试 40 个 prompt variant，然后只报告 dev set 上最好的一个，它可能只是适配了开发集的偶然特征。

## 4. 更好的习惯

| 习惯 | 为什么有帮助 |
|---|---|
| 区分 dev 和 test | 防止最终测试集变成调参集 |
| 报告搜索空间 | 让读者知道有多少次机会 |
| 必要时做校正 | 控制假阳性 |
| 验证选出的方案 | 检查 winner 是否泛化 |

## 总结

多重比较不是小技术细节，而是 AI 实验最容易无意中过度声称的原因之一。

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
