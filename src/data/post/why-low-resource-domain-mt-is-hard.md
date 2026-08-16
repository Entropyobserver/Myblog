---
title: "Why Low-Resource Domain MT Is Hard"
publishDate: 2026-08-16
excerpt: "Domain-specific machine translation is not only a modeling problem. It is a data, terminology, evaluation, and risk problem."
category: "Multilingual AI"
track: "Research & Applications"
tags: ["Machine Translation", "Low-Resource", "Domain Adaptation", "Petroleum"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "低资源领域机器翻译难，不只是因为数据少，还因为平行语料噪声、术语精度、领域偏移和评估风险同时存在。"
---

## 中文导读

低资源领域机器翻译很容易被简化成一个问题：数据不够。但在我的 English--Norwegian petroleum MT 项目里，我越来越觉得真正的困难不是单点的，而是一个系统问题。

数据少当然重要，但还有噪声平行语料、专业术语、文本风格、领域偏移、评估指标失灵，以及高风险场景下对数字、方向、单位和法律/工程术语的高精度要求。

这篇文章先整理这个问题空间：为什么 general MT 在专业领域会失效，为什么 low-resource 设置会放大这些问题，以及为什么项目不能只靠“换一个更大的模型”解决。

## The short version

Low-resource domain machine translation is hard because the model is asked to do several things at once:

1. translate between languages;
2. adapt to a specialized domain;
3. preserve terminology and factual details;
4. learn from limited and noisy parallel data;
5. perform reliably under metrics that may not capture critical errors.

In general MT, a slightly unnatural phrase may be acceptable. In a technical domain, a wrong direction, number, unit, or term can change the meaning of a document.

## General models learn general distributions

Most strong MT systems are trained on broad web-scale data. This gives them fluent general translation ability, but it does not guarantee domain reliability.

Petroleum documents are different from general web text. They often contain specialized geological terminology, formulaic regulatory language, long noun phrases, and references to wells, licenses, fields, units, dates, depths, and coordinates.

This creates a domain mismatch. The model may know Norwegian and English in general, but not necessarily the specific relationship between petroleum-domain expressions in both languages.

## Parallel data is limited, and not all parallel data is useful

For English--Norwegian petroleum translation, high-quality parallel data is limited. We used the NPD corpus because it is professionally translated and domain-specific, but even a reliable source still needs inspection.

Low-resource does not only mean small. It means every training example matters more.

If the dataset contains duplicated templates, inconsistent Bokmål/Nynorsk variants, abnormal length ratios, or weakly aligned sentence pairs, the model has fewer chances to recover from that noise. In a large corpus, noise may be diluted. In a small corpus, noise can become the training signal.

This is why I treated data quality as part of the modeling pipeline, not as a preprocessing footnote.

## Terminology is not optional

In domain MT, terminology is not just vocabulary. It is part of meaning.

For example, two terms can be character-level similar but operationally distinct. A translation can receive a high automatic score while still making a critical terminology or directional error.

That changes the evaluation question from:

> Is the translation fluent?

to:

> Is the translation usable in this domain?

## Domain text can be both easier and harder

One surprising part of domain MT is that specialized text is not always harder in every way.

Petroleum regulatory text can be highly templated. This regularity helps fine-tuning: once the model learns frequent structures and terminology mappings, performance can improve quickly. In my data-scaling experiments, a relatively small subset already captured much of the performance gain.

But the same regularity creates risk. If the test data is too similar to repeated templates, automatic scores may overestimate generalization. A model can become excellent at one institution's writing style while remaining fragile on documents from another company or time period.

So the question is not simply "how high is the score?" It is "what distribution does this score represent?"

## Automatic metrics can miss important errors

BLEU and chrF are useful, but they are surface-sensitive. COMET adds a learned semantic signal, but it is still not a replacement for domain-aware inspection.

In my human error analysis, some critical errors were not reflected clearly by high BLEU scores. This matters because domain users may care about exactly the errors that surface metrics smooth over: wrong directions, wrong years, terminology confusion, variant mixing, and meaning-changing word choice.

## Why this matters for system design

The practical lesson is that low-resource domain MT should be designed as a pipeline:

1. choose a reliable corpus;
2. diagnose data quality;
3. clean and split carefully;
4. select a strong base model;
5. adapt efficiently;
6. tune systematically;
7. evaluate beyond one metric;
8. inspect domain-critical errors.

This is why my project combined data quality analysis, LoRA fine-tuning, data scaling, hyperparameter optimization, and final evaluation.

## Takeaway

Low-resource domain MT is hard because the easy solution—"just use a bigger model"—does not directly solve the core problem.

The core problem is alignment between data, domain, adaptation method, and evaluation.

For me, this project became a good example of a data-centric view of NLP: the model matters, but dataset quality and experimental design matter just as much.

