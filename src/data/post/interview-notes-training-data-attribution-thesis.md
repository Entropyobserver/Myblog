---
title: 'Interview Notes: Explaining My Training-Data Attribution Thesis'
publishDate: 2026-08-23
excerpt: 'A compact interview narrative for a training-data attribution thesis: research question, method, contribution, limitations, and PhD extensions.'
category: 'Explainability and Responsible AI'
track: 'Research & Applications'
tags: ['Training Data Attribution', 'Explainability', 'Model Evaluation', 'Shapley Values', 'NLP Research']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'interview-notes-training-data-attribution-thesis'
translationHref: '/zh/interview-notes-training-data-attribution-thesis'
translationLabel: '中文'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">A strong interview answer separates what I completed, what I understand, and what I would extend in a PhD. That honesty makes the research story stronger, not weaker.</p>
</div>

This note is part of my series **Training Data Attribution for NLP and LLM Research**. The series is written as both a research notebook and an interview preparation path: each article should help me explain the idea clearly, connect it to my thesis, and identify what would become future PhD work.

**Guiding question:** How should I explain the thesis clearly in an interview?

![Training data attribution map](/images/blog/training-data-attribution-map.png)

## Intuition

Interviewers do not only want the final metric. They want to know whether I can define a research problem, justify methodology, understand limitations, and propose the next scientifically meaningful step.

In NLP and LLM research, this matters because model behaviour is deeply shaped by data mixture. A model may be fluent because of broad web text, domain-accurate because of specialised documents, safer because of curated instruction data, or biased because of repeated patterns in a subset of the corpus. Training-data attribution gives us language for asking these questions systematically instead of only saying "the data matters".

## Formal lens

A concise structure is: problem -> gap -> method -> evidence -> limitation -> next step. For this thesis, the problem is understanding which training data groups influence domain MT behaviour. The method is group-level coalition attribution with carefully defined utilities and reliability checks.

The important discipline is to define the attribution setup before interpreting the score:

| Design choice    | Question to answer                                                                      |
| ---------------- | --------------------------------------------------------------------------------------- |
| Attribution unit | What receives credit: source, group, document, example, or token?                       |
| Utility function | Which behaviour is being explained: quality, terminology, style, factuality, or safety? |
| Intervention     | Are we adding, deleting, reweighting, correcting, or retraining?                        |
| Estimator        | Is the score exact, sampled, gradient-based, surrogate-based, or heuristic?             |
| Uncertainty      | How stable is the score across seeds, samples, metrics, and evaluation sets?            |

## NLP / LLM example

I would explain that I focus on low-resource/domain MT because data quality and composition matter strongly. Instead of only reporting one best model, I ask which data groups contribute to quality, terminology, or style. This connects explainability, evaluation, and data-centric AI.

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

My thesis investigates training-data attribution for domain machine translation. I define interpretable data groups, evaluate their marginal contributions through coalition-style experiments, and analyse how different groups affect quality, terminology, and style. The main contribution is not only a set of scores, but a framework for asking data-centric questions about multilingual model behaviour. The limitations are scalability, approximation error, and the need for stronger intervention-based validation. In a PhD, I would extend this toward hierarchical attribution, instance-level validation, and attribution for factuality and style in LLMs.

## References and reading path

- Lloyd Shapley, _A Value for n-Person Games_.
- Ghorbani and Zou, _Data Shapley: Equitable Valuation of Data for Machine Learning_.
- Koh and Liang, _Understanding Black-box Predictions via Influence Functions_.
- Pruthi et al., _Estimating Training Data Influence by Tracing Gradient Descent_.
- Ilyas et al., _Datamodels: Predicting Predictions from Training Data_.
- Rei et al., _COMET: A Neural Framework for MT Evaluation_.
