---
title: "Sequence-to-Sequence Models"
publishDate: 2026-08-19
excerpt: "机器翻译、摘要和许多生成任务背后的 encoder-decoder 思想。"
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "sequence-to-sequence-models"
translationHref: "/sequence-to-sequence-models"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Seq2seq 模型把一个序列变成另一个序列：先编码，再一步步解码。</p>
</div>

## 1. 任务形状

很多 NLP 任务天然是 sequence-to-sequence：翻译、摘要、问答、data-to-text generation、语法纠错。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Seq2seq 流程</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>源序列</strong><br />输入 tokens</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Encoder</strong><br />上下文表示</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Decoder state</strong><br />已经生成了什么</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Next token</strong><br />预测下一步</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>目标序列</strong><br />完整输出</div>
  </div>
</div>

## 2. 它为什么重要

在 Transformers 之前，encoder-decoder RNN 让神经机器翻译变得可行。Attention 又改进了它，让 decoder 可以回看 source states，而不是只依赖一个固定向量。

| 组件 | 作用 |
|---|---|
| Encoder | 读取源文本 |
| Decoder | 生成目标文本 |
| Attention | 选择相关源信息 |
| Teacher forcing | 用真实前文 token 训练 |

## 3. Hugging Face 实践

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

name = "Helsinki-NLP/opus-mt-en-no"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSeq2SeqLM.from_pretrained(name)
```

## 4. 我的研究连接

English--Norwegian MT 就是 seq2seq 问题。领域适配要问的是：当源文本包含稀有石油术语和正式文档风格时，模型能不能生成技术上正确的目标文本。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">核心优势</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Seq2seq 可以把变长输入映射到变长输出。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">核心风险</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">生成可以很流畅，却仍然遗漏源文本细节。</p>
  </div>
</div>

## 总结

Seq2seq 是 MT 的任务语法：输入文本变成输出文本，但忠实性必须被认真评估。

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
