---
title: "Tokenization and Subwords：为什么切词会影响模型"
publishDate: 2026-08-19
excerpt: "为什么 tokenization 不是预处理小细节，尤其会影响多语和领域 NLP。"
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "tokenization-and-subwords"
translationHref: "/tokenization-and-subwords"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Tokenization 决定了模型在学习之前能看见什么单位。</p>
</div>

## 1. 核心想法

Tokenization 把文本转换成模型可以映射到 id 的单位。在现代 NLP 中，这些单位通常不是完整单词，而是 subwords。这是在 word-level vocabulary 太大和 character-level 序列太长之间的折中。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">文本到模型输入</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>原始文本</strong><br />词、标点、符号</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Tokenizer</strong><br />规则或学习到的切分</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Tokens</strong><br />词或子词</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Token ids</strong><br />词表里的整数</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>模型</strong><br />embedding 和 attention</div>
  </div>
</div>

## 2. 为什么 subwords 重要

Subword tokenization 可以处理稀有词、形态变化、拼写错误和多语词表共享。BPE、WordPiece、SentencePiece 是 Transformer 模型常见策略。

| Tokenizer 思路 | 实际含义 |
|---|---|
| BPE | 合并高频字符对 |
| WordPiece | 选择更能提高似然的片段 |
| SentencePiece | 把文本当 raw stream，适合多书写系统 |

## 3. Hugging Face 实践

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("xlm-roberta-base")
encoded = tokenizer("Norwegian petroleum terminology matters.", return_tensors="pt")
print(encoded["input_ids"].shape)
```

## 4. 我的研究连接

在 English--Norwegian 领域 MT 中，tokenization 会决定稀有石油术语是被切成有意义片段，还是被切得很碎。这会影响术语保留、序列长度、显存使用和最终评估。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">普通教程视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Tokenization 是预处理步骤。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Tokenization 是影响多语公平、稀有术语和领域迁移的建模选择。</p>
  </div>
</div>

## 总结

在问模型是否理解一个术语之前，我会先问 tokenizer 是怎么看见它的。

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
