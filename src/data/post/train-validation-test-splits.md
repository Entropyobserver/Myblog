---
title: "Train / Validation / Test Splits Without Fooling Yourself"
publishDate: 2026-08-12
excerpt: "A machine learning foundation note on data splits, leakage, generalization, and why evaluation design starts before training."
category: "Machine Learning"
track: "Foundations"
tags: ["Data Splits", "Generalization", "Evaluation"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "训练集、验证集和测试集不是形式主义，而是避免数据泄漏和过度乐观评估的基本实验设计。"
---

## 中文导读

很多模型结果看起来很好，不是因为模型真的泛化好，而是因为实验设计已经泄漏了答案。这篇文章用基础 ML 的语言解释 train / validation / test split。

## Working outline

1. Why we split data
2. Train vs validation vs test
3. What leakage looks like
4. Random split vs document-level split vs time split
5. Why NLP data can leak in subtle ways
6. Checklist before trusting a score

## Reference materials to digest

- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [scikit-learn: Cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html)
- [scikit-learn: Model selection and evaluation](https://scikit-learn.org/stable/model_selection.html)

## My angle

I want to connect this foundation topic to parallel corpora, RAG benchmarks, annual reports, and document-level split control.

