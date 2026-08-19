---
title: "Sequence-to-Sequence Models"
publishDate: 2026-08-19
excerpt: "The encoder-decoder idea behind machine translation, summarization, and many generation tasks."
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "en"
author: "Xiaojing Yang"
translationKey: "sequence-to-sequence-models"
translationHref: "/zh/sequence-to-sequence-models"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Seq2seq models turn one sequence into another by encoding meaning and decoding output step by step.</p>
</div>

## 1. The task shape

Many NLP tasks are naturally sequence-to-sequence: translation, summarization, question answering, data-to-text generation, and grammatical correction.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Seq2seq flow</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Source sequence</strong><br />input tokens</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Encoder</strong><br />context representation</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Decoder state</strong><br />what has been generated</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Next token</strong><br />predict one step</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Target sequence</strong><br />complete output</div>
  </div>
</div>

## 2. Why it mattered

Before Transformers, encoder-decoder RNNs made neural machine translation practical. Attention improved them by letting the decoder look back at source states instead of relying on one fixed vector.

| Component | Role |
|---|---|
| Encoder | reads the source |
| Decoder | generates the target |
| Attention | selects relevant source information |
| Teacher forcing | trains with gold previous tokens |

## 3. Hugging Face practice

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

name = "Helsinki-NLP/opus-mt-en-no"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSeq2SeqLM.from_pretrained(name)
```

## 4. My research connection

English--Norwegian MT is a seq2seq problem. Domain adaptation asks whether the model can generate technically correct target text when the source contains rare petroleum terminology and formal document style.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Core strength</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Seq2seq maps variable-length input to variable-length output.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Core risk</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Generation can be fluent while still missing source details.</p>
  </div>
</div>

## Takeaway

Seq2seq is the task grammar behind MT: input text becomes output text, but faithfulness must be evaluated carefully.

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
