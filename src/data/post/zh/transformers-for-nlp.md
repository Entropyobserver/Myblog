---
title: "NLP 中的 Transformers"
publishDate: 2026-08-19
excerpt: "Transformers 如何组合 self-attention、feed-forward layers、residuals 和位置信息。"
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "transformers-for-nlp"
translationHref: "/transformers-for-nlp"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Transformer 是一层层基于 attention 的表示更新。</p>
</div>

## 1. 架构想法

Transformers 用 self-attention 和并行计算替代 recurrence。每一层都会利用序列信息更新 token representations。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Transformer block</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Token embeddings</strong><br />输入向量</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Self-attention</strong><br />混合上下文信息</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Residual + norm</strong><br />稳定更新</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Feed-forward</strong><br />逐位置变换</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>下一层</strong><br />重复</div>
  </div>
</div>

## 2. Encoder、decoder、encoder-decoder

| 类型 | 常见用途 |
|---|---|
| Encoder-only | 分类、NER、句向量 |
| Decoder-only | 语言建模、聊天、生成 |
| Encoder-decoder | 翻译、摘要、text-to-text tasks |

## 3. Hugging Face 实践

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name, num_labels=2)
```

## 4. 我的研究连接

Transformers 是多语 encoder、MT 系统、COMET 类指标和 LoRA fine-tuning 的共同骨架。理解 block 有助于解释 adapter 插在哪里，以及为什么 tokenization 会影响后续一切。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">工程视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">使用 pretrained checkpoints 和 task heads。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">追问架构支持什么表示、语言覆盖和适配机制。</p>
  </div>
</div>

## 总结

Transformers 不是一个模型，而是一种可复用的上下文表示和生成架构模式。

## 面试回答模板

如果面试问到这个概念，我通常会这样回答：

1. 用一句话定义；
2. 解释数据如何流动；
3. 指出主要失败模式；
4. 连接到 evaluation、multilinguality 或 fine-tuning。

## 参考资料

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
