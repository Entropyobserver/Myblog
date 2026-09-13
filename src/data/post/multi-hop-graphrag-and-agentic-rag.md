---
title: 'Multi-hop, GraphRAG, and Agentic RAG: When One Search Is Not Enough'
publishDate: 2026-09-12T13:00:00+02:00
excerpt: 'A visual guide to multi-hop evidence, graph-based retrieval, query planning, iterative search, verification, retry, and the boundaries of Agentic RAG.'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'Multi-hop', 'GraphRAG', 'Agentic RAG', 'Query Planning']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'multi-hop-graphrag-and-agentic-rag'
translationHref: '/zh/multi-hop-graphrag-and-agentic-rag'
translationLabel: '中文'
series: 'RAG Foundations'
seriesOrder: 6
seriesTotal: 6
seriesHref: '/series/rag-foundations'
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Multi-hop describes a question that needs connected evidence. GraphRAG organizes or retrieves through relationships. Agentic RAG lets a controller plan, search, inspect, and retry. These ideas overlap, but they are not synonyms.
  </p>
</div>

The [previous article](/evaluating-retrieval-systems) separated partial evidence from complete evidence. This final article asks what the system should do when one retrieval call cannot collect the complete set.

![A multi-hop question connects evidence across several retrieval steps](/images/blog/multi-hop-evidence-chain-en.svg)

## 1. What makes a question multi-hop?

A **hop** is an evidence-dependent reasoning step. A multi-hop question needs two or more connected facts, often from different passages, pages, tables, or documents.

Example:

1. find which three Angolan blocks are named in the report;
2. find their combined equity liquid production;
3. find total equity liquid production outside Norway;
4. compute or verify the share.

The crucial property is dependency. A later search may require an entity or value discovered in an earlier step.

## 2. Why one-shot Top-k can fail

A single query embedding compresses the complete question into one vector. The final evidence may not repeat the original wording, and each individual chunk may answer only one sub-question.

One-shot retrieval can therefore return many passages about the general topic while missing a bridge entity or denominator. Increasing (k) adds candidates but also noise; it does not guarantee that all required hops appear.

## 3. Query decomposition and iterative retrieval

A planner can split a complex question into sub-queries:

```text
original question
  ├─ Which blocks are involved?
  ├─ What is their production total?
  └─ What is the comparison denominator?
```

The system retrieves for each sub-query, stores evidence and unresolved variables, then constructs the next query from what it has learned.

This can improve coverage, but decomposition can also invent assumptions. Every sub-query should remain traceable to the original question, and intermediate claims should cite evidence.

## 4. What GraphRAG means

**GraphRAG** is a family of RAG designs that uses graph structure during indexing, retrieval, organization, or generation. Nodes may represent entities, claims, sections, pages, tables, or chunks; edges may represent relations, references, co-occurrence, hierarchy, or temporal links.

![Vector retrieval, graph traversal, and agentic control solve different problems](/images/blog/rag-strategy-comparison-en.svg)

A graph helps when relationships are central:

- follow an entity from one document to another;
- connect a table to its heading, footnote, and source page;
- traverse company → asset → country → metric;
- aggregate information across a community of related entities.

GraphRAG does not mean “put embeddings in a graph database.” The important question is which nodes and edges encode useful retrieval structure.

## 5. Local and global graph questions

Graph-based systems may support different query scopes:

- **Local search** starts from specific entities and explores nearby facts or text units.
- **Global search** summarizes patterns across large parts of the corpus, often using graph communities and precomputed summaries.

Microsoft Research's GraphRAG work emphasizes corpus-level questions such as major themes—questions that ordinary nearest-neighbour retrieval may not represent well. That is one GraphRAG architecture, not the only possible meaning of graph-based RAG.

## 6. What Agentic RAG adds

**Agentic RAG** adds a controller that can choose and repeat actions based on intermediate state. A bounded loop might:

1. classify the query;
2. plan sub-queries;
3. choose lexical, vector, graph, SQL, or web tools;
4. inspect retrieved evidence;
5. identify missing information or conflicts;
6. rewrite the query and retry;
7. answer, abstain, or request clarification.

![A bounded Agentic RAG loop with explicit stop conditions](/images/blog/agentic-rag-bounded-loop-en.svg)

The word “agentic” should describe observable control flow, not simply the presence of an LLM. A fixed retrieve-once-then-generate pipeline is not made agentic by renaming the prompt.

## 7. GraphRAG and Agentic RAG can be combined

They address different dimensions:

| Concept     | Main focus                                               | Typical mechanism                        |
| ----------- | -------------------------------------------------------- | ---------------------------------------- |
| Multi-hop   | What the question requires                               | Several dependent evidence items         |
| GraphRAG    | How knowledge and relations are represented or traversed | Nodes, edges, communities, paths         |
| Agentic RAG | How retrieval actions are controlled over time           | Planning, tool choice, reflection, retry |

An agent can use a graph retriever for one hop, BM25 for an identifier, and a vector retriever for a paraphrase. A GraphRAG system can also run without an agentic loop.

## 8. Retry needs a reason and a stop rule

Blind retry often returns the same evidence. A useful retry changes something based on a diagnosed gap:

- missing entity → search for an alias;
- wrong year → add a metadata filter;
- missing denominator → issue a focused sub-query;
- conflicting values → retrieve definitions and units;
- low extraction confidence → return to the source page.

Set limits on hops, tool calls, time, tokens, and repeated evidence. Stop when evidence is sufficient, no new evidence appears, the budget is exhausted, or uncertainty requires abstention.

## 9. New capabilities create new failure modes

Adaptive retrieval can improve difficult questions, but it also adds planning errors, error propagation, cycles, tool failures, higher latency, and harder reproducibility. Graph construction can introduce entity-resolution and relation-extraction errors; community summaries can omit minority evidence.

More elaborate is not automatically more reliable. Compare against a strong simple baseline and measure gains by question type.

## 10. How to evaluate multi-step systems

In addition to final answer quality, record:

- complete-evidence success and hop coverage;
- correctness of each intermediate claim;
- query-plan validity;
- retrieval gain per additional step;
- repeated or wasted calls;
- latency, token use, and monetary cost;
- stop/abstain correctness;
- traceability from final claims to source evidence.

An answer may be correct while its reasoning trace contains unsupported claims. Evaluate the evidence path, not only the final sentence.

## 11. A practical escalation strategy

Use the simplest path that can answer the query:

```text
simple factual query → hybrid retrieve + rerank
missing connected evidence → decompose + iterative retrieval
relationship-heavy query → graph traversal
uncertain or conflicting evidence → bounded agentic verification
insufficient evidence → abstain
```

This keeps common queries fast while reserving expensive control loops for cases that need them.

## Further reading

- [HotpotQA: Diverse, Explainable Multi-hop Question Answering](https://aclanthology.org/D18-1259/)
- [Microsoft Research: From Local to Global—A Graph RAG Approach](https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/)
- [Microsoft GraphRAG repository](https://github.com/microsoft/graphrag)
- [Agentic Retrieval-Augmented Generation: A Survey](https://arxiv.org/abs/2501.09136)

<div class="my-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-between">
  <a href="/evaluating-retrieval-systems">← 5. Evaluating retrieval systems</a>
  <a href="/series/rag-foundations">View the complete RAG Foundations series →</a>
</div>
