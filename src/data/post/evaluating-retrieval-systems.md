---
title: 'How to Evaluate a Retrieval System: Precision, Recall, MRR, nDCG, and Evidence Completeness'
publishDate: 2026-09-12T12:00:00+02:00
updateDate: 2026-09-13
excerpt: 'A three-layer framework for RAG evaluation: whether retrieval found the right material, whether the evidence is sufficient and complete, and whether the answer is grounded and correctly cited.'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'Information Retrieval', 'Evaluation', 'Recall', 'nDCG']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'evaluating-retrieval-systems'
translationHref: '/zh/evaluating-retrieval-systems'
translationLabel: '中文'
series: 'RAG Foundations'
seriesOrder: 5
seriesTotal: 6
seriesHref: '/series/rag-foundations'
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Do not evaluate RAG from the final answer alone. First ask whether the system found the right material, then whether the evidence is sufficient, and finally whether the answer is correct and faithful to that evidence.
  </p>
</div>

The [previous article](/hybrid-retrieval-and-reranking) built a pipeline from candidate retrieval to reranking. This article asks the next question: **how can we tell which stage succeeded and where a failure began?**

Looking only at answer correctness merges very different failures. Retrieval may be wrong, complete evidence may be followed by a calculation error, or a model may guess the correct answer without valid evidence.

![Three levels of RAG evaluation](/images/blog/rag-three-level-evaluation-en.svg)

## 1. What do the three evaluation layers measure?

| Layer                 | Core question                                                                 |
| --------------------- | ----------------------------------------------------------------------------- |
| **Retrieval quality** | Did the required material enter Top-k, and were useful results ranked highly? |
| **Evidence quality**  | Is the retrieved material correct, sufficient, complete, and traceable?       |
| **Answer quality**    | Is the final answer correct, grounded in the evidence, and properly cited?    |

The layers are connected but not interchangeable. Retrieval produces candidates. Evidence evaluation determines whether those candidates can support an answer. Answer evaluation inspects what the model finally wrote.

## 2. Define “one result” before choosing a metric

Before choosing a metric, decide what counts as one retrievable item:

- a document;
- a page;
- a paragraph or chunk;
- a table;
- a row, cell, or evidence object.

A system can retrieve the correct document but the wrong page, or the correct page but not the required table. Document-level success may therefore hide evidence-level failure.

The metric must use the same unit as the real task. If the generator receives chunks, retrieval should be evaluated at least at chunk or evidence-object level rather than only by document hit.

### Queries, gold evidence, and Top-k

For each query $q$, define a set of known relevant items $G_q$, often called **gold evidence** or qrels. Let $R_q^k$ be the first $k$ retrieved items.

![The query, gold evidence, ranked results, and evaluation cutoff](/images/blog/retrieval-evaluation-setup-en.svg)

Gold evidence is not automatically perfect. Annotators may miss valid alternatives, disagree on granularity, or label evidence that answers only part of a question. Record annotation guidelines and agreement, and allow multiple valid evidence paths when the task permits them.

## 3. Retrieval quality: was the right material found and ranked?

Four common metrics answer four different questions.

### Precision@k: how clean is the returned set?

Precision@k measures the proportion of Top-k results that are relevant:

$$
\operatorname{Precision@k}(q)=\frac{|G_q\cap R_q^k|}{|R_q^k|}
$$

When the system always returns exactly $k$ items, the denominator can be written as $k$. If 3 of the Top-5 results are relevant, Precision@5 is $3/5=0.6$.

> In plain language: how much of what the system returned is genuinely useful?

Low precision means noise consumes context space and may distract the generator.

### Recall@k: was the required material covered?

Recall@k measures how much of the known relevant evidence appears in the first $k$ results:

$$
\operatorname{Recall@k}(q)=\frac{|G_q\cap R_q^k|}{|G_q|}
$$

If a query has four gold evidence items and Top-10 contains three, Recall@10 is $3/4=0.75$.

> In plain language: how much of everything that should have been found was actually retrieved?

Candidate retrieval often prioritises recall because a reranker cannot recover evidence that never entered the candidate set. Increasing $k$ often raises recall but also increases reranking cost and context noise.

### MRR: how early does the first useful result appear?

Reciprocal Rank uses the position of the first relevant result:

$$
\operatorname{RR}(q)=\frac{1}{\operatorname{rank}_{\text{first relevant}}}
$$

If the first relevant result is ranked fourth, RR is $1/4$. **Mean Reciprocal Rank (MRR)** averages RR across queries.

> In plain language: how many results must a user inspect before encountering the first useful one?

MRR is intuitive for tasks where one good result is enough. It ignores the second and later relevant results, so it cannot evaluate multi-evidence questions by itself.

### nDCG@k: are the most useful results near the top?

Some results are more useful than others. A complete table may be more valuable than a paragraph that merely mentions the topic. **Discounted Cumulative Gain (DCG)** rewards high relevance near the top:

$$
\operatorname{DCG@k}=\sum_{i=1}^{k}\frac{2^{rel_i}-1}{\log_2(i+1)}
$$

**nDCG@k** divides DCG by the ideal ranking score for that query:

$$
\operatorname{nDCG@k}=\frac{\operatorname{DCG@k}}{\operatorname{IDCG@k}}
$$

> In plain language: is the strongest evidence placed where the system is most likely to use it?

nDCG is most expressive with graded relevance judgments. It remains meaningful with binary relevant/not-relevant labels because it still rewards good ordering, but it cannot distinguish partially useful evidence from highly useful evidence.

![Precision, recall, MRR, and nDCG emphasize different properties](/images/blog/retrieval-metrics-compare-en.svg)

| Metric      | Mainly measures                          | Easily misses                                 |
| ----------- | ---------------------------------------- | --------------------------------------------- |
| Precision@k | How much of the returned set is relevant | Whether every required item was found         |
| Recall@k    | How much gold evidence was retrieved     | Whether useful results appear near the top    |
| MRR         | Rank of the first relevant result        | Whether later required evidence was retrieved |
| nDCG@k      | Whether highly useful results rank early | Whether the combined evidence can answer      |

## 4. Evidence quality: is the retrieved material usable?

Retrieval metrics evaluate a ranked list, but topical relevance does not imply answerability. Evidence quality asks four additional questions:

- **Correctness:** Is this the right report, year, entity, metric, unit, and page?
- **Sufficiency:** Can the available evidence support the answer?
- **Completeness:** Were all required evidence components found?
- **Provenance:** Can every item be traced to a verifiable document, page, and object?

A 2016 production table may be semantically similar to the required 2017 table. It is topically relevant but incorrect for the question. Therefore:

> Semantic relevance is not evidence correctness.

Likewise, a paragraph may correctly describe three Angolan blocks without containing the values required to calculate their production share. It is related but insufficient.

## 5. Finding some evidence is not finding complete evidence

Suppose a question needs evidence items A, B, and C. The system retrieves A and B but misses C.

- Object-level Recall is $2/3$.
- Any-evidence hit is 1 because at least one item was found.
- Complete-evidence hit is 0 because the full evidence set is absent.
- The question may still be unanswerable.

![Partial evidence and complete evidence are different outcomes](/images/blog/evidence-completeness-en.svg)

For query $q$, two useful diagnostic indicators are:

$$
\operatorname{AnyEvidence@k}(q)=\mathbb{1}[G_q\cap R_q^k\neq\varnothing]
$$

$$
\operatorname{CompleteEvidence@k}(q)=\mathbb{1}[G_q\subseteq R_q^k]
$$

Any-evidence asks whether retrieval reached at least one correct item. Complete-evidence requires every necessary item to enter Top-k. A model may occasionally answer correctly with incomplete evidence, but that is answer correctness—not a fully grounded success.

These are practical diagnostics for multi-evidence tasks, not universal benchmark metrics. When several alternative evidence sets can answer a query, success means retrieving at least one complete valid set.

## 6. Answer quality: is the final response reliable?

Only then do we evaluate the generator:

- **Correctness:** Are the number, unit, year, entity, and calculation correct?
- **Faithfulness / groundedness:** Can each conclusion be derived from the supplied context?
- **Citation correctness:** Does each citation actually support the adjacent claim?
- **Citation completeness:** Does every important evidence-dependent claim receive a citation?

Evidence quality and citation correctness are not identical. The first asks whether a source is fit to support an answer; the second asks whether the model's chosen citation supports the specific claim it wrote. Good evidence can still be cited incorrectly.

## 7. Two similar-looking failures with different causes

### Correct answer, wrong evidence

A model recalls or guesses the correct answer but cites the wrong page. Answer correctness may be 1 while retrieval, groundedness, and citation correctness all fail.

### Correct evidence, wrong calculation

The retriever finds the right table and the context contains every required value, but the model makes an arithmetic, unit-conversion, or percentage error. Retrieval is not the problem; computation or generation must be fixed.

Final-answer accuracy alone cannot distinguish these cases. Layered evaluation turns “RAG failed” into a diagnosis that can guide the next experiment.

## 8. One annual-report question across all three layers

Consider the question:

> In 2017, what share of a company's equity liquid production outside Norway came from three blocks in Angola?

| Layer     | Diagnostic question                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------- |
| Retrieval | Did the 2017 report and correct table enter Top-k rather than a similar table from another year?     |
| Evidence  | Were all required values found, with the correct metric, unit, year, page, and object identity?      |
| Answer    | Did the system produce 36%, faithfully use the evidence, and cite the supporting content on page 33? |

Record these outcomes separately. The answer may be right while its evidence path is wrong, or the evidence may be complete while the calculation fails.

## 9. A minimal evaluation report

For every system variant, report:

- corpus and query counts;
- retrieval unit and Top-k cutoffs;
- Precision@k and Recall@k;
- MRR or nDCG when appropriate;
- any-evidence and complete-evidence success;
- evidence correctness, sufficiency, and provenance;
- answer correctness, groundedness, and citation correctness;
- latency, uncertainty, and major failure categories.

Do not rely only on the mean across queries. Inspect zero-recall cases and break results down by year, question type, table/text evidence, and hop count. The same average gain may come from broad small improvements or a few extreme wins; those imply different conclusions.

## 10. One-sentence summary

> Retrieval quality asks whether the system found and ranked the right material; evidence quality asks whether that material is correct, sufficient, and complete; answer quality asks whether the final response is correct and faithful to its evidence.

The best metric is not the most sophisticated one. It is the metric that matches the real task and reveals what the system should improve next.

## Further reading

- [TREC overview using MRR and nDCG](https://trec.nist.gov/pubs/trec27/papers/Overview-CAR.pdf)
- [HotpotQA: supporting facts for multi-hop evaluation](https://aclanthology.org/D18-1259/)
- [Introduction to Modern Information Retrieval: Retrieval Evaluation](https://sigir.hosting.acm.org/files/museum/introduction_to_modern_information_retrieval/chapter_5.pdf)

<div class="my-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-between">
  <a href="/hybrid-retrieval-and-reranking">← 4. Hybrid retrieval and reranking</a>
  <a href="/multi-hop-graphrag-and-agentic-rag">6. Multi-hop, GraphRAG, and Agentic RAG →</a>
</div>
