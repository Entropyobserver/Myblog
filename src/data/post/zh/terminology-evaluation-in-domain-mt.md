---
title: '领域 MT 中的术语评估问题'
publishDate: 2026-08-24
excerpt: '为什么领域机器翻译必须单独评估术语，尤其是在自动指标可能掩盖关键技术错误的时候。'
category: 'Model Evaluation'
track: 'Research & Applications'
tags: ['Machine Translation', 'Terminology', 'COMET', 'BLEU', 'Domain Adaptation']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'terminology-evaluation-in-domain-mt'
translationHref: '/terminology-evaluation-in-domain-mt'
translationLabel: 'English'
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">研究问题</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    如何评估一个领域 MT 系统是否保留了真实用户真正关心的技术术语？
  </p>
</div>

在领域机器翻译里，术语不是装饰性词汇。它是文档意义的一部分。

一个翻译可以很流畅、语法正确，甚至自动指标分数也不错，但仍然在某个领域专家认为关键的术语上失败。所以 terminology 必须被当成一个 evaluation problem，而不是普通 preprocessing detail。

## 为什么通用 MT 指标不够

BLEU、chrF 和 COMET 都有用，但它们观察翻译的角度不同。

| 指标  | 能捕捉什么                     | 可能漏掉什么                   |
| ----- | ------------------------------ | ------------------------------ |
| BLEU  | 和 reference 的 n-gram overlap | 语义充分性、合理改写、稀有术语 |
| chrF  | 字符级相似度                   | 改变意义的替换                 |
| COMET | 学习到的语义质量               | 细粒度领域术语和高风险技术错误 |

在 petroleum-domain translation 中，一个小术语错误可能比几个轻微流畅性问题更严重。如果模型翻错单位、方向、licence term、well name 或 geological concept，即使句子听起来很自然，翻译也可能不可靠。

## 把 terminology 当成单独的 utility

从研究角度看，terminology 可以定义成单独的 utility function。我们不只问：

> 整个翻译好不好？

而是问：

> 领域术语是否被正确、一致地翻译？

这会改变评估设计。我们可能需要 term list、source-term detection、expected target terms，以及一种统计正确保留的方法。

一个简单术语评估流程可以包括：

1. 提取 source-side domain terms；
2. 映射到 expected target terms；
3. 检查模型输出是否包含正确 target expression；
4. 报告 term occurrence 上的 precision、recall 或 F1；
5. 人工检查 ambiguous cases。

## 为什么这对 LoRA NMT 重要

LoRA 可能提升整体领域适配，但术语仍然脆弱。尤其在这些情况下：

- term 在 fine-tuning data 中很少见；
- tokenizer 把 term 切成很别扭的 subwords；
- reference 有一个合法术语，但模型输出另一个也可能可接受的变体；
- 自动指标奖励表面相似，而不是技术正确性；
- Bokmål/Nynorsk variation 影响目标术语形式。

所以 LoRA 实验不能只报告整体 BLEU 或 COMET。它应该问：adapter 是否学到了领域适配最初想解决的那些 domain-specific mappings？

## 一个实用评估表

对领域 MT 报告，我更喜欢这样的表：

| System           | BLEU | chrF | COMET | Term recall | Critical errors |
| ---------------- | ---: | ---: | ----: | ----------: | --------------: |
| Base model       |   -- |   -- |    -- |          -- |              -- |
| LoRA             |   -- |   -- |    -- |          -- |              -- |
| Full fine-tuning |   -- |   -- |    -- |          -- |              -- |

具体数字取决于实验，但结构很重要。它能避免用单一 headline metric 掩盖术语失败。

## 人类错误分析

术语指标仍然需要人工检查。一个术语可能翻译正确，但以不同屈折形式出现。一个翻译可能用了普通语言里的同义词，但在技术领域里不合适。有些错误只有读完整句才能发现。

有用的错误类别包括：

- 错误技术术语；
- 术语遗漏；
- 未翻译术语；
- 跨句术语不一致；
- 错误单位、数字、field name 或 licence name；
- 书面语标准混合；
- 小词选择导致的 meaning shift。

这也是领域 MT 评估变得像研究的地方：metric 告诉我们去哪里看，error taxonomy 解释到底失败了什么。

## 和我的项目的关系

在我的 English--Norwegian petroleum MT 中，术语是核心，因为这个领域包含很多专业表达，general model 容易近似，但不一定可靠翻译。LoRA adaptation 不应该只看句子是否更流畅，还应该看输出是否真的更适合 petroleum-domain text。

## 局限

术语评估本身也有困难：

- term list 可能不完整；
- 一个 source term 可能有多个合法翻译；
- 自动匹配可能漏掉屈折或改写；
- reference 不一定是唯一正确输出；
- domain experts 可能对首选术语有分歧。

所以 term metrics 应该补充 human error analysis，而不是替代它。

## 面试回答

在领域 MT 中，我会单独评估 terminology，因为通用指标可能漏掉关键技术错误。对 English--Norwegian petroleum translation，我会构建或检查领域术语表，评估 source terms 是否在 target output 中被保留，并把 term-level metrics 和 human error analysis 结合起来。这样才能更清楚地判断 LoRA 是否提升了领域中真正重要的行为。
