---
title: "Prompting and Instruction Following"
publishDate: 2026-08-19
excerpt: "Prompting as task specification, interface design, and evaluation risk."
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "en"
author: "Xiaojing Yang"
translationKey: "prompting-and-instruction-following"
translationHref: "/zh/prompting-and-instruction-following"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">A prompt is not just input text; it is a temporary task interface for a language model.</p>
</div>

## 1. What prompting does

Prompting specifies the task, context, constraints, style, and output format without changing model weights. Instruction following depends on pretraining, instruction tuning, alignment, and decoding.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Prompt path</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Instruction</strong><br />what to do</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Context</strong><br />evidence or examples</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Constraints</strong><br />format and rules</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Decoding</strong><br />generate output</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Evaluation</strong><br />check usefulness and failures</div>
  </div>
</div>

## 2. Prompt types

| Type | Use |
|---|---|
| zero-shot | direct instruction |
| few-shot | examples in context |
| chain-of-thought style | elicit reasoning traces when appropriate |
| structured output | JSON, tables, labels |
| retrieval-augmented prompt | ground answer in external evidence |

## 3. Hugging Face practice

```python
from transformers import pipeline

generator = pipeline("text-generation", model="Qwen/Qwen2.5-0.5B-Instruct")
out = generator("Explain cross-validation in one paragraph.", max_new_tokens=80)
```

## 4. My research connection

Prompting matters for LLM evaluation because small wording changes can change performance. For multilingual tasks, prompts in English may not transfer equally across languages or domains.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Useful habit</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Treat prompts as experimental variables.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Evaluation risk</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Do not tune prompts on the final test set.</p>
  </div>
</div>

## Takeaway

Prompting is powerful because it is lightweight, but that also makes it easy to overfit silently.

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
