---
title: "What LoRA Actually Changes"
publishDate: 2026-08-09
excerpt: "A practical note on low-rank adaptation, parameter-efficient fine-tuning, and why LoRA is useful for NLP experiments."
category: "NLP & LLMs"
track: "Foundations"
tags: ["LoRA", "Fine-tuning", "PEFT"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "LoRA 的核心不是重新训练整个模型，而是在部分权重更新中加入低秩矩阵，从而高效适配任务或领域。"
---

## 中文导读

LoRA 很容易被讲成“省参数的 fine-tuning 方法”，但更重要的问题是：它到底改变了模型里的什么？为什么低秩更新在实践中有用？

## Working outline

1. Full fine-tuning vs parameter-efficient fine-tuning
2. The idea of a low-rank update
3. Where LoRA modules are inserted
4. Rank, alpha, dropout, and target modules
5. Why LoRA is useful for controlled experiments
6. What LoRA does not solve

## Reference materials to digest

- [LoRA paper](https://arxiv.org/abs/2106.09685)
- [Hugging Face Transformers fine-tuning docs](https://huggingface.co/docs/transformers/training)
- [Hugging Face PEFT documentation](https://huggingface.co/docs/peft/index)

## My angle

This post should bridge foundation and research: LoRA as a practical adaptation method, but also as an experimental tool for studying data, domains, and modular experts.

