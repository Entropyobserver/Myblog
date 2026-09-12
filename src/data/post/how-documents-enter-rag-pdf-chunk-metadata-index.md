---
title: 'How Documents Enter RAG: From PDF to Retrievable Evidence'
publishDate: 2026-09-12
excerpt: 'A visual guide to RAG document preparation: PDF parsing, layout and tables, evidence objects, chunking, metadata, embeddings, and indexes.'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'PDF', 'Chunking', 'Metadata', 'Indexing']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'how-documents-enter-rag-pdf-chunk-metadata-index'
translationHref: '/zh/how-documents-enter-rag-pdf-chunk-metadata-index'
translationLabel: '中文'
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    A document does not enter RAG by simply copying text from a PDF. Content, structure, and provenance must become searchable, citable, and auditable evidence units.
  </p>
</div>

The previous article introduced the [basic RAG pipeline](/what-is-rag-from-retrieval-to-grounded-answer): retrieval, augmentation, and generation. But what a retriever can find is determined before the first user question—during document preparation.

If reading order is wrong, a table collapses into noise, or headings lose their relation to paragraphs, embeddings and rerankers can only process damaged input.

![The complete path from PDF to retrievable evidence](/images/blog/document-to-rag-evidence.svg)

## 1. Why is a PDF not naturally “text”?

A PDF primarily preserves visual appearance. A paragraph that looks continuous to a reader may be stored as many characters positioned on a page.

Extraction must therefore handle reading order, repeated headers and footers, tables, figures and captions, scanned pages requiring OCR, and layout changes across documents. A small extraction error can propagate: if a table heading is detached from its values, retrieval may find a number without knowing what it measures.

## 2. From pages to document objects

A robust pipeline represents pages as typed objects rather than one flat string:

```text
Page 33
├── heading_01
├── paragraph_01
├── table_candidate_01
└── footnote_01
```

Each object should preserve content, object type, document and page, reading order or coordinates, relations to headings and captions, and extraction-quality flags.

I call these **evidence objects** because they are not merely retrieval inputs: they are evidence that can be traced back to the original document.

## 3. Evidence objects are not the same as chunks

An evidence object reflects source structure—a paragraph, table, or heading. A chunk is a model-facing unit constructed for indexing or generation.

A short paragraph may become one chunk. A long table may produce several chunks. Several short paragraphs under one heading may be merged. Even after splitting or merging, every chunk should map back to its source objects.

![Trade-offs between small, large, and structure-aware chunks](/images/blog/chunking-tradeoffs.svg)

## 4. The chunking trade-off

Small chunks are precise and economical, but can sever definitions, references, table headers, or multi-hop evidence. Large chunks preserve more context but add noise, blur embeddings, and consume the generator's context window.

Fixed token or character windows are simple, but do not understand document boundaries. Structure-aware chunking follows headings, paragraphs, lists, tables, and pages, repeating a heading or table header when necessary. It is usually better suited to reports and papers, but depends on reliable layout extraction.

Chunk size is not a universal constant. It is a design choice that should be evaluated against the target questions and metrics.

## 5. Does overlap solve boundary problems?

Sliding windows repeat tokens between neighbouring chunks. This reduces the chance of cutting exactly through a useful sentence, but increases the index, returns near-duplicates, lets redundant chunks occupy Top-k positions, and cannot reconstruct genuine table or page structure.

Overlap is a local safeguard, not a replacement for document structure.

## 6. Why metadata matters

Metadata records structured facts about content:

```json
{
  "document_id": "equinor_2017_annual_report",
  "year": 2017,
  "page": 33,
  "object_id": "..._p033_table_candidate01",
  "object_type": "table",
  "section": "International production"
}
```

It serves two roles. As **provenance**, it lets an answer cite the report, year, page, and source object. As a **retrieval signal**, it can filter the corpus before relevance ranking. In longitudinal reports, an explicit year constraint can be more reliable than semantic similarity alone.

![Metadata used for filtering, ranking, and citation](/images/blog/metadata-as-retrieval-signal.svg)

Metadata should be grounded in verifiable document information. Fields inferred by an LLM need recorded provenance and confidence; they should not silently become facts.

## 7. How does content become an index?

Prepared chunks commonly enter several indexes:

- A **lexical index** stores terms and corpus statistics for methods such as BM25. It is valuable for numbers, rare terms, company names, and exact expressions.
- A **vector index** stores embedding vectors and retrieves nearest neighbours. It handles paraphrases and semantic similarity, but may confuse similar passages from different years.
- A **metadata index** stores filterable fields such as year, document, language, and object type.

Practical RAG systems often retain all three signals rather than relying on a vector database alone.

## 8. How should document preparation be evaluated?

A successful pipeline run is not evidence of extraction quality. Audits should sample pages, reading order, object types, tables, chunk boundaries, and provenance links.

| Level         | Audit question                                             |
| ------------- | ---------------------------------------------------------- |
| Page          | Are pages missing, duplicated, or unreadable?              |
| Reading order | Are columns and blocks ordered correctly?                  |
| Object        | Are headings, paragraphs, and tables classified correctly? |
| Table         | Are rows, columns, units, and headers preserved?           |
| Chunk         | Are important structures cut at unsafe boundaries?         |
| Provenance    | Can each result return to the correct document and page?   |

Failures should be recorded rather than silently discarded. Otherwise, a benchmark may contain only easy-to-extract content and introduce selection bias.

## 9. An annual-report example

For a question about a 2017 production metric, a reliable preparation pipeline would register the annual report as a document, parse the target page, preserve the table as a typed object, assign a stable object ID, attach year/page/type metadata, construct a retrieval representation containing its heading and headers, and index both lexical and vector representations.

When retrieval returns the result, the system receives more than a string: it knows what the evidence is, where it came from, and how to cite it.

## 10. The next step and the path to FinRAG

Once documents are prepared, the next question is how to search them. Lexical methods are strong on exact terms and numbers; dense methods handle semantic reformulation. They also fail differently.

The next article compares **BM25 and dense retrieval**, using longitudinal reports to show why the most semantically similar passage is not always the correct evidence.

In the [FinRAG project](/building-finrag-evidence-grounded-retrieval-for-annual-reports), this layer converts 15 reports and 4,369 pages into 41,736 traceable retrieval units, with a separate sampled audit of extraction quality.

## Further reading

- [Docling: Chunking concepts](https://docling-project.github.io/docling/concepts/chunking/)
- [Docling: Architecture](https://docling-project.github.io/docling/concepts/architecture/)
- [Docling Technical Report](https://arxiv.org/abs/2408.09869)
