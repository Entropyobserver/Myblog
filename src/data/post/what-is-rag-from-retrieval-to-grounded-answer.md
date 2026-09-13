---
title: 'What Is RAG? From Retrieval to Grounded Answers'
publishDate: 2026-09-12
updateDate: 2026-09-12
excerpt: 'From documents, chunks, and embeddings to retrieval, reranking, evidence completeness, augmentation, and generation: a complete visual foundation for RAG.'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'Information Retrieval', 'Embeddings', 'LLM', 'Grounding', 'Foundations']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'what-is-rag-from-retrieval-to-grounded-answer'
translationHref: '/zh/what-is-rag-from-retrieval-to-grounded-answer'
translationLabel: '中文'
series: 'RAG Foundations'
seriesOrder: 1
seriesTotal: 6
seriesHref: '/series/rag-foundations'
---

## 1. What is RAG?

<div class="my-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900 dark:bg-cyan-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Definition</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Retrieval-Augmented Generation (RAG) is a system approach that combines external information retrieval with language generation: it retrieves relevant content, adds that content to the model's input context, and then asks the model to generate an answer from it.
  </p>
</div>

The name describes its three essential stages:

| Stage            | What it does                                                                        |
| ---------------- | ----------------------------------------------------------------------------------- |
| **Retrieval**    | Finds potentially relevant information in an external knowledge source              |
| **Augmentation** | Adds retrieved content and source information to the language model's input context |
| **Generation**   | Produces an answer from the question and the augmented context                      |

With implementation details removed, the minimal RAG pipeline is:

```text
User question
   ↓
Retrieval: find relevant content in an external source
   ↓
Augmentation: add the retrieved content to the model context
   ↓
Generation: answer from the question and context
```

These three stages define the conceptual core of RAG. BM25, embeddings, vector databases, hybrid retrieval, rerankers, knowledge graphs, query rewriting, and retry loops are possible implementations or extensions; **they are not the definition of RAG itself**.

Put differently, an ordinary language model mainly relies on knowledge encoded in its parameters during training. RAG lets the model consult external knowledge for the current question. That knowledge may come from PDFs, web pages, databases, private documents, search engines, or knowledge graphs—not necessarily a vector database.

### Understanding RAG through one question

Suppose you ask a language model:

> In 2017, what share of a company's equity liquid production outside Norway came from three blocks in Angola?

This is a highly specific question. The answer may be hidden in one row of a table inside a report more than 200 pages long. Even if a model knows the company, it may not remember the number—and it cannot reliably point to the correct report and page from model memory alone.

RAG takes a different approach: **find the evidence, give it to the model, and then write the answer**.

![The three basic steps of RAG](/images/blog/rag-three-steps-en.svg)

### Why is RAG useful?

Large language models learn substantial knowledge and language patterns during training, but that knowledge has limits:

- it does not automatically update after training;
- it does not naturally include an organisation's private documents;
- facts stored in parameters are difficult to trace to a source;
- a model may still produce plausible text when uncertain;
- retraining a whole model whenever documents change is expensive.

RAG separates **where knowledge is stored** from **how an answer is expressed**. External sources hold updateable, traceable content; the language model interprets that content and composes the answer. The retrieval and context-building processes that connect them are introduced in the next section.

When the documents change, we can normally update the knowledge base and index without retraining the language model.

![The difference between using RAG and relying on a language model alone](/images/blog/rag-with-and-without-en.svg)

RAG does **not** guarantee correctness. It creates a way for the answer to be grounded in external evidence. Reliability still depends on document processing, retrieval, prompting, generation, and verification.

## 2. RAG is a system, not a single model

“RAG model” is convenient shorthand, but RAG is not normally one downloadable model. It is a system architecture in which knowledge sources, indexes, retrievers, context builders, and generative models cooperate to produce an answer supported by external information.

Retrieval → Augmentation → Generation is the minimal conceptual pipeline introduced in Section 1. Practical systems add document processing, indexing, reranking, and verification to make those three stages work reliably.

Instead of memorising a glossary, follow the opening annual-report question through the system from left to right:

![A RAG system from annual-report documents to a cited answer: offline knowledge preparation and online answering](/images/blog/rag-system-walkthrough-en.svg)

### How should you read this diagram?

1. **①–⑤: prepare the knowledge.** The corpus is everything the system is allowed to search, and each annual report is a document. A parser extracts source-traceable evidence objects such as passages and tables. These are organised into chunks suitable for retrieval, each carrying metadata such as year, page, and content type, and then stored in an index. This work is normally done before a user asks a question.
2. **⑥: the user submits a query.** The query is not merely a sentence; it represents an information need constrained by 2017, Angola, three blocks, and the equity liquid-production share.
3. **⑦: the retriever returns candidates.** Similar tables from 2016, 2017, and 2018 may all appear. At this point they are only potentially relevant candidates, not confirmed evidence.
4. **⑧: the context builder selects and organises evidence.** It may filter, rerank, and deduplicate the candidates, remove the wrong years, retain the correct 2017 table, and preserve source metadata such as page 33. The selected material sent to the language model is the context. Adding this external evidence to the model input is **augmentation**.
5. **⑨: the generator produces an answer.** The language model reads the query and context together, answers “36%,” and cites the page. It did not search the entire report itself; it used only the material the system selected for it.
6. **⑩: an optional verifier checks the result.** It can confirm that the year, number, and citation agree. If the evidence is insufficient, the system may retrieve again or abstain.

The five objects most easily confused form a progressively narrower chain:

**Document → Chunk → Candidate → Context → Answer**

| Step | Object    | Meaning                  |
| ---- | --------- | ------------------------ |
| 1    | Document  | Original source          |
| 2    | Chunk     | Retrieval unit           |
| 3    | Candidate | Possibly relevant result |
| 4    | Context   | Selected evidence        |
| 5    | Answer    | Final output             |

Therefore, **a candidate is not necessarily correct evidence, and context is not necessarily sufficient.** If parsing loses a table, it never becomes a chunk or enters the index; the retriever cannot find it, and the generator never sees it. This is why RAG reliability belongs to the whole system, not only to the final language model.

## 3. Retrieval: selecting candidate evidence

The retriever receives a question and searches a large collection for the evidence most likely to be useful.

A knowledge base might contain:

```text
15 annual reports
4,369 PDF pages
tens of thousands of paragraphs, headings, and table objects
```

Passing everything to the LLM would be inefficient and often impossible. Instead, the retriever returns the highest-ranked (k) items, commonly called **Top-k** results.

Common retrieval strategies include:

- **lexical retrieval**, such as BM25, which uses term matches and corpus statistics;
- **dense retrieval**, which represents questions and documents as vectors and searches by semantic similarity;
- **hybrid retrieval**, which combines lexical and dense results;
- **metadata filtering**, which restricts the search by year, document, language, or object type;
- **graph retrieval**, which follows relations between entities, metrics, pages, or evidence objects.

The retriever does not write the final answer. It decides what the generator will be allowed to see.

For the annual-report question, useful candidates should match **2017**, **Angola**, the **three blocks**, and the requested **production metric**. Matching only some of these constraints may produce a result that looks relevant but cannot answer the question.

Lexical search commonly uses an inverted index. Dense retrieval maps a query and chunk to vectors and compares them with cosine similarity or dot product:

$$
\operatorname{cos}(q,d)=\frac{\mathbf{e}(q)\cdot\mathbf{e}(d)}{\lVert\mathbf{e}(q)\rVert_2\,\lVert\mathbf{e}(d)\rVert_2}
$$

Vector proximity represents learned similarity, not factual correctness, correct year, or evidence sufficiency.

For example, a 2016 table about Angola and liquid production may be extremely close to the query in embedding space. It is still the wrong evidence for a question about 2017. This distinction will recur throughout the series:

> **Semantic relevance does not imply evidence correctness.**

Retrieval and reranking are often separated because the first stage must search a large collection quickly, while a stronger second-stage model can inspect a much smaller candidate set more carefully:

```text
41,736 chunks → fast retriever → Top-50 → reranker → final Top-5
```

Retrieval is candidate generation; reranking is candidate refinement. A reranker cannot recover evidence that the first stage never recalled.

In the running example, the candidate set may contain similar production tables from 2016, 2017, and 2018. The reranker's job is to move the table that matches the requested year and metric above the merely similar alternatives.

## 4. Augmentation: placing evidence in context

After retrieval, the system combines the question, retrieved evidence, and answer instructions into an augmented prompt. A simplified prompt might look like this:

```text
Answer only from the evidence below.
If the evidence is insufficient, say so explicitly.
Include source references in the answer.

Question: ...

Evidence 1: [report, page, passage]
Evidence 2: [report, page, table]
```

Augmentation is more than pasting text together. The system must decide:

- how many evidence items to include;
- whether to preserve report names, years, pages, and headings;
- how to stay within the model's context limit;
- how to handle conflicting evidence;
- whether to require citations or abstention.

This stage connects information retrieval to language generation.

For the opening question, a useful context should preserve not only the table value but also the report year, page number, row or block names, metric definition, and units. Without this metadata, the generator may see a number without knowing whether it is the number the question asks for.

## 5. Generation: composing an evidence-grounded answer

The generator—usually an LLM—reads the question and retrieved context and produces an answer.

Ideally, it should:

1. answer the question that was actually asked;
2. state only conclusions supported by the retrieved evidence;
3. preserve citations that a reader can inspect.

For example:

> The three blocks contributed 36% of equity liquid production outside Norway in 2017 (2017 annual report, p. 33).

This closes the loop opened by the first question: the generator turns the selected evidence into a direct answer while keeping the evidence trail visible.

But the generator cannot repair every upstream error. If retrieval returns a similar table from 2016, the model may produce a grammatically perfect answer for the wrong year.

![How evidence quality changes the RAG outcome](/images/blog/rag-evidence-quality-en.svg)

The most important principle is therefore:

> **Generation is constrained by retrieved evidence. If the system cannot retrieve the right evidence, it usually cannot answer reliably.**

## 6. Offline preparation and online answering

Introductory diagrams often show only “question → retrieval → answer.” A complete RAG system also needs a document-preparation phase before the first question arrives.

![Offline preparation and online answering in RAG](/images/blog/rag-two-phases-en.svg)

### Offline preparation

This stage runs when documents are added or updated:

1. ingest PDFs, web pages, or database records;
2. extract text, tables, images, and layout;
3. split the content into retrievable units;
4. preserve metadata such as document, page, and heading;
5. compute term statistics or embeddings;
6. build a search index.

### Online answering

This stage runs for each user question:

1. interpret or rewrite the query;
2. retrieve candidate evidence;
3. filter, fuse, or rerank the results;
4. construct the augmented prompt;
5. generate the answer;
6. return citations, verify, or abstain.

The offline stage determines **what can be searched**. The online stage determines **what was found for this question**.

## 7. How should a RAG system be evaluated?

Evaluating only the final answer hides where an error began. A practical diagnosis separates three layers:

![Three levels of RAG evaluation](/images/blog/rag-three-level-evaluation-en.svg)

| Layer     | Core question                                                                |
| --------- | ---------------------------------------------------------------------------- |
| Retrieval | Did the correct material enter Top-k, and were useful results ranked highly? |
| Evidence  | Is the selected evidence correct, sufficient, complete, and traceable?       |
| Answer    | Is the final response correct, grounded in the evidence, and properly cited? |

For the running annual-report example, these become three concrete checks: did retrieval find the 2017 table, did the context contain every fact needed for the calculation, and did the generator produce 36% with a valid citation to page 33?

A correct answer can still hide wrong evidence, while correct retrieval can be followed by a calculation error. The dedicated article [How to Evaluate a Retrieval System](/evaluating-retrieval-systems) explains Precision, Recall, MRR, nDCG, evidence completeness, groundedness, and citation evaluation.

## 8. RAG, search, and fine-tuning

These ideas are related but not interchangeable.

| Method      | Main purpose                                    | Produces a natural-language answer? | How knowledge is updated            |
| ----------- | ----------------------------------------------- | ----------------------------------- | ----------------------------------- |
| Search      | Finds relevant documents or results             | Usually no                          | Rebuild or update the index         |
| RAG         | Retrieves evidence and generates from it        | Yes                                 | Update the knowledge base and index |
| Fine-tuning | Changes model behaviour, style, or task ability | Depends on the task                 | Train model parameters again        |

Fine-tuning may be appropriate when the goal is a particular output format, language style, or task behaviour. RAG is often more natural when the goal is to access private, changing, and citable knowledge.

They can also be combined: a domain-adapted model can still use RAG at inference time.

## 9. Five common misconceptions

### Misconception 1: RAG is a vector database

Vector search is only one possible component. A RAG system can use BM25, SQL, a knowledge graph, web search, or several retrievers together.

### Misconception 2: retrieving relevant text is enough

Relevance is not the same as answerability. A multi-part question may require two tables and one explanatory paragraph. Finding one item is only a partial success.

### Misconception 3: RAG eliminates hallucination

The model may still misread evidence, ignore constraints, combine incompatible years, or add unsupported claims when context is insufficient.

### Misconception 4: larger chunks are always better

Large chunks preserve context but add noise and consume the context window. Small chunks are precise but may break tables, headings, and cross-paragraph relations. Chunking is an experimental design choice.

### Misconception 5: a correct answer proves the system is reliable

An answer may be correct by chance or model memory. Reliable evaluation must also inspect the report, page, evidence object, citation, and completeness of multi-hop evidence.

## 10. Where can RAG fail?

Failures can occur during ingestion, chunking, retrieval, ranking, evidence assembly, augmentation, generation, or verification. Examples include missing pages, broken tables, wrong-year distractors, partial multi-hop evidence, conflicting context, unsupported claims, and incorrect citations.

This is why replacing the generator with a larger LLM cannot solve every RAG problem: many failures happen before the model receives its context.

## 11. A minimal RAG system

Ignoring frameworks, a minimal RAG pipeline is simply:

```text
document collection
  → chunk and index
  → user question
  → retrieve Top-k
  → question + retrieved context
  → language model
  → answer
```

Research begins when we ask harder questions:

- How should documents be segmented?
- How should tables, pages, and headings be preserved?
- Where do BM25 and dense retrieval fail differently?
- How can we tell whether Top-k contains all required evidence?
- After the first retrieval fails, should the system retry or abstain?

These questions turn a simple RAG demo into an evaluable research system.

## 12. The path to FinRAG

Retrieval already fails on ordinary web pages and short passages. In 15 years of corporate annual reports, the challenge becomes sharper: the same entities and metrics recur across years, answers may be embedded in tables, and some questions require evidence from multiple pages.

My [FinRAG project](/building-finrag-evidence-grounded-retrieval-for-annual-reports) starts here. It asks not only whether the system retrieves related text, but whether it finds the **correct report, correct page, and complete evidence required to answer**.

The next article asks: **How does a PDF become a collection of retrievable, citable, and auditable evidence objects?**

## Further reading

- [Microsoft Learn: Introduction to retrieval-augmented generation concepts](https://learn.microsoft.com/en-us/training/modules/rag-fundamentals/)
- [Lewis et al. (2020): Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [Microsoft Learn: RAG and indexes](https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/retrieval-augmented-generation)

<div class="my-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-end">
  <a href="/how-documents-enter-rag-pdf-chunk-metadata-index">2. How documents enter RAG →</a>
</div>
