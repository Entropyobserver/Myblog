---
title: "Why Statistics Matters for AI Research"
publishDate: 2026-08-19
excerpt: "Statistics is not just a set of formulas. It is a way to reason about uncertainty, evidence, and trust in AI experiments."
category: "Statistics"
track: "Foundations"
tags: ["Statistics for AI Research", "Statistics", "Model Evaluation", "Uncertainty"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "统计不是公式集合，而是帮助我们理解 AI 实验不确定性、评估结果可信度和模型比较证据强弱的思维工具。"
---

## 中文导读

我想把这个系列叫做 **Statistics for AI Research / AI 研究中的统计直觉**。

原因很简单：AI 实验里到处都是数字，但数字本身不会自动告诉我们它有多可信。一个 BLEU 分数、一个 accuracy、一个 retrieval recall、一个 human evaluation rate，都只是某个测试集、某次抽样、某个实验设置下的观察结果。

统计的作用不是把研究变复杂，而是帮我们问更好的问题：

- 这个分数稳定吗？
- 两个模型的差异是真实的，还是抽样波动？
- 测试集代表我要解决的问题吗？
- 一个自动指标有没有漏掉重要错误？
- 如果人工评估只有 50 个样本，我们能相信到什么程度？

这篇文章是整个系列的入口：我会用 Seeing Theory / 看见统计 / StatQuest 这类材料建立直觉，然后把它们连接到机器学习、NLP、MT、RAG 和 bias evaluation。

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Statistics is the language I use when an AI experiment produces a number and I need to decide how much to trust it.
  </p>
  <p class="mt-3 text-muted dark:text-slate-300">
    统计是我在面对 AI 实验结果时使用的一种判断语言：不是只问“分数是多少”，而是问“这个分数代表什么，它有多稳定？”
  </p>
</div>

## 1. AI experiments are full of uncertainty

A model score looks clean:

```text
Model A: 61.48 BLEU
Model B: 60.92 BLEU
```

But the experiment behind it is not clean in the same way. The score depends on many choices:

- which test set was used;
- how the data was split;
- which random seed was used;
- which metric was selected;
- whether the examples are independent;
- whether the test distribution matches the real use case;
- whether important errors are visible to the metric.

So the real question is not only:

> Which model scored higher?

It is:

> What kind of evidence does this score provide?

That question is statistical.

## 2. A score is an observation, not the whole truth

In AI research, we often treat evaluation scores as if they are fixed properties of models.

But a score is usually an observation from a sample.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">From system to score</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800">
      <strong>Real task</strong><br />真实任务空间
    </div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800">
      <strong>Dataset</strong><br />抽样得到的数据
    </div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800">
      <strong>Model output</strong><br />模型预测
    </div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800">
      <strong>Metric</strong><br />指标定义
    </div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800">
      <strong>Score</strong><br />一个观察结果
    </div>
  </div>
</div>

If the test set changes, the score may change. If the random seed changes, the score may change. If the metric changes, the ranking may change.

This does not make scores useless. It means scores need context.

## 3. Statistics helps separate signal from noise

One of the most useful statistical habits is asking:

> Is this difference large enough to matter, or could it be noise?

Suppose two translation systems differ by 0.3 BLEU. That may look like an improvement. But depending on test size and variability, it may be too small to trust.

This is where concepts like variance, confidence intervals, bootstrap resampling, and hypothesis testing become practical tools.

| Question | Statistical tool | AI research example |
|---|---|---|
| How much can the score vary? | Variance / standard error | Random-seed variation in fine-tuning |
| What range is plausible? | Confidence interval | BLEU or COMET interval |
| Is model A reliably better? | Paired test / bootstrap | MT system comparison |
| Are many comparisons inflating false positives? | Multiple-comparison correction | Testing many prompts or models |
| Is the observed effect meaningful? | Effect size | Accuracy gain that matters in practice |

统计在这里不是“装饰”，而是防止我们被偶然结果骗到。

## 4. Data distribution is the hidden character in every experiment

Models do not operate in a vacuum. They learn from one distribution and are evaluated on another.

In domain-specific machine translation, this becomes very concrete:

```text
General web data
      ↓
general multilingual MT model
      ↓
NPD petroleum corpus
      ↓
domain-adapted MT system
      ↓
real petroleum documents
```

Every arrow can introduce distribution shift.

For my English--Norwegian petroleum MT project, the key question was not only whether the model could translate Norwegian. It was whether the model could handle petroleum-domain terminology, formal regulatory style, and high-stakes technical details.

This is why probability distributions are not abstract. They describe where the data comes from and what the evaluation can reasonably claim.

## 5. Evaluation metrics are measurements, not reality

Metrics are tools. They are not the task itself.

For machine translation:

- BLEU measures n-gram overlap;
- chrF measures character n-gram similarity;
- COMET estimates learned semantic quality;
- terminology metrics check domain-specific term preservation;
- human evaluation can reveal critical errors that automatic metrics miss.

For RAG:

- recall@k tells whether evidence appears in retrieved candidates;
- MRR measures ranking quality;
- answer accuracy checks final response correctness;
- evidence-grounding evaluation asks whether the answer is supported.

For bias evaluation:

- automatic labels may detect patterns;
- human validation checks whether those patterns are meaningful;
- statistical testing helps avoid overclaiming.

<div class="my-8 grid gap-4 md:grid-cols-3">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Metric</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">A formal measurement rule.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Evidence</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">What the metric actually supports.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Claim</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">What we are allowed to say.</p>
  </div>
</div>

A good evaluation habit is to keep these three levels separate.

## 6. Statistics makes research claims more honest

Without statistics, it is easy to overclaim:

```text
Our model is better.
```

With statistics, the claim becomes more precise:

```text
On this test set, under this evaluation protocol, the model improves chrF and BLEU;
bootstrap intervals suggest the improvement is stable, while human error analysis
shows remaining terminology and severity issues.
```

The second version is longer, but it is more honest.

It also sounds more like real research.

## 7. How this connects to my background

My earlier data-analysis work trained me to think about data quality, hypothesis testing, A/B experiments, and model evaluation.

My current NLP research uses the same habits in a different setting:

- in machine translation, I care about whether metric gains are robust;
- in RAG, I care about whether retrieved evidence really supports answers;
- in bias evaluation, I care about whether observed differences reflect model behavior or evaluation artifacts;
- in human annotation, I care about agreement, sampling, and uncertainty.

The tools changed. The statistical mindset stayed.

## 8. The roadmap for this series

This series has three stages.

| Part | Theme | Goal |
|---|---|---|
| Part I | Statistical Foundations | Build intuition for random variables, expectation, variance, and distributions. |
| Part II | Uncertainty & Model Evaluation | Use confidence intervals, bootstrap, and hypothesis testing to reason about model scores. |
| Part III | Statistics → Machine Learning | Connect regression and PCA to ML models, representations, and evaluation. |

The next-stage topics will go deeper into causality, MLE/MAP, regularization, bias--variance trade-off, ANOVA, effect size, multiple comparisons, power analysis, and statistical testing for NLP/LLM evaluation.

## Takeaway

Statistics matters for AI research because AI experiments are not just about producing numbers. They are about deciding what those numbers mean.

The central habit I want from this series is:

> Do not ask only “what is the score?” Ask “what uncertainty, data distribution, measurement choice, and evidence structure produced this score?”

中文总结：

> 统计让我们在 AI 实验中少一点“看分数激动”，多一点“判断证据是否可靠”。这正是从基础走向研究的关键。

## References

- [Seeing Theory](https://seeing-theory.brown.edu/index.html) — visual probability and statistics.
- [看见统计](https://seeing-theory.brown.edu/cn.html) — Chinese version of Seeing Theory.
- [StatQuest](https://statquest.org/) — clear explanations of statistics and machine learning concepts.
- [scikit-learn: Model Selection and Evaluation](https://scikit-learn.org/stable/model_selection.html) — practical tools for evaluation and model selection.
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course) — accessible ML foundations.

