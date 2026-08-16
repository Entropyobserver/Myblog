---
title: "Vectors, Matrices, and Embeddings"
publishDate: 2026-08-14
excerpt: "A foundation note connecting linear algebra to embeddings, similarity, neural layers, and retrieval."
category: "Mathematics"
track: "Foundations"
tags: ["Linear Algebra", "Embeddings", "NLP"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "从向量、矩阵和点积出发，理解 embedding、相似度检索和神经网络层的基本数学结构。"
---

## 中文导读

这篇文章的目标不是重讲线性代数课本，而是回答一个更实用的问题：为什么向量和矩阵会一直出现在机器学习、NLP、LLM 和 retrieval 里？

## Working outline

1. What a vector means in ML
2. Why embeddings are vectors
3. Dot product and cosine similarity
4. Matrix multiplication as transformation
5. Neural layers as learned transformations
6. Retrieval as geometry

## Reference materials to digest

- [Deep Learning Book: Linear Algebra](https://www.deeplearningbook.org/contents/linear_algebra.html)
- [Stanford CS229: Linear Algebra Review](https://cs229.stanford.edu/materials.html-full)
- [Hugging Face Course](https://huggingface.co/docs/course/chapter1/1)

## My angle

I want this post to explain linear algebra through examples I actually use:

- sentence embeddings;
- nearest-neighbor search;
- attention scores;
- retrieval systems;
- dimensionality reduction for error analysis.

