---
title: "BLEU, chrF, and COMET: A Practical Guide"
publishDate: 2026-08-08
excerpt: "A practical model-evaluation note on three common machine translation metrics and what each one can and cannot tell us."
category: "Model Evaluation"
track: "Research & Applications"
tags: ["Machine Translation", "Evaluation", "Metrics"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "BLEU、chrF 和 COMET 都能评估机器翻译，但它们观察质量的角度不同，不能只看一个分数。"
---

## 中文导读

机器翻译没有唯一标准答案，所以评估指标必须谨慎使用。BLEU、chrF、COMET 分别代表不同的质量信号：表面重合、字符级相似、模型学习到的质量判断。

## Working outline

1. Why MT evaluation is hard
2. BLEU: n-gram overlap
3. chrF: character n-gram F-score
4. COMET: learned evaluation
5. Why metrics can disagree
6. How I report MT evaluation results

## Reference materials to digest

- [COMET documentation](https://unbabel.github.io/COMET/)
- [Google Cloud: Evaluate translation models](https://docs.cloud.google.com/translate/docs/advanced/translation-model-evaluation)
- [Koehn: Statistical Machine Translation, Evaluation chapter](https://www.cambridge.org/core/books/abs/statistical-machine-translation/evaluation/EE4E5CFBA54664029CB9C1FE8D1A2A71)

## My angle

This post should connect directly to multilingual AI and model evaluation, but remain readable for someone reviewing my foundations.

