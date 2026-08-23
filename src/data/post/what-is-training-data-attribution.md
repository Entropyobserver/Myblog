---
title: 'What Is Training Data Attribution?'
publishDate: 2026-08-23
excerpt: 'A first research-oriented explanation of training-data attribution for NLP and LLMs: what it explains, how it differs from feature attribution, and why it matters for evaluation and data-centric research.'
category: 'Explainability and Responsible AI'
track: 'Research & Applications'
tags: ['Training Data Attribution', 'Explainability', 'Model Evaluation', 'Shapley Values', 'NLP Research']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'what-is-training-data-attribution'
translationHref: '/zh/what-is-training-data-attribution'
translationLabel: '中文'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Training-data attribution does not explain which input words caused one output. It asks which training data sources, groups, documents, or examples shaped a model behaviour before inference even happened.</p>
</div>

This note is part of my series **Training Data Attribution for NLP and LLM Research**. The series is written as both a research notebook and an interview preparation path: each article should help me explain the idea clearly, connect it to my thesis, and identify what would become future PhD work.

**Guiding question:** Which parts of the training data are responsible for a model behaviour?

![Training data attribution map](/images/blog/training-data-attribution-map.png)

## Intuition

In ordinary interpretability, we often look inside one prediction: which input tokens mattered for this answer? Training-data attribution moves the lens backward. It treats the trained model as the result of a data-generating and training process, then asks which training records would receive credit or blame if we could carefully compare alternative training sets.

In NLP and LLM research, this matters because model behaviour is deeply shaped by data mixture. A model may be fluent because of broad web text, domain-accurate because of specialised documents, safer because of curated instruction data, or biased because of repeated patterns in a subset of the corpus. Training-data attribution gives us language for asking these questions systematically instead of only saying "the data matters".

## Formal lens

A minimal formal view is to define a utility function u(D) that measures a behaviour of a model trained on dataset D. Attribution then assigns a score phi_i to a unit i, such as a source, group, document, or example, based on how u changes when that unit is included, removed, reweighted, or otherwise intervened on.

The important discipline is to define the attribution setup before interpreting the score:

| Design choice    | Question to answer                                                                      |
| ---------------- | --------------------------------------------------------------------------------------- |
| Attribution unit | What receives credit: source, group, document, example, or token?                       |
| Utility function | Which behaviour is being explained: quality, terminology, style, factuality, or safety? |
| Intervention     | Are we adding, deleting, reweighting, correcting, or retraining?                        |
| Estimator        | Is the score exact, sampled, gradient-based, surrogate-based, or heuristic?             |
| Uncertainty      | How stable is the score across seeds, samples, metrics, and evaluation sets?            |

## NLP / LLM example

For English--Norwegian domain MT, a behaviour could be COMET on petroleum test sentences, terminology F1 for terms such as reservoir pressure, or a tendency to produce Bokmål-like output. The attribution unit could be an NPD source, a written-standard group, or a document family. A good attribution statement must say all of these choices explicitly.

This is why I do not want to treat attribution as a generic interpretability topic. For my profile, the natural connection is multilingual and domain-specific NLP: low-resource settings, technical terminology, written-standard variation, and evaluation beyond one headline metric.

## Connection to my thesis

In my thesis narrative, training-data attribution is useful because it turns a vague data question into an experimental design:

1. define interpretable data units;
2. define the model behaviour to explain;
3. compare controlled data coalitions or interventions;
4. estimate contribution;
5. report uncertainty and limitations;
6. decide what evidence is strong enough to support a causal-style claim.

That structure helps me avoid overclaiming. A score is not automatically a causal explanation. It is a measurement produced by a specific setup.

## What I have done, understand, and would extend

| Level                                        | Status                                                                                                                                              |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Already completed / thesis-ready             | Group-level attribution, coalition thinking, metric-based utilities, cautious interpretation, random baselines, bootstrap-style reliability checks. |
| I understand but may not fully implement yet | Instance-level gradient attribution, influence functions, TracIn, Monte Carlo Shapley, surrogate/datamodel approximations.                          |
| Strong PhD extension                         | Hierarchical attribution, intervention-based validation, factuality/style-specific utilities, scalable attribution for LLM data mixtures.           |

## Interview answer

Training-data attribution asks how training data contributes to model behaviour. In my project, I focus on group-level attribution for domain MT: I define interpretable data groups, train or evaluate models under controlled data coalitions, and measure how quality, terminology, and style change. I treat attribution as evidence about data influence, not as automatic causal proof unless it is validated by intervention.

## References and reading path

- Lloyd Shapley, _A Value for n-Person Games_.
- Ghorbani and Zou, _Data Shapley: Equitable Valuation of Data for Machine Learning_.
- Koh and Liang, _Understanding Black-box Predictions via Influence Functions_.
- Pruthi et al., _Estimating Training Data Influence by Tracing Gradient Descent_.
- Ilyas et al., _Datamodels: Predicting Predictions from Training Data_.
- Rei et al., _COMET: A Neural Framework for MT Evaluation_.
