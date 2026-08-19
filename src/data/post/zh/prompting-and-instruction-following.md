---
title: "Prompting and Instruction Following"
publishDate: 2026-08-19
excerpt: "Prompting 既是任务说明，也是接口设计和评估风险。"
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "prompting-and-instruction-following"
translationHref: "/prompting-and-instruction-following"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Prompt 不只是输入文本，而是语言模型的临时任务接口。</p>
</div>

## 1. Prompting 做了什么

Prompting 在不改变模型权重的情况下说明任务、上下文、约束、风格和输出格式。Instruction following 取决于预训练、instruction tuning、alignment 和 decoding。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">Prompt 路径</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Instruction</strong><br />要做什么</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Context</strong><br />证据或示例</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Constraints</strong><br />格式和规则</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Decoding</strong><br />生成输出</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Evaluation</strong><br />检查有用性和失败</div>
  </div>
</div>

## 2. Prompt 类型

| 类型 | 用途 |
|---|---|
| zero-shot | 直接指令 |
| few-shot | 在上下文中给例子 |
| chain-of-thought style | 在合适时引出推理痕迹 |
| structured output | JSON、表格、标签 |
| retrieval-augmented prompt | 用外部证据 grounded answer |

## 3. Hugging Face 实践

```python
from transformers import pipeline

generator = pipeline("text-generation", model="Qwen/Qwen2.5-0.5B-Instruct")
out = generator("Explain cross-validation in one paragraph.", max_new_tokens=80)
```

## 4. 我的研究连接

Prompting 对 LLM evaluation 很重要，因为很小的措辞变化都可能改变表现。对多语任务来说，英文 prompt 不一定公平迁移到其他语言或领域。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">有用习惯</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">把 prompts 当成实验变量。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">评估风险</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">不要在最终测试集上调 prompt。</p>
  </div>
</div>

## 总结

Prompting 强大，因为它轻量；也正因为轻量，它很容易悄悄过拟合。

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
