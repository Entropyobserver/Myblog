---
title: "作为统计模型的线性回归"
publishDate: 2026-08-19
excerpt: "线性回归不只是一条线，而是关于信号、噪声、假设和解释的统计模型。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Regression", "Machine Learning"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "linear-regression-as-a-statistical-model"
translationHref: "/linear-regression-as-a-statistical-model"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">回归教会我们一个基本 ML 模式：预测 = 结构 + 噪声。</p>
</div>

## 1. 不只是拟合一条线

线性回归常被讲成“给散点画一条最好的线”。这个直觉有用，但研究意义更深：回归把系统性结构和残差噪声区分开。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">回归视角</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>特征</strong><br />我们观察到什么</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>线性结构</strong><br />带权组合</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>噪声</strong><br />模型无法解释的部分</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>预测</strong><br />估计结果</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>残差</strong><br />关于模型拟合的证据</div>
  </div>
</div>

## 2. 模型

```text
y = β0 + β1x1 + ... + βpxp + ε
```

系数描述的是在假设下的关系，残差则显示这个简单模型捕捉不到什么。

## 3. 为什么 AI 研究者仍然需要它

即使做深度模型，回归思维也到处出现：probing embeddings、分析错误因素、估计标注时间、测量 bias effect、建立 baseline。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">作为预测器</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">用特征估计结果。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">作为分析工具</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">问哪些变量解释了行为差异。</p>
  </div>
</div>

## 4. NLP 例子

假设我们用句长、术语密度、源语言、文档类型预测翻译错误率。回归模型不会替代神经机器翻译系统，但它能帮助我们发现哪些因素和错误相关。

## 5. 需要检查什么

| 检查 | 为什么重要 |
|---|---|
| 残差模式 | 暗示模型遗漏了结构 |
| 异常点 | 稀有样本可能强烈影响拟合 |
| 共线性 | 特征可能含义重叠 |
| 训练/测试划分 | 拟合好不等于泛化好 |

## 总结

线性回归是小模型，但它训练的是大习惯：说明模型解释了什么，以及还没有解释什么。

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
