---
title: "How to Evaluate Machine Translation Beyond BLEU"
publishDate: 2026-08-12
excerpt: "A practical guide to BLEU, chrF, COMET, terminology metrics, and human error analysis for domain-specific MT."
category: "Model Evaluation"
track: "Research & Applications"
tags: ["Machine Translation", "Evaluation", "BLEU", "chrF", "COMET"]
language: "bilingual"
author: "Xiaojing Yang"
summary_zh: "BLEU 很有用，但远远不够。领域机器翻译需要结合 chrF、COMET、术语指标和人工错误分析。"
---

## 中文导读

机器翻译评估最危险的地方，是把一个自动分数当成“质量本身”。在专业领域里，一个翻译可以有很高 BLEU，却仍然犯下关键错误，比如方向、年份、数字、单位或术语错误。

这篇文章用领域 MT 的视角整理 BLEU、chrF、COMET、terminology metrics 和 human error analysis 的关系。

## Why MT evaluation is hard

Translation does not have only one correct answer. A sentence can be translated in multiple acceptable ways, especially across languages with different morphology, word order, and register.

This means MT evaluation is not simply accuracy.

The evaluation question depends on the use case:

- Is the translation fluent?
- Does it preserve meaning?
- Does it use the right terminology?
- Does it keep numbers and units correct?
- Is the target-language standard consistent?
- Would a domain expert trust it?

No single metric answers all of these questions.

## BLEU: useful but limited

BLEU measures n-gram overlap between model output and reference translation.

It is useful because it is fast, widely used, easy to compare across systems, and sensitive to exact phrase matches.

But BLEU has limitations:

- it rewards surface overlap;
- it can penalize valid paraphrases;
- it may miss meaning-changing errors;
- it does not directly check terminology correctness;
- it is weak for sentence-level reliability.

In domain MT, BLEU is helpful, but it should not be the only metric.

## chrF: character-level sensitivity

chrF measures character n-gram F-score. It is often useful for morphologically rich languages because it captures partial word overlap and inflectional similarity better than word-level overlap.

For Norwegian, this matters because morphology and written-standard variation can affect word forms.

chrF can be more forgiving than BLEU when the translation is close at the character level. But this also means chrF can still give high scores to errors that are visually similar but semantically different.

So chrF complements BLEU; it does not replace human judgment.

## COMET: learned semantic evaluation

COMET uses learned models to estimate translation quality. Compared with BLEU and chrF, it can better capture semantic adequacy.

This is especially useful when surface overlap is misleading.

However, COMET also has limits:

- it is more expensive to compute;
- it may not fully understand domain-specific terminology;
- it should be interpreted alongside other metrics;
- small COMET differences may not be practically meaningful.

In my project, commercial systems and fine-tuned models could differ across metrics. That is not a problem; it is a signal that metrics are observing different aspects of quality.

## Terminology metrics

For domain MT, terminology deserves its own evaluation.

A translation can be fluent and semantically close, but still use the wrong technical term. In petroleum-domain translation, this can matter more than a small grammar issue.

Terminology metrics can check:

- whether key source terms are translated correctly;
- whether preferred terms are used consistently;
- whether domain-specific entities are preserved;
- whether terminology errors cluster in certain document types.

This is one reason I later became interested in terminology-focused evaluation. Domain users care about whether the translation is usable, not only whether it resembles the reference.

## Human error analysis

Automatic metrics should be followed by human inspection, especially in high-stakes domains.

In my project, human error analysis on a sample of translations revealed error types such as:

- word choice errors;
- terminology confusion;
- written-standard mixing;
- wrong numbers or years;
- directional errors;
- meaning-changing critical errors.

Some of these errors were not clearly reflected in BLEU scores. This is the key lesson: high automatic scores can coexist with critical semantic failures.

## How I would report MT evaluation

For a domain MT system, I prefer an evaluation table that includes:

1. BLEU;
2. chrF;
3. COMET;
4. terminology accuracy;
5. confidence intervals or significance tests;
6. human error categories;
7. examples of critical errors.

Numbers are necessary, but examples make the risk visible.

## Evaluation is part of system design

Evaluation is not something that happens after the model is finished. It shapes the whole project.

If I know terminology matters, I should inspect terminology coverage in the data.

If I know BLEU misses critical errors, I should include human analysis.

If I know data is limited, I should report uncertainty.

Good evaluation changes what we build.

## Takeaway

BLEU is a useful starting point, but domain MT needs more than BLEU.

For specialized translation, I want to know not only whether the model produces similar text, but whether it preserves the information that domain users actually rely on.

