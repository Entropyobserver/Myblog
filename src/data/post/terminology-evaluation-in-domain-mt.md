---
title: 'Terminology as an Evaluation Problem in Domain MT'
publishDate: 2026-08-24
excerpt: 'Why terminology should be evaluated explicitly in domain machine translation, especially when automatic metrics can hide critical technical errors.'
category: 'Model Evaluation'
track: 'Research & Applications'
tags: ['Machine Translation', 'Terminology', 'COMET', 'BLEU', 'Domain Adaptation']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'terminology-evaluation-in-domain-mt'
translationHref: '/zh/terminology-evaluation-in-domain-mt'
translationLabel: '中文'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Research question</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    How can we evaluate whether a domain MT system preserves the technical terms that matter to real users?
  </p>
</div>

In domain machine translation, terminology is not decorative vocabulary. It is part of the meaning of the document.

A translation can be fluent, grammatical, and even receive a strong automatic metric score while still failing on a term that a domain expert would consider critical. This is why terminology needs to be treated as an evaluation problem, not just a preprocessing detail.

## Why general MT metrics are not enough

BLEU, chrF, and COMET are useful, but each one sees the translation through a different lens.

| Metric | What it captures              | What it may miss                                               |
| ------ | ----------------------------- | -------------------------------------------------------------- |
| BLEU   | n-gram overlap with reference | semantic adequacy, valid paraphrases, rare terminology         |
| chrF   | character-level similarity    | meaning-changing substitutions                                 |
| COMET  | learned semantic quality      | fine-grained domain terminology and high-risk technical errors |

For petroleum-domain translation, a small terminology error may matter more than several minor fluency issues. If the model mistranslates a unit, direction, licence term, well name, or geological concept, the translation may become unreliable even when the sentence sounds natural.

## Terminology as a separate utility

In research terms, terminology can be defined as a separate utility function. Instead of asking only:

> Is the whole translation good?

we ask:

> Are the domain terms translated correctly and consistently?

This changes the evaluation design. We may need a term list, source-term detection, expected target terms, and a way to count correct preservation.

A simple terminology evaluation might include:

1. extracting source-side domain terms;
2. mapping them to expected target terms;
3. checking whether the model output contains the correct target expression;
4. reporting precision, recall, or F1 over term occurrences;
5. manually inspecting ambiguous cases.

## Why this matters for LoRA NMT

LoRA may improve general domain adaptation while still leaving terminology fragile. This is especially likely when:

- the term is rare in the fine-tuning data;
- the tokenizer fragments the term into awkward subwords;
- the reference contains one valid term but the model produces another acceptable variant;
- automatic metrics reward surface overlap more than technical correctness;
- Bokmål/Nynorsk variation affects the target term form.

So a LoRA experiment should not only report aggregate BLEU or COMET. It should ask whether the adapter learned the domain-specific mappings that motivated the adaptation in the first place.

## A practical evaluation table

For a domain MT paper or project report, I would prefer a table like this:

| System           | BLEU | chrF | COMET | Term recall | Critical errors |
| ---------------- | ---: | ---: | ----: | ----------: | --------------: |
| Base model       |   -- |   -- |    -- |          -- |              -- |
| LoRA             |   -- |   -- |    -- |          -- |              -- |
| Full fine-tuning |   -- |   -- |    -- |          -- |              -- |

The exact numbers depend on the experiment, but the structure matters. It prevents the report from hiding terminology failures behind a single headline metric.

## Human error analysis

Terminology metrics still need human inspection. A term can be translated correctly but appear in a different inflected form. A translation can use a synonym that is acceptable in ordinary language but wrong in the technical domain. Some errors are only visible when reading the whole sentence.

Useful error categories include:

- wrong technical term;
- omitted term;
- untranslated term;
- inconsistent term across sentences;
- wrong unit, number, field name, or licence name;
- written-standard mixing;
- meaning shift caused by a small word choice.

This is where domain MT evaluation becomes research-like: the metric tells us where to look, but the error taxonomy explains what failed.

## Connection to my project

In my English--Norwegian petroleum MT setting, terminology is central because the domain contains specialised expressions that are easy for general models to approximate but hard to translate reliably. LoRA adaptation should therefore be judged not only by whether the sentence becomes more fluent, but by whether the output becomes more usable for petroleum-domain text.

## Limitations

Terminology evaluation has its own difficulties:

- term lists may be incomplete;
- one source term may have multiple valid translations;
- automatic matching may miss inflection or paraphrase;
- references may not be the only acceptable output;
- domain experts may disagree on preferred terminology.

This means term metrics should complement, not replace, human error analysis.

## Interview answer

In domain MT, I would evaluate terminology separately because general metrics can miss critical technical errors. For English--Norwegian petroleum translation, I would build or inspect a domain term list, check whether source terms are preserved in the target output, and combine term-level metrics with human error analysis. This gives a clearer picture of whether LoRA improves the behaviour that actually matters for the domain.
