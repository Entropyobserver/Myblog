---
title: "Tokenization and Subwords"
publishDate: 2026-08-19
excerpt: "Tokenization is the first modeling decision in NLP: it decides what units a model can see, how rare terms are represented, and how multilingual systems handle domain language."
category: "NLP and LLMs"
track: "Foundations"
tags: ["NLP and LLMs", "Transformers", "Hugging Face", "Multilingual AI", "Tokenization"]
language: "en"
author: "Xiaojing Yang"
translationKey: "tokenization-and-subwords"
translationHref: "/zh/tokenization-and-subwords"
translationLabel: "中文"
---

<div class="my-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">Core idea</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    Tokenization is not a small preprocessing detail. It is the first modeling decision that decides what units a language model can actually see.
  </p>
</div>

## 1. Why I care about tokenization

When I first learned NLP, tokenization looked almost boring: split text, convert tokens to ids, feed the ids into a model. But the more I work with multilingual and domain-specific text, the less innocent tokenization looks.

For English--Norwegian petroleum-domain machine translation, tokenization can affect:

- whether rare technical terms stay recognizable;
- whether Norwegian compounds are split into useful pieces or awkward fragments;
- whether a sentence becomes much longer after tokenization;
- whether multilingual vocabulary sharing helps or hurts low-resource/domain language;
- whether evaluation errors come from the model, the data, or the tokenizer.

So my working definition is:

> Tokenization is the interface between human language and model computation.

If the interface is poor, the model starts the task already disadvantaged.

![Tokenization flow diagram](/images/blog/tokenization-subwords-flow.png)

## 2. From raw text to model input

A Transformer model does not read text directly. It reads integer ids. The tokenizer performs the conversion:

```text
raw text
  → tokens / subwords
  → token ids
  → embeddings
  → attention layers
```

For example, a sentence like:

```text
Norwegian petroleum terminology matters.
```

might become a sequence of subword tokens, then a sequence of ids. The model never sees the original sentence as we see it. It sees a sequence of vocabulary items.

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">The real pipeline</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Raw text</strong><br />Characters, spaces, punctuation, scripts</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Pre-tokenization</strong><br />Initial splitting rules</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Subword model</strong><br />BPE, WordPiece, or SentencePiece</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Ids</strong><br />Vocabulary lookup</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Model</strong><br />Embeddings and attention mask</div>
  </div>
</div>

The key point: every downstream representation depends on this first segmentation.

## 3. Why not just use words?

Word-level tokenization feels intuitive, but it creates a huge vocabulary. Every inflected form, rare technical term, misspelling, name, compound, or domain-specific expression may need its own entry.

Character-level tokenization avoids unknown words, but sequences become long and the model has to learn meaning from very small units.

Subword tokenization is the compromise:

| Level | Strength | Weakness |
|---|---|---|
| Word-level | intuitive units | huge vocabulary, many rare/unknown words |
| Character-level | no unknown words | long sequences, weak semantic units |
| Subword-level | handles rare words with reusable pieces | can fragment terms in strange ways |

This is why most Transformer models use subwords.

## 4. BPE, WordPiece, and SentencePiece

The three names that appear again and again are BPE, WordPiece, and SentencePiece.

| Method | Intuition | Common association |
|---|---|---|
| BPE | repeatedly merge frequent symbol pairs | GPT-style and many modern tokenizers |
| WordPiece | choose pieces that improve likelihood of training data | BERT-style tokenizers |
| SentencePiece | train directly on raw text, including spaces | multilingual and text-to-text models such as T5-style systems |

I do not need to memorize every implementation detail for an interview. What matters is understanding the trade-off:

> Subword tokenizers reduce vocabulary size by representing rare words as combinations of common pieces.

That trade-off is powerful, but it is not free.

## 5. A concrete subword example

Here is the kind of table I would use when debugging a multilingual/domain model:

| Term | Possible useful split | Risky split | Why it matters |
|---|---|---|---|
| wellbore integrity | wellbore / integrity | well / bore / in / tegrity | technical meaning may become diluted |
| decommissioning | de / commission / ing | d / eco / mm / ission / ing | longer sequence, harder alignment |
| petroleumstilsynet | petroleum / tilsynet | pet / role / um / stil / syn / et | Norwegian compound may be poorly represented |
| blowout preventer | blowout / preventer | blow / out / pre / vent / er | term-level consistency may suffer |

These are illustrative examples, not outputs from one fixed tokenizer. In real work, I would inspect the exact tokenizer used by the model.

## 6. Hugging Face demo

The fastest way to make tokenization visible is to inspect tokens directly.

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

What I would look for:

- Does a domain term become many small fragments?
- Does the Norwegian example become much longer than the English one?
- Are important terms represented consistently?
- Does tokenization create a truncation risk for long technical documents?

This tiny diagnostic is often more useful than staring at a final BLEU or COMET score.

## 7. Why tokenization matters for multilingual models

Multilingual tokenizers try to share a vocabulary across many languages. This can help transfer: related scripts, loanwords, names, and technical terms may share pieces.

But sharing is not equal coverage.

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">When sharing helps</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">
      Related languages, shared scripts, repeated technical terms, and enough pretraining data can make subword sharing useful.
    </p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">When sharing hurts</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">
      Low-resource languages, rich morphology, compounds, minority scripts, and domain terms can be over-fragmented.
    </p>
  </div>
</div>

For a high-resource language, a tokenizer may contain many meaningful pieces. For a lower-resource or domain-heavy setting, the same tokenizer may break important words into longer, less meaningful sequences.

That creates an evaluation question:

> Is the model worse because it lacks knowledge, or because the tokenizer gives it a poor representation of the input?

## 8. Why tokenization matters for domain MT

In domain machine translation, terminology is not decoration. If a model mistranslates a technical term, the output can become unusable even if the sentence is fluent.

For English--Norwegian petroleum MT, I would inspect tokenization before and after domain adaptation:

| Diagnostic | Question |
|---|---|
| token count | Are domain sentences much longer than general sentences? |
| term fragmentation | Are key terms split into many pieces? |
| language imbalance | Does Norwegian get more fragmented than English? |
| truncation | Do long technical documents exceed the model context window? |
| consistency | Are repeated terms segmented consistently? |

This connects directly to LoRA and PEFT. If the tokenizer fragments rare domain terms badly, an adapter may still improve translation style or terminology, but it is adapting on top of a limited input representation.

## 9. Common failure modes

| Failure mode | What it looks like | Why it matters |
|---|---|---|
| Over-fragmentation | one term becomes many tiny pieces | longer sequences and weaker term representation |
| Unknown or byte fallback artifacts | strange pieces for symbols or rare scripts | noisy representation |
| Inconsistent segmentation | related forms split differently | harder terminology consistency |
| Truncation | long documents cut off after tokenization | missing evidence or source text |
| Vocabulary bias | high-resource languages get cleaner pieces | multilingual performance gaps |

The practical habit is simple: when a multilingual or domain model fails, inspect tokenization early.

## 10. Interview answer

If an interviewer asks “What is tokenization in NLP?”, I would answer:

> Tokenization converts raw text into the units a model can process, usually tokens or subwords mapped to integer ids. Modern Transformer models often use subword tokenization because it balances vocabulary size and rare-word coverage. The trade-off is that important words, especially in low-resource or domain-specific settings, may be fragmented in ways that affect sequence length, representation quality, and evaluation.

If they ask “Why do subwords matter?”, I would add:

> Subwords let the model represent unseen or rare words using smaller learned pieces. This is useful for morphology and multilingual transfer, but I would always inspect whether important domain terms are split into meaningful pieces.

## 11. How I would use this in a project

For a real project, I would add a small tokenizer audit before training:

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

Then I would inspect domain terms such as:

```python
terms = [
    "wellbore integrity",
    "blowout preventer",
    "decommissioning",
    "petroleumstilsynet",
    "subsea installation",
]
```

This is not glamorous, but it is exactly the kind of small diagnostic that makes an NLP project more credible.

## Takeaway

Tokenization is where language becomes model input. For multilingual and domain-specific NLP, it can shape everything that follows: sequence length, representation quality, term preservation, fine-tuning behavior, and evaluation.

Before I ask “does the model understand the term?”, I want to ask:

> How did the tokenizer show the term to the model?

## References and further reading

- [Hugging Face Course](https://huggingface.co/course)
- [Hugging Face tokenizer summary](https://huggingface.co/docs/transformers/v4.36.1/en/tokenizer_summary)
- [Hugging Face Transformers documentation](https://huggingface.co/docs/transformers)
- [Speech and Language Processing, Jurafsky & Martin](https://web.stanford.edu/~jurafsky/slp3/)
- [Stanford CS224N readings](https://web.stanford.edu/class/cs224n/readings/)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909)
- [SentencePiece: A simple and language independent subword tokenizer and detokenizer](https://arxiv.org/abs/1808.06226)
