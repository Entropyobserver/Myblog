---
title: 'Attribution Units: From Data Sources to Individual Examples'
publishDate: 2026-08-23
excerpt: 'Why attribution units matter: source, group, document, example, and token-level attribution answer different research questions and support different kinds of evidence.'
category: 'Explainability and Responsible AI'
track: 'Research & Applications'
tags: ['Training Data Attribution', 'Explainability', 'Model Evaluation', 'Shapley Values', 'NLP Research']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'attribution-units-data-sources-to-examples'
translationHref: '/zh/attribution-units-data-sources-to-examples'
translationLabel: '中文'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">The attribution unit is not a technical detail. It defines the scientific claim. A source-level claim, a document-level claim, and an example-level claim are not interchangeable.</p>
</div>

This note is part of my series **Training Data Attribution for NLP and LLM Research**. The series is written as both a research notebook and an interview preparation path: each article should help me explain the idea clearly, connect it to my thesis, and identify what would become future PhD work.

**Guiding question:** What exactly receives credit or blame in training-data attribution?

![Training data attribution map](/images/blog/training-data-attribution-map.png)

## Intuition

If I say a group of Norwegian petroleum data helped domain terminology, I am making a different claim from saying one sentence pair caused one translation. Coarser units are often more stable and interpretable, while finer units can be more actionable but noisier and harder to validate.

In NLP and LLM research, this matters because model behaviour is deeply shaped by data mixture. A model may be fluent because of broad web text, domain-accurate because of specialised documents, safer because of curated instruction data, or biased because of repeated patterns in a subset of the corpus. Training-data attribution gives us language for asking these questions systematically instead of only saying "the data matters".

## Formal lens

Let the training set be partitioned into units G = {g_1, ..., g_m}. Each g_i may be a source, group, document, example, or token subset. Attribution estimates phi_i for each unit. Changing the partition changes the game: splitting one source into documents can reveal heterogeneity, but it can also increase variance and computational cost.

The important discipline is to define the attribution setup before interpreting the score:

| Design choice    | Question to answer                                                                      |
| ---------------- | --------------------------------------------------------------------------------------- |
| Attribution unit | What receives credit: source, group, document, example, or token?                       |
| Utility function | Which behaviour is being explained: quality, terminology, style, factuality, or safety? |
| Intervention     | Are we adding, deleting, reweighting, correcting, or retraining?                        |
| Estimator        | Is the score exact, sampled, gradient-based, surrogate-based, or heuristic?             |
| Uncertainty      | How stable is the score across seeds, samples, metrics, and evaluation sets?            |

## NLP / LLM example

For a domain MT thesis, a practical hierarchy is source -> document family -> document -> sentence pair -> term/token. The top level helps answer research questions about data collection. The middle level helps audit corpora. The bottom level helps inspect examples that may explain a particular error.

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

I would explain my attribution unit before reporting any score. In my thesis setting, group-level units are appropriate because I care about interpretable data sources and written-standard groups, not only isolated training examples. Instance-level methods are useful later for diagnosis, but they should be nested inside a broader group-level picture.

## References and reading path

- Lloyd Shapley, _A Value for n-Person Games_.
- Ghorbani and Zou, _Data Shapley: Equitable Valuation of Data for Machine Learning_.
- Koh and Liang, _Understanding Black-box Predictions via Influence Functions_.
- Pruthi et al., _Estimating Training Data Influence by Tracing Gradient Descent_.
- Ilyas et al., _Datamodels: Predicting Predictions from Training Data_.
- Rei et al., _COMET: A Neural Framework for MT Evaluation_.
