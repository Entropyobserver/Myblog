---
title: 'Building FinRAG: Evidence-Grounded Retrieval for Long Annual Reports'
publishDate: 2026-09-12
excerpt: 'A research story about turning 15 years of annual-report PDFs into an auditable benchmark for retrieval, GraphRAG, failure recovery, and grounded question answering.'
category: 'Retrieval & Knowledge Systems'
track: 'Research & Applications'
tags: ['RAG', 'Information Retrieval', 'GraphRAG', 'Financial QA', 'Research Story']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'building-finrag-evidence-grounded-retrieval-for-annual-reports'
translationHref: '/zh/building-finrag-evidence-grounded-retrieval-for-annual-reports'
translationLabel: '中文'
---

<div class="my-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900 dark:bg-cyan-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Research story</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    FinRAG asks a deceptively simple question: can a system locate the right report, page, and evidence object before asking a language model to answer?
  </p>
</div>

Retrieval-augmented generation is often presented as a short pipeline: split documents, embed the chunks, retrieve the nearest ones, and send them to a language model. That description hides most of the difficulty in real enterprise documents.

Annual reports are long, structured, and repetitive. The same metric may appear every year. A relevant phrase can occur in the wrong report. A table may contain the number while a paragraph on another page explains what it means. A retrieval result can therefore look topically correct while still being the wrong evidence.

I built FinRAG to study this problem as an evidence-localisation task rather than only a text-similarity task.

## 1. The research question

The central question is:

> How can a RAG system retrieve complete, traceable evidence from longitudinal annual reports, and how should it detect and recover when the first retrieval attempt fails?

This question has several levels. The system must identify the correct report and year, locate the right page, retrieve the right paragraph or table, and sometimes combine multiple evidence objects. Only then does answer generation become meaningful.

## 2. From PDFs to an auditable benchmark

The project starts with 15 consecutive Equinor/Statoil annual reports from 2010 to 2024.

| Stage | Scale |
| --- | ---: |
| Annual reports | 15 |
| PDF pages | 4,369 |
| Retrieval units | 41,736 |
| QA items | 720 |
| Answerable items | 660 |
| Unanswerable items | 60 |

Instead of treating each PDF as plain text, the extraction pipeline creates stable evidence objects linked to a document, page, object type, and object identifier. Paragraphs, headings, and table candidates remain traceable to their source.

That traceability changes the evaluation question. I can test not only whether a retrieved passage contains similar words, but whether the system found the exact evidence required to answer the question.

The benchmark also includes item-level human screening, a 100-page extraction audit, and a separate 100-item QA reliability audit. The goal is not to claim that automatically generated data is correct by default, but to make quality decisions visible and inspectable.

## 3. The system is a set of controlled research layers

FinRAG is organised as five connected research projects:

| Layer | What it studies |
| --- | --- |
| FinRAG Benchmark | PDF processing, benchmark construction, retrieval baselines, reliability audits, and end-to-end QA |
| FinRAG GraphRAG | Typed graph construction, graph expansion, path retrieval, and edge ablations |
| Agentic RAG | Report routing, planning, evidence verification, and adaptive recovery |
| Embedding Research | Controlled analysis of embedding confusion and retrieval alignment |
| Multimodal RAG | Visual-page preparation and QA over charts, figures, and visually structured evidence |

This separation matters. Each layer owns its scripts and results, while later experiments consume stable artifacts from earlier ones. It makes it possible to ask which component caused an improvement instead of changing the whole system at once.

## 4. What the benchmark reveals

The first major finding is that reference-year information is extremely valuable. Oracle year filtering substantially improves retrieval because it prevents a semantically similar passage from another annual report from outranking the correct evidence.

But year filtering does not solve evidence completeness. On multi-hop questions, the system retrieves at least one required object for 91.1% of questions, yet retrieves all required evidence for only 53.3%.

This gap is central to the project:

```text
partial evidence is not complete evidence
topical relevance is not answerability
one correct chunk is not a correct multi-hop context
```

The gap also appears in end-to-end QA. Hybrid retrieval with reranking raises answer accuracy from 58.5% to 71.1%, while gold oracle evidence reaches 82.1%. The remaining distance between retrieved and oracle evidence shows that retrieval is still a major bottleneck.

## 5. What GraphRAG adds—and what it does not

Graph retrieval can recover evidence missed by semantic similarity, but connectivity is not automatically useful.

I construct a typed metadata evidence graph and evaluate its relations separately. Same-entity links provide the strongest useful relation signal. Same-metric links add a smaller benefit. Adjacent-page links often introduce noise because nearby pages are structurally related without necessarily containing the required evidence.

Under controlled candidate fusion, selected graph candidates improve object Recall@10 from 0.838 to 0.856. Adding typed graph paths produces little additional object-recall gain, but improves page Recall@10 from 0.903 to 0.918.

The per-question result is more informative than the aggregate score: selected graph fusion recovers 18 misses from the hybrid baseline while losing 6 previous hits. GraphRAG therefore provides selective complementary value, not a universal replacement for strong hybrid retrieval.

## 6. Failure-aware recovery

A production-oriented RAG system should not assume that its first retrieval is sufficient. The agentic part of the project studies a second question:

```text
initial retrieval
  -> detect a possible failure
  -> select a recovery action
  -> retrieve again
  -> verify or abstain
```

In an offline diagnostic experiment, BM25-year retrieval failed on 38 of 80 stress-test questions. Non-oracle retrieval settings recovered 18 of those 38 failures. Another 14 could be answered only when gold evidence was supplied, and 6 remained unresolved.

The distinction is important. It would be misleading to report 32 successful system recoveries: 14 of them use oracle evidence and represent an upper bound, not deployable system behaviour. The defensible system result is 18 of 38, or 47.4%.

Later held-out experiments explore threshold, learned, and benefit-aware recovery policies. These results are promising but still exploratory: a better failure classifier does not automatically produce a better recovery policy, and small numeric gains require careful significance testing.

## 7. What I learned from building it

### Retrieval needs structure

Long-document retrieval depends on document identity, year, page structure, object type, and relations between evidence units. An embedding vector captures only part of this information.

### Evaluation must measure evidence completeness

Recall of any gold object can hide a multi-hop failure. I therefore separate object recall, page recall, complete-evidence recall, and multi-hop all-evidence recall.

### More candidates can cause harm

Graph expansion and recovery can add missing evidence, but they can also displace a correct result. Every recovery policy needs both benefit and harm measurements.

### Oracle results are diagnostic, not deployable

Oracle year and oracle evidence experiments help localise the bottleneck. They should never be mixed with real system performance.

### Abstention is a system capability

If sufficient evidence is not available, an explicit insufficient-evidence response can be more reliable than a fluent unsupported answer. The hard part is reducing false abstention when useful context is already present.

## 8. Limitations

This project currently focuses on one company and one document genre. Repeated annual-report structure makes the task scientifically useful, but conclusions may not transfer directly to other companies, languages, or enterprise archives.

The benchmark is much stronger than an unaudited synthetic set, but human screening and audit samples do not eliminate every possible annotation error. Some visual questions also require a genuinely multimodal model rather than text extracted from a chart.

Finally, several agentic results are controlled offline experiments. They demonstrate research directions, not a production-ready autonomous RAG system.

## 9. Next steps

The most useful next steps are:

- evaluate transfer to reports from additional companies;
- strengthen multimodal evidence extraction and visual QA;
- optimise recovery utility directly rather than predicting failure labels alone;
- improve semantic answer verification;
- study calibration and abstention under realistic cost settings;
- connect retrieval errors to downstream answer errors more explicitly.

## Interview answer

FinRAG is my research project on evidence-grounded retrieval over long annual reports. I built a PDF-to-benchmark pipeline covering 15 Equinor/Statoil reports, 4,369 pages, 41,736 retrieval units, and 720 audited QA items. The project compares sparse, dense, hybrid, reranked, hierarchical, graph, agentic, and multimodal retrieval methods. Its main finding is that strong topical retrieval still struggles with complete evidence, especially for multi-hop questions. Graph structure and adaptive recovery can help, but only selectively, so I evaluate both recovered and harmed cases and keep oracle results separate from deployable system performance.
