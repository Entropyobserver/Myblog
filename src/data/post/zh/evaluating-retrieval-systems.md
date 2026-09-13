---
title: '如何评价一个检索系统？Precision、Recall、MRR、nDCG 与证据完整性'
publishDate: 2026-09-12T12:00:00+02:00
updateDate: 2026-09-13
excerpt: '用三层诊断框架理解 RAG 评价：检索是否找对，证据是否正确、充分且完整，答案是否忠实并引用有效来源。'
category: 'Retrieval & Knowledge Systems'
track: 'Foundations'
tags: ['RAG', 'Information Retrieval', 'Evaluation', 'Recall', 'nDCG']
language: 'zh'
author: 'Xiaojing Yang'
translationKey: 'evaluating-retrieval-systems'
translationHref: '/evaluating-retrieval-systems'
translationLabel: 'English'
series: 'RAG 基础'
seriesOrder: 5
seriesTotal: 6
seriesHref: '/zh/series/rag-foundations'
---

<div class="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">
    评价 RAG 不能只看最终答案。先检查系统有没有找到正确内容，再检查证据是否足以回答问题，最后检查答案是否正确并忠实使用了这些证据。
  </p>
</div>

[上一篇](/zh/hybrid-retrieval-and-reranking)建立了一条从候选检索到重排序的 pipeline。这一篇解决下一个问题：**怎样知道它究竟在哪一步做对了或做错了？**

只看最终答案，会把完全不同的失败混在一起：系统可能检索错了，也可能证据找对了但计算错了，甚至可能没有正确证据却凭模型记忆蒙对答案。

![RAG 的检索、证据和答案三层评价](/images/blog/rag-three-level-evaluation-zh.svg)

## 1. 三层评价分别检查什么？

| 层级                  | 核心问题                                             |
| --------------------- | ---------------------------------------------------- |
| **Retrieval quality** | 所需内容是否进入 Top-k，并且重要结果是否排在前面？   |
| **Evidence quality**  | 找到的内容是否正确、充分、完整，而且能够追溯到来源？ |
| **Answer quality**    | 最终答案是否正确、忠实于证据，并提供了有效引用？     |

这三层前后相连，但不能相互替代。Retrieval 找到的是候选；Evidence 检查候选是否真的能支撑答案；Answer 才检查模型最终写出的内容。

## 2. 评价之前，先定义“一个结果”

选择 metric 之前，要先决定一个可检索 item 是什么：

- 一份 document；
- 一个 page；
- 一个 paragraph 或 chunk；
- 一张 table；
- 一行、一个 cell 或 evidence object。

系统可能找到了正确 document，却返回错误 page；也可能找到了正确 page，却漏掉其中真正需要的 table。Document-level success 因而可能掩盖 evidence-level failure。

评价单位必须与真实任务一致。如果 Generator 实际接收的是 chunks，检索评价也应该至少落到 chunk 或 evidence-object 层，而不能只报告 document hit。

### Query、Gold Evidence 与 Top-k

对于每个 query $q$，定义已知相关证据集合 $G_q$，通常称为 **gold evidence** 或 qrels。令 $R_q^k$ 表示系统返回的前 $k$ 个结果。

![Query、Gold Evidence、排序结果与评价截断位置](/images/blog/retrieval-evaluation-setup-zh.svg)

Gold evidence 也不一定完美。标注者可能遗漏有效替代证据、对粒度意见不同，或者把只能回答部分问题的内容标为相关。因此要记录标注规则和一致性；如果一个问题存在多条有效证据路径，也应在评价中允许这些替代路径。

## 3. Retrieval quality：有没有找到并排好？

四个常见指标回答四个不同问题。

### Precision@k：返回结果有多干净？

Precision@k 表示 Top-k 中有多少比例属于相关结果：

$$
\operatorname{Precision@k}(q)=\frac{|G_q\cap R_q^k|}{|R_q^k|}
$$

如果系统固定返回 $k$ 个结果，分母也可以直接写成 $k$。Top-5 中有 3 个相关结果时，Precision@5 为 $3/5=0.6$。

> 翻译成人话：系统找出来的内容里，有多少真正有用？

Precision 较低意味着大量噪声会占用 context window，并可能干扰 Generator。

### Recall@k：应该找到的内容找全了吗？

Recall@k 表示已知相关证据中有多少进入了前 $k$ 个结果：

$$
\operatorname{Recall@k}(q)=\frac{|G_q\cap R_q^k|}{|G_q|}
$$

如果一个 query 有 4 项 gold evidence，Top-10 找到其中 3 项，Recall@10 为 $3/4=0.75$。

> 翻译成人话：所有应该找到的内容，系统实际找到了多少？

Candidate retrieval 通常优先关注 Recall，因为 Reranker 无法找回第一阶段完全没有召回的证据。增大 $k$ 往往提高 Recall，但也会增加重排序成本与上下文噪声。

### MRR：第一个有用结果出现得多早？

Reciprocal Rank 使用第一个 relevant result 的位置：

$$
\operatorname{RR}(q)=\frac{1}{\operatorname{rank}_{\text{first relevant}}}
$$

如果第一个相关结果排第 4，RR 就是 $1/4$。**Mean Reciprocal Rank（MRR）**是在全部 queries 上对 RR 取平均。

> 翻译成人话：用户要看到第几个结果，才会遇到第一条真正有用的内容？

MRR 适合“找到一个好结果就够了”的任务。它忽略第二个及之后的相关结果，因此不能单独评价 multi-evidence question。

### nDCG@k：高价值结果是否排在前面？

有些结果比另一些更有用。一张完整表格可能比只提到主题的段落更有价值。**Discounted Cumulative Gain（DCG）**奖励排名靠前的高等级相关结果：

$$
\operatorname{DCG@k}=\sum_{i=1}^{k}\frac{2^{rel_i}-1}{\log_2(i+1)}
$$

**nDCG@k** 再除以这个 query 能达到的理想排序分数：

$$
\operatorname{nDCG@k}=\frac{\operatorname{DCG@k}}{\operatorname{IDCG@k}}
$$

> 翻译成人话：最有用的证据是否排在最容易被系统使用的位置？

nDCG 最适合具有多级相关性标注的任务。只有“相关/不相关”二元标注时，它仍然能够评价排序位置，只是不能区分“部分有用”和“高度有用”。

![Precision、Recall、MRR 与 nDCG 关注不同性质](/images/blog/retrieval-metrics-compare-zh.svg)

| 指标        | 主要检查什么             | 容易忽略什么               |
| ----------- | ------------------------ | -------------------------- |
| Precision@k | 返回结果中有多少是相关的 | 是否找全全部必要证据       |
| Recall@k    | 标准证据被找到了多少     | 相关结果是否排在前面       |
| MRR         | 第一个相关结果出现得多早 | 第二、第三项证据是否出现   |
| nDCG@k      | 高价值结果是否排在前面   | 证据组合后是否足以回答问题 |

## 4. Evidence quality：找到的内容够不够用？

Retrieval metrics 评价排序结果，但“主题相关”不等于“能够回答”。Evidence quality 需要进一步检查四件事：

- **Correctness**：是不是正确的报告、年份、实体、指标、单位和页面？
- **Sufficiency**：现有证据是否足以推出答案？
- **Completeness**：问题要求的全部必要证据是否都被找到？
- **Provenance**：每项证据是否保留了可以核查的文档、页码和对象信息？

例如，2016 年与 2017 年的生产表格可能语义非常相似。2016 年表格与主题相关，却不是询问 2017 年问题的正确证据。因此：

> Semantic relevance 不等于 evidence correctness。

同样，一段文字可能正确描述了安哥拉的三个区块，却没有计算占比需要的数字。它是相关证据，但不充分。

## 5. 找到部分证据不等于找全证据

假设问题需要三项证据 A、B、C，系统找到 A 与 B，却漏掉 C：

- Object-level Recall 是 $2/3$；
- Any-evidence hit 是 1，因为至少找到一项；
- Complete-evidence hit 是 0，因为完整证据集没有出现；
- 这个问题仍然可能无法回答。

![部分证据与完整证据是不同结果](/images/blog/evidence-completeness-zh.svg)

对 query $q$，可以定义两个诊断指标：

$$
\operatorname{AnyEvidence@k}(q)=\mathbb{1}[G_q\cap R_q^k\neq\varnothing]
$$

$$
\operatorname{CompleteEvidence@k}(q)=\mathbb{1}[G_q\subseteq R_q^k]
$$

Any-evidence 只检查是否接触到了至少一项正确证据；Complete-evidence 则要求全部必要证据进入 Top-k。模型在证据不完整时可能偶然答对，但这只能算 answer correctness，不能说明答案是完整 grounded 的。

这两个指标是面向多证据任务的实用诊断，不是所有 benchmark 都采用的统一标准。如果存在多个能够回答问题的替代 evidence sets，只要完整找到其中一组，就可以判为成功。

## 6. Answer quality：最终答案可靠吗？

最后才评价 Generator 的输出：

- **Correctness**：数字、单位、年份、实体和计算是否正确？
- **Faithfulness / groundedness**：答案中的结论能否从提供给模型的 context 中推出？
- **Citation correctness**：每条引用是否真的支持它旁边的结论？
- **Citation completeness**：需要证据支持的重要结论是否都提供了引用？

Evidence quality 与 citation correctness 不能混为一谈。前者问“这份材料本身够不够格成为证据”，后者问“模型最终引用的材料是否支持它写出的具体结论”。证据完全正确时，模型仍然可能引错页。

## 7. 两种看起来相似、原因完全不同的错误

### 情况一：答案正确，但证据错误

模型凭参数记忆蒙对了答案，却引用了错误页面。此时 answer correctness 可以是 1，但 retrieval、groundedness 和 citation correctness 都失败了。

### 情况二：证据正确，但答案算错

Retriever 找到了正确表格，Context 也包含全部数字，但模型在除法、单位换算或百分比计算中出错。此时检索没有问题，应该修复 computation 或 generation，而不是继续更换 Retriever。

如果只看最终答案，这两种失败很难区分。三层评价能把“RAG 系统错了”转换成可以指导下一次实验的具体诊断。

## 8. 串起来看一个年报问题

问题是：

> 2017 年，某家公司在安哥拉的三个区块占其挪威境外权益液体产量的比例是多少？

| 层级      | 具体检查的问题                                                         |
| --------- | ---------------------------------------------------------------------- |
| Retrieval | 系统是否找到了正确的 2017 年报告和表格，而不是其他年份的相似表格？     |
| Evidence  | 计算所需的数字是否全部找到？年份、指标、单位、页码和对象信息是否正确？ |
| Answer    | 最终结果是否为 36%？答案是否忠实使用证据，而且引用确实指向第 33 页？   |

这三个结果应该分别记录。答案可能正确而证据路径错误，也可能证据完整而计算失败。

## 9. 一个最小评价报告

每个系统版本至少应该报告：

- corpus 与 query 数量；
- retrieval unit 和 Top-k cutoffs；
- Precision@k 与 Recall@k；
- 适用时的 MRR 或 nDCG；
- Any-evidence 与 Complete-evidence success；
- evidence correctness、sufficiency 与 provenance；
- answer correctness、groundedness 与 citation correctness；
- latency、uncertainty 和主要失败类型。

不要只报告跨 query 的平均值。还应检查 zero-recall queries，并按年份、问题类型、表格/文本和 hop 数分组。一个平均提升可能来自大量小幅改善，也可能只来自少数极端样本，这两种情况代表不同结论。

## 10. 一句话总结

> Retrieval quality 检查“有没有找到并排好”，Evidence quality 检查“证据是否正确、充分且完整”，Answer quality 检查“最终是否答对并忠实使用了证据”。

最好的 metric 不一定最复杂，而是最符合真实任务目标、并且能够指出系统下一步应该改哪里的 metric。

## 延伸阅读

- [TREC：使用 MRR 与 nDCG 的检索评价](https://trec.nist.gov/pubs/trec27/papers/Overview-CAR.pdf)
- [HotpotQA：用于 Multi-hop Evaluation 的 Supporting Facts](https://aclanthology.org/D18-1259/)
- [Introduction to Modern Information Retrieval：Retrieval Evaluation](https://sigir.hosting.acm.org/files/museum/introduction_to_modern_information_retrieval/chapter_5.pdf)

<div class="my-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-between">
  <a href="/zh/hybrid-retrieval-and-reranking">← 4. Hybrid Retrieval 与 Reranking</a>
  <a href="/zh/multi-hop-graphrag-and-agentic-rag">6. Multi-hop、GraphRAG 与 Agentic RAG →</a>
</div>
