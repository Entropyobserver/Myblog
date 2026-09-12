---
title: '文档如何进入 RAG？从 PDF 到可检索证据'
publishDate: 2026-09-12
excerpt: '用三张图理解 RAG 的文档准备：PDF 解析、布局与表格、evidence objects、chunking、metadata、embeddings 和索引。'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'PDF', 'Chunking', 'Metadata', 'Indexing']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'how-documents-enter-rag-pdf-chunk-metadata-index'
translationHref: '/how-documents-enter-rag-pdf-chunk-metadata-index'
translationLabel: 'English'
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    文档进入 RAG，不是简单地“复制 PDF 里的文字”，而是把内容、结构和来源转换成可搜索、可引用、可审计的证据单元。
  </p>
</div>

上一篇介绍了 [RAG 的基本流程](/zh/what-is-rag-from-retrieval-to-grounded-answer)：检索、增强和生成。但 Retriever 能找到什么，早在用户提问之前就被文档处理方式决定了。

如果 PDF 的阅读顺序错了、表格被压成乱码、标题与正文失去关系，后面的 embedding、reranking 和 LLM 都只能处理损坏的输入。

![从 PDF 到可检索证据的完整流程](/images/blog/document-to-rag-evidence.svg)

## 1. 为什么 PDF 不是天然的“文本”？

PDF 的主要目标是固定页面外观，而不是保存人类阅读时理解的逻辑结构。页面上看起来连续的一段内容，在文件内部可能只是许多带坐标的字符。

因此，PDF extraction 需要处理：

- **Reading order**：双栏页面应该先读左栏还是按横向坐标交替读取？
- **Headers and footers**：重复页眉、页脚和页码是否应该进入检索语料？
- **Tables**：单元格、行列标题和数值之间的关系如何保留？
- **Figures and captions**：图片标题属于哪张图？
- **Scanned pages**：页面没有文本层时是否需要 OCR？
- **Layout changes**：不同年份的报告模板可能完全不同。

一个看起来很小的 extraction error 会向下游传播。例如，表格标题与数值分离后，检索可能找到数字，却不知道数字代表哪个指标。

## 2. 从页面到 document objects

比“整页转成一个字符串”更稳健的方法，是把页面解析成带类型的对象：

```text
Page 33
├── heading_01
├── paragraph_01
├── table_candidate_01
└── footnote_01
```

每个对象至少应该保存：

- 文本或结构化内容；
- 对象类型；
- 所属文档和页面；
- 页面中的位置或阅读顺序；
- 与标题、caption 或其他对象的关系；
- extraction quality flags。

我把这类对象称为 **evidence objects**：它们不仅用于检索，也代表可以回到原始文档检查的证据。

## 3. Evidence object 与 chunk 有什么不同？

这两个概念经常被当作同一个东西。

- **Evidence object** 更强调来源与文档结构，例如一个段落、一张表或一个标题。
- **Chunk** 更强调模型和检索的输入长度，是为了索引或生成而构造的文本单元。

一个短段落可以直接成为一个 chunk。一个超长表格可能被分成多个 chunks；几个很短、共享同一标题的段落也可能被合并。关键是：chunk 即使经过拆分或合并，也应该能够映射回原始 evidence objects。

![小块、大块与结构感知切分的权衡](/images/blog/chunking-tradeoffs.svg)

## 4. Chunking 的核心权衡

### 小 chunks

优点是检索结果更集中、噪声较少，而且更节省生成上下文。缺点是容易切断定义、指代关系、表格标题或 multi-hop evidence。

### 大 chunks

优点是保留更多上下文。缺点是一个 chunk 可能同时包含多个主题，使 embedding 变得模糊，并把大量无关文本带入 LLM。

### 固定长度切分

按照字符数或 token 数切分，实现简单、速度快，但边界不理解文档结构。它可能从一句话中间断开，也可能把表头和表格内容分离。

### 结构感知切分

结构感知方法尽量沿标题、段落、列表、表格和页面对象的自然边界切分，并在必要时重复标题或表头。它更适合年报、论文和技术文档，但依赖更可靠的 layout extraction。

Chunk size 不是越大越好或越小越好。它是需要针对问题类型和评价指标验证的超参数。

## 5. Overlap 能解决所有边界问题吗？

Sliding-window chunking 会在相邻 chunks 之间保留重复 tokens。它能降低一句话刚好被边界切断的风险，但也会：

- 增加索引规模；
- 返回高度重复的结果；
- 让多个近乎相同的 chunks 占据 Top-k；
- 无法真正理解表格、标题或跨页关系。

Overlap 是一种局部补救，不是 document structure 的替代品。

## 6. Metadata 为什么重要？

Metadata 是描述内容来源与属性的结构化字段。例如：

```json
{
  "document_id": "equinor_2017_annual_report",
  "year": 2017,
  "page": 33,
  "object_id": "..._p033_table_candidate01",
  "object_type": "table",
  "section": "International production"
}
```

它有两个不同作用。

第一，**provenance**：答案可以显示报告、年份、页码，并回到原文验证。

第二，**retrieval signal**：如果问题明确说 2017 年，系统可以先过滤其他年份，再进行相关性排序。在跨年度年报中，这往往比单纯依赖语义相似度更可靠。

![Metadata 如何用于过滤、排序和引用](/images/blog/metadata-as-retrieval-signal.svg)

好的 metadata 应该来自可验证的文档信息。由 LLM 猜测产生的字段需要标记来源和置信度，不能悄悄当作事实。

## 7. 文本怎样变成索引？

处理好的 chunks 通常会进入一种或多种索引。

### Lexical index

记录词项出现在哪些文档中，并保存词频、文档频率等统计量。BM25 可以利用这些信息进行关键词排名。它对数字、罕见术语、公司名和精确表达很有价值。

### Vector index

Embedding model 把每个 chunk 映射成一个向量。查询也被映射到同一空间，然后系统寻找最近邻。它可以处理同义改写和语义相似，但也可能把不同年份的相似内容混在一起。

### Metadata index

保存可过滤字段，例如 year、document_id、language 和 object_type。它通常与 lexical 或 vector search 结合使用。

实际 RAG 系统经常同时保留这三类信号，而不是只建一个“向量数据库”。

## 8. 文档处理质量怎样评估？

只检查 pipeline 是否成功运行远远不够。至少应该抽样检查：

| 层级       | 检查问题                         |
| ---------- | -------------------------------- |
| 页面       | 是否漏页、重复或 OCR 失败？      |
| 阅读顺序   | 多栏文本是否按正确顺序排列？     |
| 对象       | 标题、段落、表格是否分类正确？   |
| 表格       | 行列关系、单位和表头是否保留？   |
| Chunk      | 是否在危险位置切断内容？         |
| Provenance | 每个结果能否回到正确文档和页码？ |

还应该保留失败标记，而不是悄悄删除难处理页面。否则最终 benchmark 可能只包含容易提取的内容，造成选择偏差。

## 9. 一个年报例子

假设问题询问 2017 年某项生产指标。一个可靠的准备过程是：

1. 将 2017 年年报登记为独立 document；
2. 解析目标页面的标题、正文和表格；
3. 把表格保存为带行列语义的 evidence object；
4. 为它分配稳定 object ID；
5. 附加 year=2017、page=33、object_type=table；
6. 为检索构造包含标题和表头的 chunk；
7. 同时建立 lexical、vector 与 metadata indexes。

这样，Retriever 找到结果时，系统不仅得到一段字符串，还知道它来自哪里、是什么类型，以及如何引用。

## 10. 通向下一篇与 FinRAG

文档准备完成后，下一个问题是：系统应该怎样搜索这些证据？关键词检索擅长精确术语和数字；向量检索擅长语义改写，但两者都会有不同的失败模式。

下一篇将比较 **BM25 与 dense retrieval**，并用跨年度年报解释为什么语义最相似的内容不一定是正确证据。

在 [FinRAG 项目](/zh/building-finrag-evidence-grounded-retrieval-for-annual-reports) 中，这个文档处理层把 15 份、4,369 页年报转换成 41,736 个可追溯 retrieval units，并通过独立页面抽样审计检查 extraction quality。

## 延伸阅读

- [Docling：Chunking concepts](https://docling-project.github.io/docling/concepts/chunking/)
- [Docling：Architecture](https://docling-project.github.io/docling/concepts/architecture/)
- [Docling Technical Report](https://arxiv.org/abs/2408.09869)
