---
title: "Data Quality Diagnostics for Parallel Corpora"
publishDate: 2026-08-14
excerpt: "A practical note on diagnosing parallel corpora through alignment, duplicates, length ratio, completeness, terminology, and domain coverage."
category: "Research Engineering"
track: "Foundations"
tags: ["Data Quality", "Parallel Corpora", "Machine Translation", "Diagnostics"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "平行语料质量诊断不只是清洗文本，而是系统检查 alignment、duplicates、length ratio、completeness 和 domain coverage。"
---

## 中文导读

在机器翻译项目里，数据质量经常比模型选择更早决定结果上限。尤其是低资源领域 MT：如果只有一万多句可用平行语料，那么每一个重复句、错配句、异常长度句、术语缺失都会被放大。

这篇文章整理我在 English--Norwegian petroleum MT 项目里使用的数据质量诊断思路：不是为了追求一个漂亮的 cleaning pipeline，而是为了让训练数据真的适合模型学习。

## Why parallel corpus quality matters

A parallel corpus is not just a pile of sentence pairs. It is the supervision signal for the translation model.

If source and target sentences are misaligned, the model learns weak or contradictory mappings. If the corpus is duplicated, the model may overfit templates. If domain terminology is sparse or inconsistent, the model may become fluent but unreliable.

In low-resource domain MT, quality errors are especially costly because there is not enough data to average them out.

## What I check first

### 1. Sentence length

Length distributions reveal empty segments, extremely long sentences, segmentation errors, and mismatched source-target lengths.

Length alone does not prove bad alignment, but abnormal length ratios are useful warning signals.

### 2. Alignment quality

Parallel data should preserve meaning across languages. In practice, some sentence pairs may be only partially parallel, mis-segmented, or too loosely related.

For this, I check semantic similarity signals and inspect suspicious examples manually.

### 3. Duplicates

Duplicates are common in regulatory or institutional corpora because many sentences are template-like.

There are different levels of duplication: exact duplicate pairs, same source with different targets, same target with different sources, and near-duplicate templates.

In my project, source-level deduplication was important because some repeated sources had minor target variations caused by Bokmål/Nynorsk mixing, formatting, or paraphrasing rather than genuinely different translations.

### 4. Completeness

A sentence pair can be aligned but incomplete. For example, the target may omit a number, date, unit, field name, or clause.

For technical translation, omissions are not harmless. A fluent but incomplete translation can be more dangerous than an awkward complete one.

### 5. Domain coverage

The corpus should contain the terminology and document types the final system is expected to handle.

For petroleum MT, this includes domain terms related to drilling, fields, licenses, production, ownership, units, and regulatory descriptions.

## OQS-style thinking

In my project, I organized data quality into a reusable diagnostic framework. The idea was not to train a new filtering model, but to make the quality signals explicit and controllable.

The dimensions included signals such as semantic alignment, terminology coverage, fluency, consistency, length ratio, and duplication.

This kind of framework is heuristic, but intentionally so. The goal is transparency. In low-resource settings, I want to know why data is removed, not only that a black-box filter rejected it.

## Why not only use standard filtering tools?

Tools like OpusFilter or Bicleaner are useful for general parallel-data filtering. They are good at removing obvious noise.

But domain MT often needs additional checks:

- Is the domain terminology preserved?
- Are technical entities complete?
- Are written-standard variants consistent?
- Does the sentence pair match the target deployment domain?

So I see domain-specific diagnostics as complementary, not as a replacement for standard tools.

## The quantity-quality trade-off

Cleaning reduced the NPD corpus from about 26,000 sentence pairs to around 17,000. That looks like a loss if we only count examples.

But in low-resource domain MT, keeping more data is not always better. Noisy examples can harm learning more than clean examples help. The goal is not maximum data quantity; it is maximum useful supervision.

> More data improves coverage, but cleaner data improves signal.

## A practical checklist

Before training on a parallel corpus, I would ask:

1. Are source and target sentences truly parallel?
2. Are there abnormal length ratios?
3. Are important entities preserved?
4. Are duplicates inflating the dataset?
5. Is domain terminology covered?
6. Are language variants mixed in the target?
7. Is the split done at the right level?
8. Could the test set contain near-duplicates of training examples?
9. Does automatic filtering remove useful domain examples?
10. Are cleaning decisions documented?

## Takeaway

Data quality diagnostics are part of model development, not a separate preprocessing chore.

For domain MT, a good corpus is not simply a large corpus. It is a corpus where the model can learn the right mappings for the target domain without being misled by noise, repetition, or inconsistent signals.

