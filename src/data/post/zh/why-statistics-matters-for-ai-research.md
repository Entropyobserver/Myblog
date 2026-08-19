---
title: "为什么统计对 AI 研究很重要"
publishDate: 2026-08-19
excerpt: "统计不是公式集合，而是帮助我们理解 AI 实验不确定性、证据强度和模型评估可信度的思维工具。"
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Statistics", "Model Evaluation", "Uncertainty"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "why-statistics-matters-for-ai-research"
translationHref: "/why-statistics-matters-for-ai-research"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    统计是我在面对 AI 实验结果时使用的一种判断语言：不是只问“分数是多少”，而是问“这个分数代表什么，它有多稳定？”
  </p>
</div>

## 1. AI 实验充满不确定性

一个模型分数看起来很干净：

```text
模型 A：61.48 BLEU
模型 B：60.92 BLEU
```

但这个分数背后的实验并不“干净”。它会受到测试集、数据划分、随机种子、评估指标、数据分布，以及指标是否能看见关键错误等因素影响。

所以真正的问题不只是：

> 哪个模型分数更高？

而是：

> 这个分数能提供什么样的证据？

这个问题本质上就是统计问题。

## 2. 分数是一次观察，不是完整真相

在 AI 研究里，我们经常把 evaluation score 当成模型的固定属性。

但更准确地说，一个分数通常是从某个样本中观察到的结果。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">从系统到分数</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>真实任务</strong><br />更大的问题空间</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>数据集</strong><br />任务空间的一次抽样</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>模型输出</strong><br />某个设置下的预测</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>指标</strong><br />一种测量规则</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>分数</strong><br />一个观察结果</div>
  </div>
</div>

如果测试集变了，分数可能会变。如果随机种子变了，分数可能会变。如果指标变了，模型排序也可能会变。

这不是说分数没用，而是说分数必须放在上下文里理解。

## 3. 统计帮助我们区分信号和噪声

一个非常重要的统计习惯是问：

> 这个差异真的足够大吗？还是可能只是随机波动？

假设两个翻译系统相差 0.3 BLEU。看起来模型 A 更好。但根据测试集大小和样本波动，这个差异可能并不可靠。

| 问题 | 统计工具 | AI 研究例子 |
|---|---|---|
| 分数可能波动多少？ | 方差 / 标准误 | fine-tuning 的随机种子差异 |
| 可信范围在哪里？ | 置信区间 | BLEU 或 COMET 区间 |
| 模型 A 是否可靠地更好？ | 配对检验 / bootstrap | MT 系统比较 |
| 多次比较是否增加假阳性？ | 多重比较校正 | 测试多个 prompts 或模型 |
| 效果是否有实际意义？ | 效应量 | accuracy 提升是否值得关注 |

统计在这里不是装饰，而是防止我们被偶然结果骗到。

## 4. 数据分布是每个实验里的隐藏角色

模型不是在真空中运行的。它从一个分布中学习，又在另一个分布中被评估。

在领域机器翻译中，这一点非常具体：

```text
通用网页数据
      ↓
通用多语言 MT 模型
      ↓
NPD 石油领域语料
      ↓
领域适配后的 MT 系统
      ↓
真实石油行业文档
```

每一个箭头都可能引入 distribution shift。

在我的 English--Norwegian petroleum MT 项目里，关键问题不只是模型会不会翻译挪威语，而是它能不能处理石油领域术语、正式监管文本风格，以及高风险技术细节。

## 5. 指标是测量，不是现实本身

指标是工具，不是任务本身。

在机器翻译里，BLEU 衡量 n-gram overlap，chrF 衡量字符级相似度，COMET 估计语义质量，术语指标检查领域术语是否保留，人工评估可以发现自动指标漏掉的关键错误。

在 RAG 里，retrieval metrics 可能告诉我们证据是否进入候选集合，但不能直接说明最终答案是否真的 grounded。

在 bias evaluation 里，自动标签可以发现模式，但还需要人工验证和统计检验，才能避免过度声称。

<div class="my-8 grid gap-4 md:grid-cols-3">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">指标</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">一种形式化测量规则。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">证据</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">这个指标真正支持什么判断。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">结论</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">我们被允许说到什么程度。</p>
  </div>
</div>

好的评估习惯，就是把这三层分清楚。

## 6. 统计让研究结论更诚实

没有统计意识时，我们很容易写出：

```text
Our model is better.
```

有统计意识时，结论会变得更精确：

```text
在这个测试集和评估协议下，模型在 chrF 和 BLEU 上提升；
bootstrap 区间显示提升较稳定，但人工错误分析仍发现术语和严重性问题。
```

第二种说法更长，但也更诚实，更像真正的研究结论。

## 7. 这个系列的路线图

| 部分 | 主题 | 目标 |
|---|---|---|
| Part I | 统计基础 | 建立 random variables、expectation、variance、distributions 的直觉。 |
| Part II | 不确定性与模型评估 | 用 confidence intervals、bootstrap、hypothesis testing 理解模型分数。 |
| Part III | 从统计到机器学习 | 把 regression 和 PCA 连接到 ML 模型、表示空间和评估。 |

## 总结

统计对 AI 研究重要，是因为 AI 实验不是只产生数字，而是要求我们判断这些数字意味着什么。

我希望这个系列训练的是一个习惯：

> 不要只问“分数是多少”，要问“是什么不确定性、数据分布、测量选择和证据结构产生了这个分数？”

## References

- [Seeing Theory](https://seeing-theory.brown.edu/index.html)
- [看见统计](https://seeing-theory.brown.edu/cn.html)
- [StatQuest](https://statquest.org/)
- [scikit-learn: Model Selection and Evaluation](https://scikit-learn.org/stable/model_selection.html)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)

