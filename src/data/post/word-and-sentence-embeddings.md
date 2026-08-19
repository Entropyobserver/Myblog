---
title: "Word Embeddings and Sentence Embeddings"
publishDate: 2026-08-19
excerpt: "How discrete language becomes vector space, and why sentence embeddings matter for retrieval and evaluation."
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "en"
author: "Xiaojing Yang"
translationKey: "word-and-sentence-embeddings"
translationHref: "/zh/word-and-sentence-embeddings"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Embeddings turn symbolic text into geometric objects that models can compare, transform, and retrieve.</p>
</div>

## 1. From words to vectors

Words are discrete symbols. Neural models need numbers. Embeddings map tokens, words, sentences, or documents into dense vectors where similarity can be computed.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Embedding levels</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Token embedding</strong><br />one model token</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Word embedding</strong><br />lexical meaning</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Sentence embedding</strong><br />sentence-level semantics</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Document embedding</strong><br />longer context</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Retrieval</strong><br />nearest neighbors</div>
  </div>
</div>

## 2. Why sentence embeddings are different

A word embedding represents a lexical item. A sentence embedding tries to compress context, syntax, topic, and meaning into one vector. That compression is useful but lossy.

| Use case | Embedding level |
|---|---|
| Similar words | word embeddings |
| Semantic search | sentence/document embeddings |
| RAG retrieval | passage embeddings |
| MT evaluation | multilingual sentence representations |

## 3. Hugging Face practice

```python
from transformers import AutoTokenizer, AutoModel

name = "sentence-transformers/all-MiniLM-L6-v2"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModel.from_pretrained(name)
```

## 4. My research connection

Embeddings connect directly to RAG, COMET-style MT evaluation, multilingual similarity, and error analysis. In petroleum-domain MT, sentence representations can reveal whether technical meaning is preserved even when surface wording changes.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Similarity view</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Vectors close together are treated as semantically related.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Caution</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Embedding similarity can miss factual grounding, domain terminology, and negation.</p>
  </div>
</div>

## Takeaway

Embeddings are powerful because they make language measurable, but the measurement is never the whole meaning.

## Interview pattern

My interview answer would usually be:

1. define the concept in one sentence;
2. explain the data flow;
3. name the main failure mode;
4. connect it to evaluation, multilinguality, or fine-tuning.

## References

- [Hugging Face Course](https://huggingface.co/course)
- [Hugging Face Transformers documentation](https://huggingface.co/docs/transformers)
- [Hugging Face tokenizer summary](https://huggingface.co/docs/transformers/v4.36.1/en/tokenizer_summary)
- [Hugging Face fine-tuning guide](https://huggingface.co/docs/transformers/training)
- [Hugging Face PEFT](https://github.com/huggingface/peft)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Speech and Language Processing, Jurafsky & Martin](https://web.stanford.edu/~jurafsky/slp3/)
- [Stanford CS224N readings](https://web.stanford.edu/class/cs224n/readings/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [COMET: A Neural Framework for MT Evaluation](https://aclanthology.org/2020.emnlp-main.213/)
