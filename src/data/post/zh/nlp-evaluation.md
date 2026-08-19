---
title: "NLP Evaluation：自然语言处理评估"
publishDate: 2026-08-19
excerpt: "为什么 NLP 评估需要指标、不确定性、人类判断和任务特定错误分析。"
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "nlp-evaluation"
translationHref: "/nlp-evaluation"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">NLP 评估困难，是因为语言质量本来就是多维的。</p>
</div>

## 1. 问题

语言输出可能流畅但错误，正确但别扭，忠实但不完整，或者有用但不逐字对应。单一指标很少能覆盖整个任务。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">评估栈</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>任务定义</strong><br />什么叫成功</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Dataset</strong><br />有代表性的案例</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Metric</strong><br />测量规则</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Uncertainty</strong><br />分数稳定性</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Error analysis</strong><br />失败在哪里，为什么</div>
  </div>
</div>

## 2. 指标家族

| 任务 | 指标 |
|---|---|
| 分类 | accuracy, F1, macro-F1 |
| NER | entity-level precision/recall/F1 |
| MT | BLEU, chrF, COMET, terminology accuracy |
| 摘要 | ROUGE, factuality checks, human evaluation |
| 检索 | recall@k, MRR, nDCG |

## 3. Hugging Face Evaluate 实践

```python
import evaluate

f1 = evaluate.load("f1")
result = f1.compute(predictions=preds, references=labels, average="macro")
```

## 4. 我的研究连接

对 MT 来说，我不会只依赖 BLEU。chrF 对形态变化更敏感，COMET 更接近 human judgments，术语指标检查领域词，人类错误分析揭示严重性。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">指标分数</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">一种紧凑测量。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究证据</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">指标 + 不确定性 + 示例 + 错误类别。</p>
  </div>
</div>

## 总结

好的 NLP evaluation 是证据链，不是一个数字。

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
