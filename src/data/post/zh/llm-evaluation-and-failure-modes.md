---
title: "LLM Evaluation and Failure Modes"
publishDate: 2026-08-19
excerpt: "LLM 评估风险图：幻觉、prompt 敏感性、偏见、污染和脆弱 benchmark。"
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "llm-evaluation-and-failure-modes"
translationHref: "/llm-evaluation-and-failure-modes"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">LLM evaluation 要测试行为，而不只是 benchmark 分数。</p>
</div>

## 1. 为什么 LLM evaluation 不一样

LLMs 是通用系统。它们能听指令、生成流畅文本、给出像检索过的答案，也能在错误时解释得很自信。所以评估必须检查真实条件下的行为。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">LLM 评估循环</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Task</strong><br />用户需要什么</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Prompt set</strong><br />指令和上下文</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Model outputs</strong><br />可能有随机性</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Judging</strong><br />指标、人类或 model judge</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Failure analysis</strong><br />模式和严重性</div>
  </div>
</div>

## 2. 常见失败模式

| 失败模式 | 检查什么 |
|---|---|
| Hallucination | unsupported claims |
| Prompt sensitivity | 换措辞后是否不稳定 |
| Bias | 系统性差异 |
| Contamination | benchmark 是否出现在训练中 |
| Verbosity trap | 流畅但低价值 |
| Long-context failure | 忽略或误用证据 |

## 3. 评估实践

```python
# Pseudocode
for prompt in prompt_suite:
    output = model.generate(prompt)
    score = judge(output, reference_or_rubric)
    log_failure_mode(output, score)
```

## 4. 我的研究连接

这连接到 RAG、长文档、多语评估和 responsible AI。对 multilingual LLMs 来说，模型可能英语表现很强，却在低资源语言或领域技术文档上失败。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Benchmark 视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">分数有多高？</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究视角</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">哪些行为可靠，哪些会失败，在什么条件下失败？</p>
  </div>
</div>

## 总结

LLM evaluation 不是排行榜，而是对模型系统做行为科学。

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
