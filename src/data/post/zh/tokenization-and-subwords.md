---
title: "Tokenization and Subwords：为什么切词会影响模型"
publishDate: 2026-08-19
excerpt: "Tokenization 是 NLP 里的第一个建模决定：它决定模型能看见什么单位、稀有术语如何表示，以及多语系统如何处理领域语言。"
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI", "Tokenization"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "tokenization-and-subwords"
translationHref: "/tokenization-and-subwords"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Tokenization 不是一个很小的预处理细节，而是 NLP 里第一个建模决定：它决定语言模型到底能看见什么单位。
  </p>
</div>

## 1. 为什么我会关心 tokenization

刚开始学 NLP 时，tokenization 看起来很无聊：把文本切开，把 tokens 转成 ids，再喂给模型。但越接触 multilingual 和 domain-specific text，我越觉得 tokenization 一点也不“无辜”。

对 English--Norwegian 石油领域机器翻译来说，tokenization 会影响：

- 稀有技术术语是否还能保持可识别；
- 挪威语复合词会被切成有意义片段，还是奇怪碎片；
- 一个句子 tokenization 后是否变得很长；
- 多语词表共享到底是在帮助低资源/领域语言，还是在伤害它；
- 最终评估错误来自模型、数据，还是 tokenizer 本身。

所以我对 tokenization 的工作定义是：

> Tokenization 是人类语言和模型计算之间的接口。

如果这个接口不好，模型在任务开始前就已经吃亏了。

![Tokenization 流程图](/images/blog/tokenization-subwords-flow.png)

## 2. 从原始文本到模型输入

Transformer 模型不会直接阅读文本。它读的是整数 ids。Tokenizer 负责完成这个转换：

```text
raw text
  → tokens / subwords
  → token ids
  → embeddings
  → attention layers
```

比如一句：

```text
Norwegian petroleum terminology matters.
```

可能会先变成一串 subword tokens，再变成一串 ids。模型从来没有以我们人类看到的方式“看见”原句。它看到的是词表里的符号序列。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">真实处理流程</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Raw text</strong><br />字符、空格、标点、书写系统</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Pre-tokenization</strong><br />初步切分规则</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Subword model</strong><br />BPE、WordPiece 或 SentencePiece</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Ids</strong><br />词表查找</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Model</strong><br />Embeddings 和 attention mask</div>
  </div>
</div>

关键点是：后面所有 representation 都依赖最开始这一步切分。

## 3. 为什么不直接按词切？

Word-level tokenization 很符合直觉，但它会导致词表巨大。每个词形变化、稀有技术术语、拼写错误、人名、复合词、领域表达，都可能需要自己的词表项。

Character-level tokenization 可以避免 unknown words，但序列会变得很长，模型也必须从非常小的单位里学习意义。

Subword tokenization 是中间方案：

| 层级 | 优点 | 弱点 |
|---|---|---|
| Word-level | 单位直观 | 词表巨大，稀有词/未知词多 |
| Character-level | 几乎没有未知词 | 序列长，语义单位弱 |
| Subword-level | 用可复用片段处理稀有词 | 术语可能被切得很奇怪 |

这就是为什么大多数 Transformer 模型使用 subwords。

## 4. BPE、WordPiece 和 SentencePiece

最常见的三个名字是 BPE、WordPiece 和 SentencePiece。

| 方法 | 直觉 | 常见关联 |
|---|---|---|
| BPE | 反复合并高频符号对 | GPT 风格和许多现代 tokenizer |
| WordPiece | 选择能提高训练数据似然的片段 | BERT 风格 tokenizer |
| SentencePiece | 直接在 raw text 上训练，包括空格 | 多语和 text-to-text 模型，如 T5 风格系统 |

面试时不需要死记每个实现细节。真正重要的是理解这个 trade-off：

> Subword tokenizer 通过把稀有词表示成常见片段组合，降低词表规模并提高覆盖率。

这个 trade-off 很强，但不是免费的。

## 5. 一个具体的 subword 例子

如果我在调试 multilingual/domain model，我会做类似这样的表：

| 术语 | 可能有用的切分 | 风险较高的切分 | 为什么重要 |
|---|---|---|---|
| wellbore integrity | wellbore / integrity | well / bore / in / tegrity | 技术意义可能被稀释 |
| decommissioning | de / commission / ing | d / eco / mm / ission / ing | 序列更长，对齐更难 |
| petroleumstilsynet | petroleum / tilsynet | pet / role / um / stil / syn / et | 挪威语复合词可能表示很差 |
| blowout preventer | blowout / preventer | blow / out / pre / vent / er | 术语一致性可能受影响 |

这些是说明性例子，不是某一个固定 tokenizer 的真实输出。真正做项目时，我会检查当前模型实际使用的 tokenizer。

## 6. Hugging Face demo

让 tokenization 可见的最快方法，就是直接打印 tokens。

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("xlm-roberta-base")

examples = [
    "wellbore integrity",
    "decommissioning of petroleum installations",
    "Petroleumstilsynet published new guidelines.",
]

for text in examples:
    tokens = tokenizer.tokenize(text)
    ids = tokenizer.convert_tokens_to_ids(tokens)
    print(text)
    print(tokens)
    print(ids)
    print("num_tokens:", len(tokens))
    print()
```

我会重点看：

- 一个领域术语是否被切成很多小碎片；
- 挪威语例子是否比英文例子 token 数明显更长；
- 重要术语是否被稳定表示；
- 长技术文档 tokenization 后是否有截断风险。

这个小诊断经常比只盯着最终 BLEU 或 COMET 分数更有用。

## 7. Tokenization 为什么影响多语模型

Multilingual tokenizer 会尝试让许多语言共享一个词表。这可以帮助迁移：相近书写系统、外来词、人名、技术术语可能共享片段。

但共享不等于公平覆盖。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">什么时候共享有帮助</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">
      相关语言、共享书写系统、重复技术术语，以及足够多的预训练数据，会让 subword sharing 更有用。
    </p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">什么时候共享会伤害</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">
      低资源语言、丰富形态、复合词、少数书写系统和领域术语，都可能被过度切碎。
    </p>
  </div>
</div>

对高资源语言来说，tokenizer 可能包含很多有意义的片段。对低资源或领域密集设置来说，同一个 tokenizer 可能会把重要词切成长而不自然的序列。

这会引出一个评估问题：

> 模型表现差，是因为它缺知识，还是因为 tokenizer 一开始就给了它很差的输入表示？

## 8. Tokenization 为什么影响领域 MT

在领域机器翻译里，术语不是装饰。如果模型把技术术语翻错，即使句子很流畅，输出也可能不可用。

对 English--Norwegian petroleum MT，我会在领域适配前后检查 tokenization：

| 诊断 | 问题 |
|---|---|
| token count | 领域句子是否比通用句子长很多？ |
| term fragmentation | 关键术语是否被切成很多片段？ |
| language imbalance | 挪威语是否比英语更碎？ |
| truncation | 长技术文档是否超过模型 context window？ |
| consistency | 重复术语是否被稳定切分？ |

这也直接连接到 LoRA 和 PEFT。如果 tokenizer 已经把稀有领域术语切得很碎，那么 adapter 仍然可能提升翻译风格或术语表现，但它是在有限的输入表示之上做适配。

## 9. 常见失败模式

| 失败模式 | 看起来是什么样 | 为什么重要 |
|---|---|---|
| 过度碎片化 | 一个术语变成很多小片段 | 序列更长，术语表示更弱 |
| unknown 或 byte fallback artifact | 稀有符号/文字出现奇怪片段 | 表示变噪 |
| 不一致切分 | 相关词形被切得差异很大 | 术语一致性更难 |
| 截断 | tokenization 后长文档被切掉 | 源文本或证据缺失 |
| 词表偏置 | 高资源语言切分更自然 | 多语表现差距 |

实用习惯很简单：当 multilingual 或 domain model 失败时，早一点检查 tokenization。

## 10. 面试回答

如果面试问 “What is tokenization in NLP?”，我会这样答：

> Tokenization converts raw text into units a model can process, usually tokens or subwords mapped to integer ids. Modern Transformer models often use subword tokenization because it balances vocabulary size and rare-word coverage. The trade-off is that important words, especially in low-resource or domain-specific settings, may be fragmented in ways that affect sequence length, representation quality, and evaluation.

如果继续问 “Why do subwords matter?”，我会补充：

> Subwords let the model represent unseen or rare words using smaller learned pieces. This is useful for morphology and multilingual transfer, but I would always inspect whether important domain terms are split into meaningful pieces.

## 11. 我会怎么在项目里用

真实项目里，我会在训练前加一个很小的 tokenizer audit：

```python
def tokenizer_audit(tokenizer, terms):
    rows = []
    for term in terms:
        tokens = tokenizer.tokenize(term)
        rows.append({
            "term": term,
            "tokens": tokens,
            "num_tokens": len(tokens),
        })
    return rows
```

然后检查领域术语：

```python
terms = [
    "wellbore integrity",
    "blowout preventer",
    "decommissioning",
    "petroleumstilsynet",
    "subsea installation",
]
```

这件事不花哨，但它正是让 NLP 项目更可信的小诊断。

## 总结

Tokenization 是语言变成模型输入的地方。对 multilingual 和 domain-specific NLP 来说，它会影响后面的一切：序列长度、表示质量、术语保留、fine-tuning 行为和评估结果。

在问“模型是否理解这个术语”之前，我会先问：

> Tokenizer 是怎么把这个术语展示给模型的？

## 参考资料和延伸阅读

- [Hugging Face Course](https://huggingface.co/course)
- [Hugging Face tokenizer summary](https://huggingface.co/docs/transformers/v4.36.1/en/tokenizer_summary)
- [Hugging Face Transformers documentation](https://huggingface.co/docs/transformers)
- [Speech and Language Processing, Jurafsky & Martin](https://web.stanford.edu/~jurafsky/slp3/)
- [Stanford CS224N readings](https://web.stanford.edu/class/cs224n/readings/)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909)
- [SentencePiece: A simple and language independent subword tokenizer and detokenizer](https://arxiv.org/abs/1808.06226)
