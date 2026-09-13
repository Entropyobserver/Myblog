---
title: 'Why Hybrid Retrieval and Reranking? From Candidates to Better Evidence'
publishDate: 2026-09-12T11:00:00+02:00
excerpt: 'A visual guide to candidate generation, BM25 and dense fusion, Reciprocal Rank Fusion, cross-encoder reranking, and the limits of a two-stage retrieval pipeline.'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'Hybrid Retrieval', 'RRF', 'Reranking', 'Cross-Encoder']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'hybrid-retrieval-and-reranking'
translationHref: '/zh/hybrid-retrieval-and-reranking'
translationLabel: '中文'
series: 'RAG Foundations'
seriesOrder: 4
seriesTotal: 6
seriesHref: '/series/rag-foundations'
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Hybrid retrieval improves coverage by combining different search signals. Reranking then spends more computation on a small candidate set to improve ordering. Fusion finds more possibilities; reranking judges them more carefully.
  </p>
</div>

The [previous article](/keyword-vs-vector-retrieval) showed that BM25 and dense retrieval fail differently. A practical system can use both instead of forcing one method to solve every query.

![Hybrid retrieval merges lexical and dense candidate lists](/images/blog/hybrid-retrieval-rrf-en.svg)

## 1. Why retrieval is often split into stages

A production corpus may contain millions of chunks. A highly expressive model cannot compare the query with every chunk at full cost.

The usual compromise is a funnel:

```text
large corpus
   ↓ fast candidate retrieval
Top-50 or Top-100
   ↓ stronger reranker
Top-5 or Top-10
   ↓ context construction
generator
```

The first stage optimizes **coverage and speed**. The second stage optimizes **ordering precision** inside the candidate set.

## 2. What “hybrid retrieval” means

Hybrid retrieval combines results from two or more retrieval methods. A common design runs BM25 and dense retrieval in parallel:

- BM25 contributes exact terms, numbers, identifiers, and rare names;
- dense retrieval contributes paraphrases and semantic similarity;
- metadata filters enforce hard constraints such as year or document type.

Hybrid retrieval is not a new truth detector. It creates a larger or better candidate pool from complementary signals.

## 3. Why scores cannot simply be added

A BM25 score and a cosine-similarity score live on different scales. Their distributions can also change by query. Adding raw scores may let one retriever dominate for accidental numerical reasons.

There are three common approaches:

1. normalize scores before combining them;
2. learn a fusion model from relevance labels;
3. combine ranks instead of raw scores.

The third approach leads to Reciprocal Rank Fusion.

## 4. Reciprocal Rank Fusion (RRF)

RRF assigns each document a score based on its position in every ranked list:

$$
\operatorname{RRF}(d)=\sum_{r\in R}\frac{1}{k+\operatorname{rank}_r(d)}
$$

(R) is the set of retrievers, and (k) is a constant that reduces the effect of extreme top ranks. A result appearing near the top of several lists receives a strong combined score.

RRF is attractive because it does not require comparable raw scores. But it ignores how far apart raw relevance scores were and needs enough depth from each retriever to include useful evidence.

## 5. Deduplication and provenance come before reranking

After fusion, the same source may appear several times as overlapping chunks. If duplicates occupy the entire Top-k, the generator sees less independent evidence.

A fusion layer should therefore preserve source IDs, merge exact duplicates, control near-duplicates, retain the best provenance, and avoid removing distinct rows that happen to share text.

## 6. What a reranker changes

![A fast retriever and a cross-encoder have different jobs](/images/blog/retrieve-rerank-funnel-en.svg)

A common neural reranker is a **cross-encoder**. Unlike a bi-encoder, it reads the query and candidate together:

```text
[query ; candidate] → Transformer → relevance score
```

Joint attention lets it examine exact relationships between the two texts: which year modifies which metric, whether a statement is negated, and whether the candidate actually answers the query.

Cross-encoders are more expensive because every query–candidate pair requires a model pass. This is why they rerank tens or hundreds of candidates rather than searching the complete corpus.

## 7. Candidate recall is the reranker's ceiling

The most important limitation is simple:

> A reranker can move a retrieved item upward, but it cannot recover evidence that never entered the candidate set.

If the correct table is absent from Top-100, perfect reranking still fails. Measure first-stage Recall@k before blaming the reranker.

## 8. Reranking is not evidence verification

A relevance score answers something like “How well does this candidate match the query?” It does not automatically prove that the number is correct, that every required evidence item is present, or that a citation supports the final claim.

Use metadata constraints and later verification for conditions that must be exact. For the annual-report example, a wrong-year table may remain semantically relevant; year consistency should be checked explicitly.

## 9. A practical design

```text
query
 ├─ BM25 Top-50
 ├─ dense Top-50
 └─ metadata constraints
          ↓
      RRF + deduplication
          ↓
     60 unique candidates
          ↓
    cross-encoder reranker
          ↓
  evidence-aware Top-5 context
```

Tune candidate depth, fusion, reranker cutoff, and context size separately. Increasing every number usually increases latency and noise without guaranteeing better evidence.

## 10. How to evaluate the pipeline

Evaluate each boundary rather than only the final answer:

| Stage                 | Main question                                        |
| --------------------- | ---------------------------------------------------- |
| Individual retrievers | What unique relevant evidence does each method find? |
| Fused candidate set   | Did recall improve after deduplication?              |
| Reranker              | Did correct evidence move upward?                    |
| Final context         | Is the evidence correct, diverse, and sufficient?    |
| Answer                | Did the generator use that evidence faithfully?      |

An ablation comparing BM25, dense, hybrid, and hybrid-plus-reranker reveals whether added complexity earns its cost.

## Further reading

- [Cormack, Clarke & Büttcher (2009): Reciprocal Rank Fusion](https://research.google/pubs/reciprocal-rank-fusion-outperforms-condorcet-and-individual-rank-learning-methods/)
- [Sentence Transformers: Retrieve & Re-Rank](https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html)
- [Sentence Transformers: Cross-Encoders](https://www.sbert.net/examples/cross_encoder/applications/README.html)

<div class="my-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-between">
  <a href="/keyword-vs-vector-retrieval">← 3. Keyword vs vector retrieval</a>
  <a href="/evaluating-retrieval-systems">5. Evaluating retrieval systems →</a>
</div>
