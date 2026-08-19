---
title: "Parameter-Efficient Fine-Tuning"
publishDate: 2026-08-19
excerpt: "Why LoRA and adapters are useful when full fine-tuning is too expensive or unstable."
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "en"
author: "Xiaojing Yang"
translationKey: "parameter-efficient-fine-tuning"
translationHref: "/zh/parameter-efficient-fine-tuning"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">PEFT adapts a large model by training a small number of additional or selected parameters.</p>
</div>

## 1. The motivation

Large models are expensive to fine-tune fully. Parameter-efficient fine-tuning methods reduce trainable parameters while keeping the base model mostly frozen.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">PEFT idea</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Base model</strong><br />pretrained knowledge</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Freeze most weights</strong><br />keep broad ability</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Add adapter/LoRA</strong><br />small trainable module</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Train domain task</strong><br />cheap adaptation</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Swap or merge</strong><br />deployment choice</div>
  </div>
</div>

## 2. LoRA intuition

LoRA represents a weight update as a low-rank decomposition. Instead of training a full update matrix, it trains two smaller matrices.

```text
W' = W + ΔW
ΔW ≈ B A
```

| Choice | Meaning |
|---|---|
| rank r | capacity of the adapter |
| alpha | scaling of the update |
| target modules | where adaptation happens |
| dropout | regularization |

## 3. Hugging Face PEFT practice

```python
from peft import LoraConfig, get_peft_model

config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])
model = get_peft_model(base_model, config)
model.print_trainable_parameters()
```

## 4. My research connection

This is closest to my Modular LoRA Experts work. Different adapters can specialize for domains, languages, or error types, while the base model remains shared.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Full fine-tuning</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Maximum flexibility, higher cost, higher overfitting risk.</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">PEFT</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Smaller updates, cheaper experiments, easier adapter management.</p>
  </div>
</div>

## Takeaway

PEFT is not just an efficiency trick. It is a design pattern for controlled specialization.

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
