---
title: 'My LoRA NMT Project: Research Question, Method, Findings, and Limitations'
publishDate: 2026-08-24
excerpt: 'A research-story version of my LoRA NMT project: problem framing, data, method, evaluation, findings, limitations, and future work.'
category: 'Multilingual AI'
track: 'Research & Applications'
tags: ['LoRA', 'Machine Translation', 'Research Story', 'Domain Adaptation', 'NMT']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'my-lora-nmt-project-research-question-method-findings'
translationHref: '/zh/my-lora-nmt-project-research-question-method-findings'
translationLabel: '中文'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Research story</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    This project asks how parameter-efficient fine-tuning can adapt a multilingual MT model to a low-resource technical domain, and how we should evaluate whether that adaptation is actually useful.
  </p>
</div>

This is the article I would use to explain the LoRA NMT project in an interview. The goal is not to list every implementation detail. The goal is to make the research logic clear.

## 1. Problem

General multilingual MT models are strong, but they are not automatically reliable in specialised technical domains. Petroleum-domain text contains terminology, formal regulatory phrasing, long noun phrases, numbers, units, licences, fields, and document-specific conventions.

In a low-resource setting, the model cannot simply rely on massive domain data. Every sentence pair matters more, and noise in the corpus can become part of the training signal.

The research problem is:

> Can LoRA adapt a pretrained MT model to English--Norwegian petroleum translation using limited clean parallel data, while remaining efficient and stable enough for systematic experimentation?

## 2. Why this problem matters

This problem matters for three reasons.

First, domain MT is not only about fluency. In technical translation, a wrong term, number, direction, or unit can change the meaning of a document.

Second, low-resource adaptation is a realistic research setting. Many useful domains do not have millions of high-quality sentence pairs.

Third, parameter-efficient methods such as LoRA change what experiments are feasible. If adaptation is cheaper, we can test data scale, hyperparameters, seeds, and evaluation variants more systematically.

## 3. Data

The project uses English--Norwegian petroleum-domain parallel data. The important point is not only that the data is domain-specific, but that it must be inspected as a research object.

Key data questions include:

- Are sentence pairs well aligned?
- Are there duplicated templates?
- Are length ratios abnormal?
- Is terminology covered?
- Are Bokmål/Nynorsk or written-standard patterns relevant?
- Does the test set represent the target deployment domain?

This is why data diagnostics are part of the project rather than a small preprocessing footnote.

## 4. Method

The method is LoRA-based adaptation of a pretrained MT model.

The technical idea is to freeze the base model and learn low-rank updates in selected modules:

$$
W' = W + BA
$$

This creates a controlled adaptation mechanism. Instead of updating all parameters, the model learns a smaller update that may be sufficient for domain-specific terminology and style.

The core hyperparameters include:

- rank $r$, which controls update capacity;
- alpha $\alpha$, which controls update scale;
- dropout, which can regularise the adapter;
- target modules, which determine where adaptation is inserted.

## 5. Experiment design

The project should be understood as a sequence of research questions:

| Experiment               | Question                                            |
| ------------------------ | --------------------------------------------------- |
| LoRA vs base model       | Does domain adaptation improve translation quality? |
| LoRA vs full fine-tuning | What is the efficiency/performance trade-off?       |
| HPO                      | Which LoRA settings are stable and important?       |
| Data scaling             | How much domain data is enough?                     |
| Error analysis           | What kinds of errors remain?                        |

This design is stronger than only reporting one best score because it explains why the result happens.

## 6. Evaluation

A good evaluation protocol should combine automatic metrics and domain-aware inspection.

I would report:

- BLEU for surface overlap;
- chrF for character-level similarity;
- COMET for learned semantic quality;
- terminology metrics for domain term preservation;
- human error analysis for critical failures;
- seed variation or confidence intervals where possible.

The key principle is that one metric cannot represent the whole research claim.

## 7. Findings to look for

The project can support several kinds of findings:

1. LoRA can adapt a pretrained model to a technical domain with far fewer trainable parameters than full fine-tuning.
2. Data quality can matter as much as model choice in a low-resource corpus.
3. Hyperparameters such as alpha, rank, and dropout affect not only score but stability.
4. Automatic MT metrics may hide terminology or critical semantic errors.
5. Data scaling can reveal whether the corpus has enough useful domain signal or whether performance saturates early.

These are research findings because they explain the adaptation process, not just the final leaderboard position.

## 8. Limitations

The limitations are also important:

- the dataset may not cover the full petroleum domain;
- results may depend on the chosen base model;
- automatic metrics may not capture all domain-critical errors;
- LoRA may not fix missing terminology or poor tokenization;
- full fine-tuning may still win when enough data and compute are available;
- conclusions need stronger statistical and human validation.

Being explicit about these limits makes the project more credible.

## 9. Future work

Natural extensions include:

- document-level evaluation;
- better terminology extraction and term-level metrics;
- human evaluation with domain-aware error categories;
- hierarchical data attribution to identify which data sources matter;
- comparing LoRA with other PEFT methods;
- studying factuality and style consistency in multilingual generation.

This is where the project connects to broader PhD research: data-centric adaptation, evaluation, and attribution for multilingual models.

## Interview answer

My LoRA NMT project studies low-resource domain adaptation for English--Norwegian petroleum translation. The problem is that general MT models can be fluent but unreliable on specialised terminology and formal technical text. I use LoRA because it provides controlled adaptation with far fewer trainable parameters, making repeated experiments more feasible. I evaluate the system not only with BLEU, chrF, and COMET, but also with terminology and error analysis, because domain usefulness cannot be reduced to one metric. The contribution is a research pipeline that connects data quality, parameter-efficient adaptation, hyperparameter tuning, and domain-aware evaluation.
