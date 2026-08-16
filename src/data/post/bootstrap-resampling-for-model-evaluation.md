---
title: "Bootstrap Resampling for Model Evaluation"
publishDate: 2026-08-11
excerpt: "A statistics-to-evaluation note on bootstrap confidence intervals and paired model comparisons."
category: "Model Evaluation"
track: "Research & Applications"
tags: ["Bootstrap", "Statistics", "Model Evaluation"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "这篇文章解释为什么模型评估不应该只看单个分数，以及 bootstrap 如何帮助判断结果是否稳定。"
---

## 中文导读

模型 A 比模型 B 高 0.5 分，这真的说明 A 更好吗？还是只是测试集抽样带来的波动？Bootstrap 的意义就在这里。

## Working outline

1. Why one score is not enough
2. Sampling with replacement
3. Confidence intervals
4. Paired bootstrap for comparing two systems
5. Where this appears in MT, RAG, and classification
6. Practical reporting format

## Reference materials to digest

- [Seeing Theory: The Bootstrap](https://seeing-theory.brown.edu/frequentist-inference/index.html)
- [Koehn: Statistical Significance Tests for Machine Translation Evaluation](https://www.cs.jhu.edu/~phi/)
- [scikit-learn model evaluation](https://scikit-learn.org/stable/model_selection.html)

## My angle

This post connects statistics foundations to my own model-evaluation workflow: MT metrics, retrieval scores, paired comparisons, and confidence intervals.

