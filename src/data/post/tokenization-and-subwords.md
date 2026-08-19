---
title: "Tokenization and Subwords"
publishDate: 2026-08-19
excerpt: "Why tokenization is not a preprocessing detail, especially for multilingual and domain-specific NLP."
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "en"
author: "Xiaojing Yang"
translationKey: "tokenization-and-subwords"
translationHref: "/zh/tokenization-and-subwords"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Tokenization decides what units the model is allowed to see before it learns anything.</p>
</div>

## 1. The idea

Tokenization converts text into units that a model can map to ids. In modern NLP, those units are often subwords rather than full words. This is a compromise between word-level vocabulary explosion and character-level sequences that are too long.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Text to model input</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Raw text</strong><br />words, punctuation, symbols</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Tokenizer</strong><br />rules or learned segmentation</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Tokens</strong><br />words or subwords</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Token ids</strong><br />integers from a vocabulary</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Model</strong><br />embeddings and attention</div>
  </div>
</div>

## 2. Why subwords matter

Subword tokenization helps handle rare words, morphology, misspellings, and multilingual vocabulary sharing. BPE, WordPiece, and SentencePiece are common strategies used by Transformer models.

| Tokenizer idea | Practical meaning |
|---|---|
| BPE | merge frequent character pairs |
| WordPiece | choose pieces that improve likelihood |
| SentencePiece | treat text as raw stream, useful across scripts |

## 3. Hugging Face practice

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("xlm-roberta-base")
encoded = tokenizer("Norwegian petroleum terminology matters.", return_tensors="pt")
print(encoded["input_ids"].shape)
```

## 4. My research connection

For English--Norwegian domain MT, tokenization can decide whether rare petroleum terms are represented as meaningful pieces or fragmented into awkward subwords. That affects terminology preservation, sequence length, memory use, and downstream evaluation.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Ordinary tutorial view</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Tokenization is a preprocessing step.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Research view</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Tokenization is a modeling choice that affects multilingual fairness, rare terms, and domain transfer.</p>
  </div>
</div>

## Takeaway

Before asking whether a model understands a term, I first ask how the tokenizer sees it.

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
