---
title: 'Keyword Search vs Vector Search: BM25, Embeddings, and Dense Retrieval'
publishDate: 2026-09-12T10:00:00+02:00
excerpt: 'A visual comparison of inverted indexes, BM25, embeddings, dense retrieval, and the failure modes that determine which evidence a RAG system can find.'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'Information Retrieval', 'BM25', 'Embeddings', 'Dense Retrieval']
language: 'en'
author: 'Xiaojing Yang'
translationKey: 'keyword-vs-vector-retrieval'
translationHref: '/zh/keyword-vs-vector-retrieval'
translationLabel: '中文'
series: 'RAG Foundations'
seriesOrder: 3
seriesTotal: 6
seriesHref: '/series/rag-foundations'
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Keyword retrieval matches words; dense retrieval matches learned representations. Neither means “find the truth.” They produce candidates using different signals and fail in different ways.
  </p>
</div>

The [previous article](/how-documents-enter-rag-pdf-chunk-metadata-index) turned documents into searchable chunks. Now the question is: when a user asks something, how does the system decide which chunks look relevant?

![Keyword and dense retrieval compare different signals](/images/blog/lexical-vs-dense-retrieval-en.svg)

## 1. Retrieval is a ranking problem

Given a query (q), a corpus of chunks (D), and a cutoff (k), a retriever returns an ordered list:

$$R_q^k = [d_1,d_2,\ldots,d_k]$$

The system does not prove that these chunks are correct evidence. It assigns scores and returns the highest-ranked candidates. A candidate can be topically similar yet have the wrong year, entity, metric, or unit.

## 2. Keyword retrieval and the inverted index

Keyword search usually starts with an **inverted index**. Instead of storing only “document → words,” it also stores “term → documents containing the term.”

```text
angola     → chunk 17, chunk 84, chunk 203
production → chunk 12, chunk 84, chunk 611
2017       → chunk 84, chunk 91, chunk 430
```

At query time, the system can quickly find chunks containing the requested terms. This is especially useful for names, identifiers, numbers, abbreviations, legal phrases, and rare technical vocabulary.

Keyword search is not simply Boolean matching. A ranking function decides which matching chunks should appear first.

## 3. What BM25 is measuring

BM25 is a widely used lexical ranking function. Its intuition is easier than its formula:

- a term matters more when it appears in the chunk;
- repeated occurrences help, but with diminishing returns;
- rare query terms are usually more informative than common ones;
- unusually long chunks are normalized so they do not win merely by containing more words.

A common form is:

$$
\operatorname{BM25}(q,d)=\sum_{t\in q}\operatorname{IDF}(t)
\frac{f(t,d)(k_1+1)}{f(t,d)+k_1\left(1-b+b\frac{|d|}{\operatorname{avgdl}}\right)}
$$

Here (f(t,d)) is the frequency of term (t) in chunk (d); (k_1) controls term-frequency saturation; (b) controls document-length normalization. The exact implementation varies, so BM25 scores should not be treated as probabilities.

## 4. Dense retrieval and embeddings

Dense retrieval uses an embedding model to map queries and chunks into vectors:

```text
query q → e(q)
chunk d → e(d)
```

The chunk embeddings are normally computed in advance and stored in a vector index. At query time, the query embedding is compared with them using cosine similarity, dot product, or another distance function.

$$
\cos(q,d)=\frac{e(q)\cdot e(d)}{\lVert e(q)\rVert_2\lVert e(d)\rVert_2}
$$

Dense retrieval can connect paraphrases. A query containing “income after expenses” may retrieve a chunk containing “net profit” even when the exact words do not overlap.

## 5. Why a bi-encoder scales

Dense retrieval commonly uses a **bi-encoder**: the query and each chunk are encoded independently. Because chunk vectors are reusable, the system can search a large vector index efficiently.

The trade-off is that the query and chunk do not interact token by token during initial scoring. Their relationship is compressed into two fixed vectors. This is fast, but it can miss fine distinctions such as negation, exact year, units, or which entity owns a value.

## 6. Their failure modes are complementary

![Typical success and failure cases for lexical and dense retrieval](/images/blog/retrieval-signal-failures-en.svg)

| Situation                       | Keyword/BM25                          | Dense retrieval                             |
| ------------------------------- | ------------------------------------- | ------------------------------------------- |
| Exact product code or report ID | Usually strong                        | May blur similar identifiers                |
| Rare company or block name      | Usually strong                        | Depends on the embedding model              |
| Synonym or paraphrase           | May miss it                           | Usually stronger                            |
| Different language or wording   | Limited without analysis/expansion    | Can work with a suitable multilingual model |
| Wrong year but similar sentence | Exact year can help                   | Often dangerously similar                   |
| Number-heavy table              | Useful if extraction preserves tokens | Meaning may be poorly represented           |

Neither column is universally better. The target questions, corpus, language, and document structure determine which signal is useful.

## 7. A concrete annual-report example

Question: “In 2017, what share of equity liquid production outside Norway came from three blocks in Angola?”

- BM25 may reward exact matches for **2017**, **Angola**, and **equity liquid production**.
- Dense retrieval may find a table whose header uses a paraphrase not present in the query.
- Dense retrieval may also rank an almost identical 2016 table highly.
- BM25 may miss the correct row if OCR changed a name or the query uses a synonym.

This is why **semantic similarity is not evidence correctness**. Retrieval creates candidates; later stages still need metadata checks, fusion, reranking, and evaluation.

## 8. What should be indexed?

For lexical search, preserve meaningful tokens, numbers, table headers, and domain terms. For dense search, construct text that gives the embedding model enough context: section title, table title, row labels, units, and selected metadata.

Do not silently append every metadata field. Test whether it helps retrieval or merely makes unrelated chunks look alike.

## 9. How should the two retrievers be compared?

Use the same queries, gold evidence, chunk collection, and cutoff values. Compare Recall@k and ranking metrics, then inspect disagreements:

1. evidence found only by BM25;
2. evidence found only by dense retrieval;
3. wrong-year or wrong-entity near misses;
4. failures caused by extraction rather than retrieval.

The disagreement set explains why a method works and motivates the next design step: combine complementary candidate lists, then rerank them more carefully.

## Further reading

- [Elasticsearch: BM25 similarity](https://www.elastic.co/docs/reference/elasticsearch/index-settings/similarity)
- [Sentence Transformers: semantic search](https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html)
- [Sentence Transformers: retrieve and rerank](https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html)

<div class="my-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-between">
  <a href="/how-documents-enter-rag-pdf-chunk-metadata-index">← 2. How documents enter RAG</a>
  <a href="/hybrid-retrieval-and-reranking">4. Hybrid retrieval and reranking →</a>
</div>
