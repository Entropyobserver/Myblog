---
title: '关键词检索与向量检索：BM25、Embedding 与 Dense Retrieval'
publishDate: 2026-09-12T10:00:00+02:00
excerpt: '用图理解倒排索引、BM25、embedding、dense retrieval，以及它们决定 RAG 能找到什么证据的不同方式。'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'Information Retrieval', 'BM25', 'Embeddings', 'Dense Retrieval']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'keyword-vs-vector-retrieval'
translationHref: '/keyword-vs-vector-retrieval'
translationLabel: 'English'
series: 'RAG 基础'
seriesOrder: 3
seriesTotal: 6
seriesHref: '/zh/series/rag-foundations'
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    关键词检索匹配词语，Dense Retrieval 匹配模型学习到的表示。两者都不等于“找到事实”，而是依据不同信号产生候选，因此也会以不同方式失败。
  </p>
</div>

[上一篇](/zh/how-documents-enter-rag-pdf-chunk-metadata-index)把文档转换成了可搜索的 chunks。接下来的问题是：用户提问后，系统怎样判断哪些 chunks 看起来相关？

![关键词检索与向量检索比较不同信号](/images/blog/lexical-vs-dense-retrieval-zh.svg)

## 1. Retrieval 是一个排序问题

给定 query (q)、chunk 集合 (D) 和截断位置 (k)，Retriever 返回一个有顺序的列表：

$$R_q^k = [d_1,d_2,\ldots,d_k]$$

系统并没有证明这些 chunks 是正确证据，只是计算分数并返回排名最高的 candidates。候选可能主题相关，却有错误的年份、实体、指标或单位。

## 2. 关键词检索与倒排索引

关键词检索通常从 **inverted index（倒排索引）**开始。它不只保存“文档包含哪些词”，还反向保存“每个词出现在哪些文档中”。

```text
angola     → chunk 17, chunk 84, chunk 203
production → chunk 12, chunk 84, chunk 611
2017       → chunk 84, chunk 91, chunk 430
```

查询时，系统可以快速定位包含目标词的 chunks。它特别适合名称、编号、数字、缩写、法律表达和罕见技术术语。

关键词检索并不只是“包含或不包含”。它还需要 ranking function 决定哪些结果排在前面。

## 3. BM25 在衡量什么？

BM25 是常用的 lexical ranking function。它的直觉比公式简单：

- query 中的词出现在 chunk 里，分数上升；
- 同一词重复出现有帮助，但收益逐渐饱和；
- 稀有词通常比常见词携带更多信息；
- 长 chunk 会被归一化，避免仅因包含更多词而获胜。

一种常见形式是：

$$
\operatorname{BM25}(q,d)=\sum_{t\in q}\operatorname{IDF}(t)
\frac{f(t,d)(k_1+1)}{f(t,d)+k_1\left(1-b+b\frac{|d|}{\operatorname{avgdl}}\right)}
$$

其中 (f(t,d)) 是词 (t) 在 chunk (d) 中的频率；(k_1) 控制词频饱和；(b) 控制文档长度归一化。不同实现的细节可能不同，因此 BM25 score 不是“正确概率”。

## 4. Dense Retrieval 与 Embedding

Dense retrieval 使用 embedding model，把 query 和 chunk 映射成向量：

```text
query q → e(q)
chunk d → e(d)
```

Chunk embeddings 通常提前计算并存入 vector index。查询时，系统用 cosine similarity、dot product 或其他距离函数寻找近邻。

$$
\cos(q,d)=\frac{e(q)\cdot e(d)}{\lVert e(q)\rVert_2\lVert e(d)\rVert_2}
$$

Dense retrieval 能连接同义改写。例如 query 使用 “income after expenses”，仍可能找到写着 “net profit” 的内容。

## 5. 为什么 Bi-encoder 能扩展到大语料？

Dense retrieval 常使用 **bi-encoder**：query 和每个 chunk 分别编码。Chunk vectors 可以重复使用，所以系统能够快速搜索大型向量索引。

代价是：第一阶段打分时，query 与 chunk 没有逐 token 交互，它们的关系被压缩进两个固定向量。这种方法很快，但容易忽略否定、精确年份、单位或“哪个实体拥有哪个数字”等细节。

## 6. 两种方法的失败模式互补

![关键词与向量检索的典型成功和失败情况](/images/blog/retrieval-signal-failures-zh.svg)

| 场景                  | 关键词 / BM25                    | Dense retrieval          |
| --------------------- | -------------------------------- | ------------------------ |
| 精确产品编码或报告 ID | 通常较强                         | 可能混淆相似编号         |
| 罕见公司名或区块名    | 通常较强                         | 取决于 embedding model   |
| 同义词或改写          | 可能漏检                         | 通常较强                 |
| 跨语言或不同表达      | 需要分析器或 query expansion     | 合适的多语言模型可以处理 |
| 句子很像但年份错误    | 精确年份能提供帮助               | 可能非常危险地相似       |
| 数字密集的表格        | 取决于 extraction 是否保留 token | 语义可能表示得不好       |

没有一种方法永远更好。目标问题、语料、语言和文档结构决定了哪种信号有用。

## 7. 一个年报例子

问题：“2017 年，安哥拉三个区块占挪威境外权益液体产量的比例是多少？”

- BM25 可能奖励 **2017**、**Angola** 和 **equity liquid production** 的精确匹配；
- Dense retrieval 可能找到使用另一种表达的正确表头；
- Dense retrieval 也可能把几乎相同的 2016 年表格排得很高；
- 如果 OCR 改坏了区块名，或者 query 使用同义词，BM25 可能漏掉正确行。

所以，**semantic similarity 不等于 evidence correctness**。Retrieval 只产生 candidates，后面仍需要 metadata 检查、融合、reranking 和 evaluation。

## 8. 应该索引什么内容？

Lexical search 需要保留有意义的 tokens、数字、表头和领域术语。Dense search 则需要为 embedding model 提供足够上下文，例如章节标题、表格标题、行名、单位和选择性的 metadata。

不要无条件把所有 metadata 拼进文本。应该通过实验判断它是在改善检索，还是让原本无关的 chunks 变得相似。

## 9. 怎样比较两种 Retriever？

使用相同的 queries、gold evidence、chunk collection 和 cutoff，比较 Recall@k 与排序指标，然后检查两者的 disagreement set：

1. 只有 BM25 找到的证据；
2. 只有 dense retrieval 找到的证据；
3. 错误年份或错误实体的近似结果；
4. 实际由 extraction 而非 retrieval 造成的失败。

这些差异会解释方法为什么有效，也自然引出下一步：融合互补的候选列表，再进行更精细的重排序。

## 延伸阅读

- [Elasticsearch：BM25 similarity](https://www.elastic.co/docs/reference/elasticsearch/index-settings/similarity)
- [Sentence Transformers：Semantic Search](https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html)
- [Sentence Transformers：Retrieve & Re-Rank](https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html)

<div class="my-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-between">
  <a href="/zh/how-documents-enter-rag-pdf-chunk-metadata-index">← 2. 文档如何进入 RAG</a>
  <a href="/zh/hybrid-retrieval-and-reranking">4. Hybrid Retrieval 与 Reranking →</a>
</div>
