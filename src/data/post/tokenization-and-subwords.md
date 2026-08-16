---
title: "Tokenization and Subwords"
publishDate: 2026-08-10
excerpt: "An NLP foundation note on how text becomes model input, and why tokenization matters for multilingual systems."
category: "NLP & LLMs"
track: "Foundations"
tags: ["Tokenization", "NLP", "LLMs", "Multilingual AI"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "Tokenization 决定文本如何进入模型，尤其会影响多语言、低资源语言和领域术语的建模。"
---

## 中文导读

LLM 看到的不是“单词”，而是 token。对 multilingual NLP 来说，tokenization 会影响效率、表示、罕见词、术语和低资源语言表现。

## Working outline

1. Characters, words, and subwords
2. BPE, WordPiece, and Unigram
3. Why tokenization matters for multilingual systems
4. Domain terminology and rare words
5. Tokenization in translation and retrieval
6. What to inspect before fine-tuning

## Reference materials to digest

- [Hugging Face Course: Tokenizers](https://huggingface.co/docs/course/chapter6/1)
- [Hugging Face Course: NLP and LLMs](https://huggingface.co/docs/course/chapter1/1)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)

## My angle

This note should support later posts on English--Norwegian machine translation, terminology accuracy, and multilingual evaluation.

