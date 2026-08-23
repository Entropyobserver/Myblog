---
title: "Training Data Attribution for NLP Research"
publishDate: 2026-08-23
excerpt: "A research-oriented guide to training-data attribution: attribution units, utility functions, Shapley values, influence methods, causality, scalability, and uncertainty."
category: "Explainability and Responsible AI"
track: "Research & Applications"
tags: ["Data Attribution", "Explainability", "Model Evaluation", "Shapley Values", "Machine Translation"]
language: "en"
author: "Xiaojing Yang"
translationKey: "training-data-attribution-for-nlp-research"
translationHref: "/zh/training-data-attribution-for-nlp-research"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Training-data attribution asks which parts of the training data are responsible for a model behavior, but the answer depends on the attribution unit, the utility function, the intervention, and the uncertainty we are willing to model.
  </p>
</div>

This note is written for my own research and interview preparation. It connects training-data attribution to multilingual/domain machine translation, especially the kind of group-level attribution I use when studying English--Norwegian domain adaptation.

The question is simple to say:

> Which training data influenced this model behavior?

The difficult part is making every word in that question precise.

![Training data attribution map](/images/blog/training-data-attribution-map.png)

## 1. What is training-data attribution?

Training-data attribution tries to explain a model behavior by assigning influence, contribution, or value to training data.

In NLP, the behavior may be:

- a translation metric such as BLEU, chrF, or COMET;
- terminology preservation in a domain-specific MT system;
- a model preference for Bokmål-like or Nynorsk-like output;
- a specific generated answer;
- a hallucination or factual error;
- a bias pattern across languages, domains, or demographic groups.

So training-data attribution is not only about finding a suspicious example. It can also ask which data sources, domains, languages, or written-standard groups shape a model's behavior.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Global attribution</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">
      Which data groups influence overall model behavior? Example: which written-standard data group changes BLEU, chrF, TermF1, or output style?
    </p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Local / instance attribution</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">
      Which training examples are most related to one specific prediction or generated answer?
    </p>
  </div>
</div>

My thesis-style setting is mainly global group-level attribution. I want to know how groups of written-standard training data affect domain MT behavior. Instance-level retrieval can still be useful, but it is a candidate-finding step, not automatically causal proof.

## 2. Attribution unit: what exactly receives credit?

The attribution unit is the object we assign contribution to.

It can be:

| Unit | Example | Typical question |
|---|---|---|
| dataset | all domain data | Did the domain corpus help? |
| source | NPD vs web data | Which source mattered? |
| domain | petroleum vs general text | Which domain caused the shift? |
| language/style group | Bokmål-like vs Nynorsk-like | Which written standard shapes output? |
| document | one PDF or report | Which document influenced behavior? |
| example | one sentence pair | Which pair influenced this translation? |
| token/feature | one term or phrase | Which phrase drove this output? |

For my project, the unit is:

```text
written-standard training-data groups
```

That choice is not just administrative. Attribution is only interpretable if the group boundary is meaningful. A clean group can support a clear claim. A boundary group is a useful warning: if the group mixes styles or data qualities, its attribution may be difficult to interpret.

## 3. Utility function: what behavior are we explaining?

Attribution needs a utility function. The utility defines what counts as model behavior.

In a simple classification setting, utility might be accuracy. In my domain MT setting, one scalar is not enough.

I would describe the utility as multi-dimensional:

```text
v(S) = (
  BLEU,
  chrF,
  TermF1,
  Bokmål output rate,
  Nynorsk output rate
)
```

Here, `S` is a coalition of data groups used for training or adaptation.

The crucial point is:

> The same data group can help one utility and hurt another.

For example, a Nynorsk-like group may:

- improve BLEU;
- reduce TermF1;
- increase Nynorsk output rate;
- shift style in a way that is good for one evaluation slice and bad for another.

This is why I call the attribution multi-faceted. If I compress everything into one score, I may hide the most interesting result.

## 4. Coalition and marginal contribution

A coalition is a subset of training-data groups. If I have four groups:

```text
G = {H, B, N, O}
```

where, for example:

- `H` = high-Bokmål;
- `B` = boundary group;
- `N` = Nynorsk-like;
- `O` = other domain data;

then there are:

```text
2^4 = 16
```

possible coalitions, including the empty set.

Examples:

| Coalition | Meaning |
|---|---|
| ∅ | no domain group |
| {H} | high-Bokmål only |
| {H, N} | high-Bokmål + Nynorsk-like |
| {H, B, N, O} | all groups |

The model behavior under coalition `S` is written as:

```text
v(S)
```

The marginal contribution of a group `g` in context `S` is:

```text
v(S ∪ {g}) - v(S)
```

Plain English:

> If the current training-data combination is S, how much does model behavior change when I add group g?

For example:

```text
v({H, N}) - v({H})
```

means: what changes when I add the Nynorsk-like group on top of high-Bokmål data?

## 5. Shapley value: contribution across contexts

Leave-one-out ablation asks one question:

```text
What happens if I remove group g from the full data?
```

That is:

```text
v(G) - v(G \ {g})
```

Shapley value asks a broader question:

```text
Across all possible coalition contexts, what is group g's average marginal contribution?
```

The formula is often written as:

```text
φ_g = Σ_{S ⊆ G \ {g}} w(S) [v(S ∪ {g}) - v(S)]
```

I do not need to recite the formula in an interview, but I do need to explain what it does.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Ablation vs Shapley</div>
  <div class="grid gap-0 text-sm md:grid-cols-2">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800">
      <strong>Ablation</strong><br />One context: remove g from the full set.
    </div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800">
      <strong>Shapley</strong><br />All contexts: average the contribution of g across possible coalitions.
    </div>
  </div>
</div>

Why is Shapley useful?

- It is more comprehensive than a single ablation.
- It captures context dependence.
- It can reveal interactions between data groups.
- It has a principled game-theoretic interpretation.

Why is it hard?

- Exact computation is exponential.
- With 4 groups, exact Shapley needs 16 coalition utilities.
- With 20 groups, there are 1,048,576 coalitions.
- With 100 groups, exact enumeration is impossible.

That scalability problem is not a footnote. It is one of the main research questions.

## 6. Correlation, attribution, and causality

This distinction is interview-critical.

| Concept | What it means | What it does not prove |
|---|---|---|
| similarity | two examples look similar or have similar gradients | one caused the other |
| attribution | a method assigns behavior change to data | the mechanism is fully causal |
| causal evidence | changing data changes behavior as predicted | universal generalization |

My group-level coalition retraining provides stronger intervention evidence because it actually changes the training data and observes model behavior.

Gradient similarity is weaker. It can retrieve candidate training examples that may be related to a test behavior, but it cannot by itself prove:

```text
This training example caused this answer.
```

The honest claim is:

```text
These examples are plausible influence candidates under this approximation.
```

## 7. Intervention validation

The cleanest way to validate attribution is to intervene.

A practical validation loop is:

1. identify high-attribution data;
2. delete, correct, reweight, or add counterfactual examples;
3. retrain or fine-tune;
4. observe whether behavior changes as predicted;
5. compare against random or size-matched baselines.

Possible interventions:

| Intervention | Example |
|---|---|
| deletion | remove high-impact group or examples |
| correction | fix mislabeled or noisy examples |
| reweighting | reduce the weight of over-dominant data |
| counterfactual addition | add examples with alternative style or terminology |
| retraining | rerun training under the intervention |

For my setting, a size-matched random baseline is important because group size is a confounder. If a large group appears influential, I need to ask whether its effect comes from identity, quantity, quality, or all of them.

## 8. Gradient similarity, Hessian, influence functions, and TracIn

Instance-level attribution often uses gradients.

For a training example `z_i`, the gradient is:

```text
g_i = ∇_θ L(z_i; θ)
```

Intuition:

> The gradient points in the parameter direction that would reduce the loss for that example.

If a training example and a test example have similar gradients, they may push the model in similar directions.

```text
cos(g_train, g_test)
```

But gradient similarity is not the same as causal influence.

### Influence functions

Influence functions ask:

> If I upweight or remove one training example slightly, how would the model parameters and test loss change?

A classic expression contains:

```text
- ∇_θ L_test^T H^{-1} ∇_θ L_train
```

where `H` is the Hessian, the matrix of second derivatives of the loss.

Intuition:

- gradient tells me the local direction;
- Hessian tells me the local curvature;
- inverse Hessian estimates how parameter changes propagate.

The limitation is that this is a local approximation. Large neural networks are non-convex, expensive, and sometimes unstable under influence-function assumptions.

### TracIn

TracIn avoids inverse Hessian computation. It traces training through checkpoints and uses gradient similarity across the training trajectory.

The core idea:

> If a training example repeatedly pushes the model in a direction that helps a test example during training, it receives high influence.

Compared with influence functions, TracIn is often easier to scale because it uses saved checkpoints and gradients. But it is still an approximation, not the same as retraining after deletion.

## 9. Scaling attribution

Exact Shapley does not scale to many groups or examples.

Three scalable directions are especially relevant:

### Monte Carlo Shapley

Instead of enumerating all coalitions, sample random orders of adding groups. Each time a group is added, record the utility change. Average over many sampled permutations.

Questions to ask:

- how many samples are enough?
- how large is estimator variance?
- when should sampling stop?
- can we build confidence intervals?
- which coalitions are most informative?

### Surrogate models / datamodels

Training a model for every coalition is expensive. A surrogate or datamodel learns:

```text
S → v(S)
```

Given which data are included, it predicts the model behavior that would result from training on that subset.

This can make attribution cheaper, but it introduces a new risk:

> surrogate attribution is only as reliable as the surrogate's prediction of retraining behavior.

### Hierarchical attribution

A practical research direction is to search in levels:

```text
data source → document → example → token / phrase
```

For example, first identify that a data source is influential, then narrow to documents, then examples, then terminology or style patterns.

This is a strong direction for doctoral research because it combines scalability, interpretability, and intervention validation.

## 10. Uncertainty: bootstrap, bias, variance, and random seeds

Attribution estimates are not fixed truths. They have uncertainty.

### Bootstrap confidence intervals

Bootstrap resamples the evaluation set with replacement and recalculates metrics or attribution estimates.

In my setting, bootstrap mainly measures:

```text
uncertainty from test-set sampling under fixed trained models
```

It does not fully cover:

- training randomness;
- data grouping uncertainty;
- attribution estimator uncertainty;
- hyperparameter search uncertainty.

### Bias and variance

Here, bias means statistical estimator bias, not social bias.

| Term | Meaning |
|---|---|
| estimator bias | whether the average estimate deviates from the true target |
| variance | how much the estimate changes across repeated samples |

For Monte Carlo Shapley, I would ask:

- is the estimator unbiased?
- does variance shrink as samples increase?
- how much compute buys how much precision?

### Random seed

Random seeds affect initialization, data order, dropout, optimization trajectory, and final model behavior. Three seeds can reveal instability, but three seeds are still limited evidence.

## 11. Confounding and generalization

Confounding is one of the biggest risks in data attribution.

If a group appears influential, the effect may come from:

- the group's identity;
- its size;
- data quality;
- task difficulty;
- duplicated templates;
- label or alignment errors;
- domain coverage;
- written-standard imbalance.

Size-matched random baselines help test whether group size alone explains the result. But they do not solve every confounder.

The correct generalization claim is narrow:

> Under this English--Norwegian domain MT setup, with these written-standard groups and this training protocol, I observed stable attribution patterns.

The incorrect claim would be:

> This proves all LLMs, languages, and pretraining corpora behave this way.

Research credibility comes from saying exactly what the evidence supports.

## 12. How I would explain my project in an interview

If someone asks what my project does, I would say:

> My project studies training-data attribution for English--Norwegian domain machine translation. Instead of asking only whether domain data improves the model, I ask which written-standard data groups contribute to which behaviors. I define utilities such as BLEU, chrF, terminology F1, and Bokmål/Nynorsk output rates. Then I retrain or evaluate models under different coalitions of data groups and use Shapley-style marginal contributions to estimate group-level effects.

If they ask why group-level attribution:

> Single-example attribution is expensive and noisy for large neural models. Group-level attribution is more interpretable for my research question because I care about written-standard data groups, not only individual sentence pairs.

If they ask why Shapley:

> Leave-one-out ablation measures one context: removing a group from the full data. Shapley averages marginal contribution across coalition contexts, so it better captures context dependence and interactions between data groups.

If they ask about causality:

> My coalition retraining gives stronger intervention evidence than pure similarity methods, because I actually change the training data and observe behavior. But I would still avoid overclaiming universal causality; the claim is conditional on the data, grouping, model, and training protocol.

## 13. Study order

For interview preparation, I would study in this order:

1. attribution unit, utility, coalition;
2. marginal contribution;
3. Shapley value;
4. ablation vs Shapley;
5. attribution vs causality;
6. deletion / retraining validation;
7. gradient and cosine similarity;
8. influence function and Hessian;
9. TracIn;
10. Monte Carlo Shapley;
11. surrogate models / datamodels;
12. bootstrap, bias, variance, confidence intervals.

## Takeaway

Training-data attribution is not one method. It is a research framework:

```text
define the unit
define the behavior
intervene on data
measure changes
estimate contribution
validate uncertainty
limit the claim
```

For my work, the most important habit is not memorizing formulas. It is being able to explain what each attribution result means, what it does not mean, and how I would validate it through data intervention.

## References and further reading

- [Shapley, L. S. A Value for n-Person Games](https://doi.org/10.1515/9781400829156-012)
- [Data Shapley: Equitable Valuation of Data for Machine Learning](https://proceedings.mlr.press/v97/ghorbani19c.html)
- [A Distributional Framework for Data Valuation](https://proceedings.mlr.press/v119/ghorbani20a.html)
- [Understanding Black-box Predictions via Influence Functions](https://proceedings.mlr.press/v70/koh17a.html)
- [Estimating Training Data Influence by Tracing Gradient Descent](https://papers.nips.cc/paper/2020/hash/e6385d39ec9394f2f3a354d9d2b88eec-Abstract.html)
- [Google Research: TracIn](https://research.google/blog/tracin-a-simple-method-to-estimate-training-data-influence/)
- [Datamodels: Understanding Predictions with Data and Data with Predictions](https://proceedings.mlr.press/v162/ilyas22a.html)
- [COMET: A Neural Framework for MT Evaluation](https://aclanthology.org/2020.emnlp-main.213/)
