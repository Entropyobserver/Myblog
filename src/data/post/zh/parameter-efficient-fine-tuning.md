---
title: "Parameter-Efficient Fine-Tuning"
publishDate: 2026-08-19
excerpt: "为什么当 full fine-tuning 太贵或不稳定时，LoRA 和 adapters 会有价值。"
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "parameter-efficient-fine-tuning"
translationHref: "/parameter-efficient-fine-tuning"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">PEFT 通过训练少量新增或被选择的参数来适配大模型。</p>
</div>

## 1. 动机

大模型 full fine-tuning 很贵。Parameter-efficient fine-tuning 方法减少可训练参数，同时让 base model 大部分保持冻结。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">PEFT 思路</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Base model</strong><br />预训练知识</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>冻结大多数权重</strong><br />保留广泛能力</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>加入 adapter/LoRA</strong><br />小型可训练模块</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>训练领域任务</strong><br />低成本适配</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>切换或合并</strong><br />部署选择</div>
  </div>
</div>

## 2. LoRA 直觉

LoRA 把权重更新表示成低秩分解。它不训练完整更新矩阵，而是训练两个更小矩阵。

```text
W' = W + ΔW
ΔW ≈ B A
```

| 选择 | 含义 |
|---|---|
| rank r | adapter 容量 |
| alpha | 更新缩放 |
| target modules | 适配发生在哪里 |
| dropout | 正则化 |

## 3. Hugging Face PEFT 实践

```python
from peft import LoraConfig, get_peft_model

config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])
model = get_peft_model(base_model, config)
model.print_trainable_parameters()
```

## 4. 我的研究连接

这篇最接近我的 Modular LoRA Experts 项目。不同 adapters 可以为领域、语言或错误类型专门化，而 base model 仍然共享。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Full fine-tuning</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">灵活性最大，成本更高，过拟合风险更高。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">PEFT</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">更新更小，实验更便宜，adapter 管理更容易。</p>
  </div>
</div>

## 总结

PEFT 不只是效率技巧，而是一种受控专门化的设计模式。

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
