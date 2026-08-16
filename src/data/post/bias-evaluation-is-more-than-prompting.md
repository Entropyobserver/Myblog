---
title: "Bias Evaluation Is More Than Prompting"
publishDate: 2026-08-05
excerpt: "A responsible-AI note on controlled evaluation design, prompts, labels, metrics, human validation, and model-auditing evidence."
category: "Explainability & Responsible AI"
track: "Research & Applications"
tags: ["Bias Evaluation", "Responsible AI", "XAI"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "Bias evaluation 不是随便问模型几个敏感问题，而是需要 controlled prompts、清晰标签、指标、人工验证和统计分析。"
---

## 中文导读

偏见评估不能只靠“我问了模型几个问题”。如果要让结论可信，需要控制变量、设计 prompt 模板、定义标签、检查 annotation quality，并把自动指标和人工证据联系起来。

## Working outline

1. Why casual prompting is not evaluation
2. Case design and controlled variables
3. Prompt templates as experimental controls
4. Label definitions and human validation
5. Metrics and statistical reliability
6. What counts as evidence in model auditing

## Reference materials to digest

- [Google People + AI Guidebook](https://pair.withgoogle.com/guidebook-v2/)
- [Google Responsible AI practices](https://ai.google/responsibility/responsible-ai-practices/)
- [Distill: Building Blocks of Interpretability](https://distill.pub/2018/building-blocks/)

## My angle

This post should become a bridge between foundation topics like statistics and research topics like VLM bias, model auditing, and data attribution.

