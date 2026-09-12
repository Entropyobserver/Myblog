---
title: '什么是 RAG？从检索到有证据依据的回答'
publishDate: 2026-09-12
updateDate: 2026-09-12
excerpt: '从文档、Chunk 和 Embedding，到检索、重排序、证据完整性、上下文增强与生成：系统理解 Retrieval-Augmented Generation 的完整基础流程。'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'Information Retrieval', 'Embeddings', 'LLM', 'Grounding', 'Foundations']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'what-is-rag-from-retrieval-to-grounded-answer'
translationHref: '/what-is-rag-from-retrieval-to-grounded-answer'
translationLabel: 'English'
---

## 1. 什么是 RAG？

<div class="my-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900 dark:bg-cyan-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">定义</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    RAG（Retrieval-Augmented Generation，检索增强生成）是一种把外部信息检索与语言模型生成结合起来的系统方法：先检索相关内容，再把内容加入模型的输入上下文，最后让模型依据这些内容生成答案。
  </p>
</div>

RAG 这个名称直接描述了它的三个核心阶段：

| 阶段             | 中文       | 它做什么                                     |
| ---------------- | ---------- | -------------------------------------------- |
| **Retrieval**    | 检索       | 根据用户问题，从外部知识源找到可能相关的信息 |
| **Augmentation** | 上下文增强 | 把检索结果与来源信息加入语言模型的输入上下文 |
| **Generation**   | 生成       | 让语言模型依据问题和检索上下文组织最终答案   |

把所有实现细节暂时拿掉，最小 RAG 流程只有：

```text
用户问题
   ↓
Retrieval：从外部知识源检索相关内容
   ↓
Augmentation：把检索内容加入模型上下文
   ↓
Generation：基于问题和上下文生成答案
```

这三个阶段构成 RAG 的概念核心。BM25、embedding、向量数据库、hybrid retrieval、reranker、知识图谱、query rewriting 和 retry 都是实现或增强这些阶段的可选技术，**并不是 RAG 定义本身**。

换句话说，普通语言模型主要依赖训练时写入参数的知识；RAG 则让模型在回答这一次问题时，临时读取外部知识。外部知识可以来自 PDF、网页、数据库、企业内部文档、搜索引擎或知识图谱，并不一定来自向量数据库。

### 用一个具体问题理解 RAG

假设你问一个语言模型：

> 2017 年，某家公司在安哥拉的三个区块占其挪威境外权益液体产量的比例是多少？

这是一个非常具体的问题。答案可能藏在一份 200 多页的年度报告里，位于某个表格的某一行。模型即使了解这家公司，也不一定记得这个数字，更无法保证指出正确的报告和页码。

RAG 提供了另一种方法：**先找到证据，把证据交给模型，再回答问题**。

![RAG 的检索、增强和生成流程](/images/blog/rag-three-steps-zh.svg)

### RAG 为什么有用？

大型语言模型通过训练学习了大量语言模式与知识，但这种知识存在几个限制：

- 训练结束后，模型不会自动知道新发生的事情；
- 模型无法天然访问一个组织的私有文档；
- 参数中的知识很难追溯到具体来源；
- 当模型不确定时，仍可能生成看似合理的内容；
- 重新训练或微调整个模型通常成本较高。

RAG 把“知识存在哪里”与“如何表达答案”分开：外部知识源保存可更新、可追溯的内容，语言模型负责理解这些内容并组织答案。连接两者的检索和上下文构造过程将在下一节展开。

因此，当文档更新时，我们通常只需要更新知识库和索引，而不需要重新训练语言模型。

![没有 RAG 与使用 RAG 的区别](/images/blog/rag-with-and-without-zh.svg)

需要注意：RAG **不能保证**模型永远正确。它只是让回答有机会建立在外部证据上。系统是否可靠，仍然取决于文档处理、检索、提示、生成和验证等多个环节。

## 2. RAG 不是一个模型，而是一套系统

“RAG 模型”是一种方便的说法，但 RAG 通常不是一个可以单独下载的模型。它是一种系统架构：知识源、索引、检索器、上下文构造器和生成模型相互配合，完成一次由外部知识支持的回答。

第 1 节的 Retrieval → Augmentation → Generation 是最小概念流程。实际系统为了让这三个阶段可靠运行，通常还会增加文档处理、索引、重排序和验证等组件。

下面不再单独背术语。我们沿着开头的年报问题，从左到右走一遍整套系统：

![从年报文档到有引用答案的 RAG 系统：离线知识准备与在线问答](/images/blog/rag-system-walkthrough-zh.svg)

### 怎样阅读这张图？

1. **①–⑤：先准备知识。** Corpus 是系统允许搜索的全部资料；其中每份年报都是一个 Document。解析程序从文档中提取段落、表格等 Evidence object，再把它们整理成适合检索的 Chunk。每个 Chunk 都带着年份、页码和内容类型等 Metadata，最后进入 Index。这个过程通常提前完成，不需要等用户提问。
2. **⑥：用户提出 Query。** 这里的 Query 不只是一个句子，也代表它背后的信息需求：2017 年、安哥拉、三个区块、权益液体产量占比。
3. **⑦：Retriever 找候选。** 它从 Index 中快速返回一组 Candidates。2016、2017 和 2018 年的相似表格都可能出现；此时它们只是“可能相关”，还不能都叫正确证据。
4. **⑧：Context builder 选择并组织证据。** 它可以过滤、重排序和去重，排除错误年份，留下正确的 2017 年表格，同时保留“第 33 页”等来源信息。最终交给语言模型的这部分内容叫 Context。把外部证据加入模型输入，就是 **Augmentation**。
5. **⑨：Generator 生成答案。** 语言模型同时读取 Query 和 Context，回答“36%”，并附上页码。它没有搜索整份年报；它只使用系统选给它看的内容。
6. **⑩：可选的验证环节。** 系统可以继续检查年份、数字和引用是否一致；如果证据不足，就重试检索或拒绝作答。

图中最容易混淆的五个对象，可以记成一条逐步收窄的链：

```text
Document → Chunk → Candidate → Context → Answer
原始来源     检索单元    可能相关结果    选定证据     最终输出
```

因此，**Candidate 不等于正确证据，Context 也不一定充分。** 如果文档解析时漏掉一张表格，它就不会成为 Chunk，也不会进入 Index；Retriever 找不到它，Generator 最终也看不到它。这正是为什么 RAG 的可靠性取决于整套系统，而不只取决于最后的语言模型。

## 3. Retrieval：先找到候选证据

Retrieval 的任务是：给定一个问题，从大量文档中找出最可能有用的若干证据。

例如，知识库可能包含：

```text
15 份年度报告
4,369 个 PDF 页面
数万个段落、标题与表格对象
```

系统不可能把所有内容一次性交给语言模型。Retriever 会返回排名最高的前 (k) 个结果，通常写作 **Top-k**。

常见检索方法包括：

- **关键词检索**：根据词语是否出现以及出现频率排序，例如 BM25；
- **Dense retrieval**：把问题和文档表示成向量，按照语义相似性搜索；
- **Hybrid retrieval**：组合关键词检索与向量检索；
- **Metadata filtering**：根据年份、文档、语言或对象类型缩小搜索范围；
- **Graph retrieval**：沿实体、指标、页面或其他关系寻找相关证据。

第一篇只需要记住：**Retriever 不负责写最终答案，它负责选择模型随后能够看到什么。**

对于开头的年报问题，有用的候选应同时匹配 **2017 年**、**安哥拉**、**三个区块**和题目要求的**产量指标**。只满足其中一部分条件的内容可能看起来相关，却不能真正回答问题。

### 文本怎样变得“可搜索”？

关键词检索通常建立 **inverted index（倒排索引）**：从每个词反向记录它出现在哪些文档中。BM25 再结合词频、词的稀有程度和文档长度计算排名。

Dense retrieval 则先通过 embedding model 得到向量：

```text
query q → vector e(q)
chunk d → vector e(d)
```

然后用 cosine similarity 或 dot product 等函数计算相似度。例如余弦相似度为：

$$
\operatorname{cos}(q,d)=\frac{\mathbf{e}(q)\cdot\mathbf{e}(d)}{\lVert\mathbf{e}(q)\rVert_2\,\lVert\mathbf{e}(d)\rVert_2}
$$

分数越高，表示模型认为两者在表示空间中越接近。但“向量接近”只是模型学习到的相似性，不等于事实正确、年份正确或证据充分。

例如，一张关于 2016 年安哥拉液体产量的表格，可能在 embedding space 中与问题非常接近。但对于询问 2017 年的问题，它仍然是错误证据。这一差别会贯穿整个系列：

> **Semantic relevance 不等于 evidence correctness。**

### Retrieval 与 reranking 为什么分成两步？

第一阶段必须在成千上万个 chunks 中快速产生候选。第二阶段 reranker 只处理较小的候选集，可以让 query 与每个候选进行更充分的联合比较：

```text
41,736 chunks
  → fast retriever
  → Top-50 candidates
  → stronger reranker
  → final Top-5 context
```

因此，retrieval 是 **candidate generation**，reranking 是 **candidate refinement**。Reranker 可以改善顺序，但无法找回第一阶段完全没有召回的证据。

在这个贯穿全文的例子中，候选集可能同时包含 2016、2017 和 2018 年的相似产量表。Reranker 的任务，是把年份和指标都正确的表格排在那些“只是看起来相似”的结果前面。

## 4. Augmentation：把证据放进上下文

找到候选证据后，系统会把用户问题、检索结果和回答要求组合成一个增强提示。简化后可能是：

```text
请只依据以下证据回答问题。
如果证据不足，请明确说明无法回答。
回答时提供来源编号。

问题：……

证据 1：[报告、页码、正文]
证据 2：[报告、页码、表格]
```

Augmentation 不只是把文字机械地粘贴在一起。实际系统还需要决定：

- 放入多少条证据；
- 是否保留报告名称、年份、页码和标题；
- 如何避免上下文超过模型长度限制；
- 如何处理相互冲突的证据；
- 是否要求模型引用来源或在证据不足时拒答。

这一步连接了 information retrieval 与 language generation。

对于开头的问题，有效的 context 不应只保留表格里的数字，还应保留报告年份、页码、区块名称、指标定义和单位。否则，Generator 可能看到了一个数字，却无法判断它是不是题目真正询问的数字。

## 5. Generation：依据上下文组织答案

Generator 通常是一个语言模型。它读取问题和检索上下文，然后生成答案。

理想情况下，生成器应该做到三件事：

1. 回答用户真正提出的问题；
2. 只使用检索证据能够支持的结论；
3. 保留能够检查的引用或来源。

例如：

> 这三个区块在 2017 年贡献了 36% 的挪威境外权益液体产量（2017 年年报，第 33 页）。

到这里，文章开头的问题才真正闭环：Generator 把选中的证据组织成直接答案，同时保留一条可以检查的证据路径。

但生成模型不能修复所有上游错误。如果 Retriever 找到了 2016 年的相似表格，模型可能基于错误年份给出一个语法完全正确的答案。

![不同证据质量会产生不同答案结果](/images/blog/rag-evidence-quality-zh.svg)

这也是理解 RAG 最重要的一点：

> **Generation 的表现受到 retrieved evidence 的约束。检索不到正确证据，生成器通常也无法可靠回答。**

## 6. RAG 的离线阶段与在线阶段

初学者经常只看到“提问—检索—回答”，但完整系统还包括提问之前的文档准备。

![RAG 的离线准备与在线问答阶段](/images/blog/rag-two-phases-zh.svg)

### 离线准备

离线阶段通常在文档加入或更新时运行：

1. 读取 PDF、网页或数据库；
2. 提取文字、表格、图片和布局；
3. 将内容切分成可检索单元；
4. 保存文档、页码、标题等 metadata；
5. 计算词项统计或 embeddings；
6. 建立搜索索引。

### 在线问答

在线阶段在每次用户提问时运行：

1. 理解或改写查询；
2. 从索引中检索候选证据；
3. 过滤、融合或重新排序结果；
4. 构造增强提示；
5. 生成答案；
6. 返回引用，必要时验证或拒答。

离线阶段决定系统“能够搜索什么”，在线阶段决定系统“这一次实际找到了什么”。两者中的任何错误都会传递到最终答案。

## 7. 如何评价一个 RAG 系统？

只看最终答案，会隐藏错误发生在哪一层。更清楚的做法是分别评价三层。

![RAG 的检索、证据和答案三层评估](/images/blog/rag-three-level-evaluation.svg)

### Retrieval quality

- **Precision@k**：Top-k 中有多少比例是相关结果；
- **Recall@k**：全部已知相关证据中，有多少进入 Top-k；
- **MRR**：第一个相关结果出现得有多靠前；
- **nDCG**：考虑不同相关程度和排名位置的总体质量。

若问题需要的 gold evidence 集合为 $G_q$，Top-k 结果为 $R_q^k$，则：

$$
\operatorname{Recall@k}(q)=\frac{|G_q\cap R_q^k|}{|G_q|}
$$

### Evidence quality

普通 Recall@k 仍可能掩盖 multi-hop failure。一个问题需要 A、B、C 三项证据，只找到 A 和 B 时，object recall 是 $2/3$，但问题仍无法被完整回答。因此还要区分：

- **Any-evidence hit**：至少找到一个必要证据；
- **Complete-evidence hit**：所有必要证据都进入 Top-k；
- 报告、年份、页面和对象是否正确；
- 引用是否真的支持对应结论。

### Answer quality

最后才评价 correctness、relevance、faithfulness、groundedness 和 citation correctness。一个答案可能因模型记忆而偶然正确，却引用了错误页面；也可能检索完全正确，但生成器算错数字。两者需要分别诊断。

对于贯穿全文的例子，现在可以分别提出三个评价问题：

1. **Retrieval**：系统是否找到了正确的 2017 年报告和表格，而不是其他年份的相似表格？
2. **Evidence**：计算该占比所需的行或事实是否全部找到，并且页码与 metadata 是否正确？
3. **Answer**：Generator 是否得到 36%，正确理解了表格，并引用了第 33 页？

这就是从 **relevant** 到 **correct**、**sufficient**、**complete**，最后到 **grounded** 的递进关系。

## 8. RAG、搜索和微调有什么区别？

这三个概念经常被混在一起。

| 方法 | 主要作用                     | 是否直接产生自然语言答案 | 知识更新方式     |
| ---- | ---------------------------- | ------------------------ | ---------------- |
| 搜索 | 找到相关文档或结果           | 通常不负责               | 更新索引         |
| RAG  | 检索证据并据此生成答案       | 是                       | 更新知识库和索引 |
| 微调 | 改变模型行为、风格或任务能力 | 取决于任务               | 重新训练模型参数 |

如果目标是让模型采用特定输出格式、语言风格或任务行为，微调可能更合适。如果目标是访问频繁变化、私有且需要引用的知识，RAG 往往更自然。

两者并不冲突：一个经过领域微调的模型，也可以在回答时使用 RAG。

## 9. 最常见的五个误解

### 误解一：RAG 就是向量数据库

向量检索只是可选组件之一。RAG 也可以使用 BM25、SQL、知识图谱、网页搜索，或者多个检索器的组合。

### 误解二：检索到相关内容就足够了

“相关”不等于“能够回答”。一个多部分问题可能需要两个表格和一个解释段落。系统找到其中一个，只能算部分成功。

### 误解三：有了 RAG 就不会产生幻觉

模型仍可能误读证据、忽略限定条件、组合错误年份，或者在证据不足时自行补充内容。

### 误解四：Chunk 越大越好

大 chunk 保留更多上下文，却可能混入噪声并消耗上下文窗口；小 chunk 更精确，却可能切断表格、标题和跨段关系。Chunking 是需要评估的设计选择。

### 误解五：只要最终答案正确，系统就是可靠的

答案偶然正确并不代表系统使用了正确证据。可靠评估还要检查报告、页码、evidence object、引用和多跳证据完整性。

## 10. RAG 会在哪里失败？

按数据流分类，常见失败包括：

| 层级         | 典型失败                         |
| ------------ | -------------------------------- |
| Ingestion    | 漏页、OCR 错误、表格结构丢失     |
| Chunking     | 证据被切断，标题与正文分离       |
| Retrieval    | 正确证据未进入候选集             |
| Ranking      | 正确证据被错误年份或相似段落压低 |
| Evidence     | 只找到多跳问题的部分证据         |
| Augmentation | 上下文过长、重复或相互冲突       |
| Generation   | 误读数字、超出证据、引用错误     |
| Verification | 没有发现证据不足或答案冲突       |

这也是为什么“换一个更大的 LLM”通常不能解决所有 RAG 问题：很多错误发生在模型看到上下文之前。

## 11. 一个最小 RAG 系统

把复杂框架暂时放在一边，最小 RAG 系统只需要：

```text
文档集合
  → 切分与索引
  → 用户问题
  → 检索 Top-k
  → 问题 + 检索内容
  → 语言模型
  → 答案
```

真正的研究问题出现在我们继续追问时：

- 文档应该怎样切分？
- 表格和页码怎样保留？
- BM25 和向量检索各自会错在哪里？
- 怎样判断 Top-k 是否找全了必要证据？
- 第一次检索失败后，系统应该重试还是拒答？

这些问题会把一个简单 RAG demo 逐步变成一个可以评估的研究系统。

## 12. 通向 FinRAG

在普通网页或短段落中，RAG 已经可能遇到检索失败。在跨越 15 年的企业年报中，问题会更加明显：不同年份反复出现相同实体和指标，答案可能位于表格中，也可能需要组合多个页面的证据。

我的 [FinRAG 项目](/zh/building-finrag-evidence-grounded-retrieval-for-annual-reports)正是从这里开始：它不只问“系统是否检索到相关文字”，而是进一步检查系统是否找到了**正确报告、正确页面和回答问题所需的完整证据**。

下一篇将讨论：**一份 PDF 如何被转换成可以检索、可以引用、也可以审计的 evidence objects？**

## 延伸阅读

- [Microsoft Learn：检索增强生成基础概念](https://learn.microsoft.com/zh-cn/training/modules/rag-fundamentals/)
- [Lewis et al. (2020)：Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [Microsoft Learn：RAG 和索引](https://learn.microsoft.com/zh-cn/azure/foundry/concepts/retrieval-augmented-generation)
