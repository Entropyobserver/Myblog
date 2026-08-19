---
title: "词向量与句向量"
publishDate: 2026-08-19
excerpt: "离散语言如何变成向量空间，以及句向量为什么对检索和评估重要。"
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "word-and-sentence-embeddings"
translationHref: "/word-and-sentence-embeddings"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Embedding 把符号文本变成几何对象，让模型可以比较、变换和检索。</p>
</div>

## 1. 从词到向量

词是离散符号，神经模型需要数字。Embeddings 把 token、词、句子或文档映射到稠密向量空间，让相似性可以被计算。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Embedding 层级</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Token embedding</strong><br />一个模型 token</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Word embedding</strong><br />词汇意义</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Sentence embedding</strong><br />句子级语义</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Document embedding</strong><br />更长上下文</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Retrieval</strong><br />最近邻搜索</div>
  </div>
</div>

## 2. 为什么句向量不一样

词向量表示词项。句向量试图把上下文、句法、主题和意义压缩到一个向量里。这种压缩有用，但也会丢信息。

| 用途 | Embedding 层级 |
|---|---|
| 相似词 | word embeddings |
| 语义搜索 | sentence/document embeddings |
| RAG 检索 | passage embeddings |
| MT 评估 | multilingual sentence representations |

## 3. Hugging Face 实践

```python
from transformers import AutoTokenizer, AutoModel

name = "sentence-transformers/all-MiniLM-L6-v2"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModel.from_pretrained(name)
```

## 4. 我的研究连接

Embeddings 直接连接 RAG、COMET 风格 MT evaluation、多语相似度和错误分析。在石油领域 MT 中，句向量可以帮助观察技术意义是否保留，即使表面措辞不同。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">相似性视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">向量距离近，就被认为语义相关。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">注意</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Embedding similarity 可能漏掉事实 groundedness、领域术语和否定。</p>
  </div>
</div>

## 总结

Embedding 强大，是因为它让语言可以被测量；但测量永远不等于完整意义。

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
