import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'blog');

const assets = {
  'rag-with-and-without-zh.svg': {
    en: {
      '没有 RAG 与使用 RAG 的区别': 'Without RAG and with RAG',
      '没有 RAG 时模型主要依赖参数中的训练知识；使用 RAG 时，模型还能读取检索到的外部证据并提供引用。':
        'Without RAG, the model mainly relies on knowledge in its parameters. With RAG, it can also read external evidence and cite it.',
      'RAG 不会替换语言模型，而是给它增加外部证据':
        'RAG does not replace the language model; it adds external evidence',
      '没有 RAG': 'Without RAG',
      用户问题: 'User question',
      参数知识: 'Parametric knowledge',
      '知识可能过时、缺少私有数据，': 'Knowledge may be outdated or miss private data,',
      '也无法指出答案来自哪一页。': 'and cannot identify the supporting page.',
      '风险：流畅，但依据不可见': 'Risk: fluent, but evidence is hidden',
      训练知识写在模型参数中: 'Training knowledge is stored in model parameters',
      '使用 RAG': 'With RAG',
      检索器: 'Retriever',
      查找外部知识库: 'Search external knowledge',
      外部证据: 'External evidence',
      '报告 · 页码 · 表格': 'report · page · table',
      '问题 + 证据': 'question + evidence',
      答案可以引用并检查来源: 'The answer can cite a verifiable source',
      '外部知识可独立更新，无需重新训练 LLM': 'External knowledge can be updated without retraining the LLM',
    },
  },
  'rag-three-level-evaluation.svg': {
    en: {
      '不要只看最终答案 / Do not evaluate only the final answer': 'Do not evaluate only the final answer',
      候选与排序质量: 'Candidate and ranking quality',
      '正确对象是否进入 Top-k？': 'Did the correct object enter Top-k?',
      证据正确性与完整性: 'Evidence correctness and completeness',
      '回答所需证据是否找全？': 'Was all required evidence found?',
      最终回答质量: 'Final answer quality',
      '结论是否被证据支持？': 'Is the conclusion supported by evidence?',
    },
    zh: {
      'Three levels of RAG evaluation': 'RAG 评价的三个层级',
      'RAG evaluation separates retrieval ranking, evidence correctness and completeness, and generated answer quality.':
        'RAG 评价需要分别检查检索排序、证据正确性与完整性，以及最终答案质量。',
      '不要只看最终答案 / Do not evaluate only the final answer': '不要只看最终答案',
      'A correct answer can hide wrong evidence; a wrong answer can start with successful retrieval.':
        '答案正确可能掩盖错误证据；答案错误也可能始于一次成功的检索。',
      '1 · Retrieval quality': '1 · 检索质量',
      候选与排序质量: '候选与排序质量',
      'correct report · page · object': '正确报告 · 页码 · 对象',
      'any evidence vs all evidence': '部分证据与完整证据',
      '2 · Evidence quality': '2 · 证据质量',
      证据正确性与完整性: '证据正确性与完整性',
      '3 · Answer quality': '3 · 答案质量',
      最终回答质量: '最终回答质量',
      'correctness · relevance': '正确性 · 相关性',
      'faithfulness · citation': '忠实性 · 引用',
      'Answer correctness ≠ retrieval correctness ≠ evidence completeness': '答案正确 ≠ 检索正确 ≠ 证据完整',
    },
  },
  'document-to-rag-evidence.svg': {
    en: {
      'PDF 不是文本文件 / A PDF is not plain text': 'A PDF is not plain text',
      '原始 PDF': 'Raw PDF',
      '解析 / Parse': 'Parse structure',
      证据对象: 'Evidence objects',
      切分与上下文: 'Chunk and contextualise',
      表示与索引: 'Represent and index',
      '每个结果必须能回到来源 / Every hit must return to its source': 'Every hit must return to its source',
    },
    zh: {
      'From document to retrievable evidence': '从文档到可检索证据',
      'A PDF is parsed into layout objects, enriched with metadata, chunked, represented, and indexed.':
        'PDF 经过结构解析、元数据补充、切分、表示和索引，最终成为可检索证据。',
      'PDF 不是文本文件 / A PDF is not plain text': 'PDF 不是纯文本文件',
      'The pipeline must preserve content, structure, and provenance before search begins.':
        '搜索开始前，处理流程必须保留内容、结构和来源。',
      'Raw document': '原始文档',
      '解析 / Parse': '解析结构',
      'Reading order': '阅读顺序',
      'Tables &amp; figures': '表格与图片',
      'Headers &amp; footers': '页眉与页脚',
      'Evidence objects': '可追溯内容单元',
      Heading: '标题',
      Paragraph: '段落',
      Table: '表格',
      切分与上下文: '切分并补充上下文',
      'Chunk &amp; contextualise': '构造检索单元',
      'Token limits': '长度限制',
      'Headings + captions': '标题 + 图表说明',
      表示与索引: '表示与索引',
      'Represent &amp; index': '建立搜索入口',
      'Lexical terms': '关键词表示',
      Embeddings: '向量表示',
      '每个结果必须能回到来源 / Every hit must return to its source': '每个检索结果都必须能回到来源',
    },
  },
  'chunking-tradeoffs.svg': {
    en: {
      'Chunking 是证据边界设计 / Chunking designs evidence boundaries': 'Chunking designs evidence boundaries',
      '小块 / Small chunks': 'Small chunks',
      '✓ 精确、噪声少 / precise': '✓ Precise, less noise',
      '△ 容易切断上下文和表格': '△ May split context and tables',
      '大块 / Large chunks': 'Large chunks',
      '✓ 保留较多上下文 / more context': '✓ Preserves more context',
      '△ 噪声多、成本高 / noisy, costly': '△ More noise and cost',
      '结构感知 / Structure-aware': 'Structure-aware chunks',
      '✓ 保留语义与文档结构': '✓ Preserves semantic boundaries',
      'Chunk 是检索单元；evidence object 是可追溯的原始证据。二者可以重叠，但不必相同。':
        'A chunk is a retrieval unit; an evidence object is traceable source evidence. They may overlap, but need not be identical.',
    },
    zh: {
      'Chunking trade-offs': '文档切分的核心权衡',
      'Small, large, and structure-aware chunks trade precision, context, and document integrity differently.':
        '小块、大块和结构感知切分对精确性、上下文与文档完整性有不同影响。',
      'Chunking 是证据边界设计 / Chunking designs evidence boundaries': 'Chunking 是在设计证据边界',
      'There is no universally best chunk size: the right unit depends on the document and the question.':
        '不存在通用的最佳长度：合适的检索单元取决于文档结构和问题类型。',
      '小块 / Small chunks': '小块',
      '✓ 精确、噪声少 / precise': '✓ 精确、噪声少',
      'may break context and tables': '边界可能破坏内容结构',
      '大块 / Large chunks': '大块',
      '✓ 保留较多上下文 / more context': '✓ 保留较多上下文',
      '△ 噪声多、成本高 / noisy, costly': '△ 噪声多、成本高',
      '结构感知 / Structure-aware': '结构感知切分',
      'Section heading': '章节标题',
      'Paragraph + heading context': '段落 + 标题上下文',
      'Table + repeated header': '表格 + 重复表头',
      'preserves semantic boundaries': '保留语义边界',
    },
  },
  'metadata-as-retrieval-signal.svg': {
    en: {
      'Metadata 不只是标签，它也可以缩小搜索空间': 'Metadata can narrow the search space',
      'Query clues / 问题线索': 'Query constraints',
      'Longitudinal corpus / 跨年度语料': 'Longitudinal corpus',
      排序后的证据: 'Selected evidence',
      '可检索，也可引用': 'Searchable and citable',
      '先用 metadata 排除不可能的结果，再用相关性模型排序剩余候选。':
        'Use metadata to remove impossible results, then rank the remaining candidates by relevance.',
    },
    zh: {
      'Metadata as retrieval signal': 'Metadata 也是检索信号',
      'A query uses year, document, and object-type metadata to filter a corpus before ranking evidence.':
        '系统先用年份、文档和对象类型过滤语料，再对证据进行相关性排序。',
      'Metadata 不只是标签，它也可以缩小搜索空间': 'Metadata 不只是标签，也可以缩小搜索空间',
      'Metadata is both provenance for citation and a retrieval signal for filtering.':
        'Metadata 既记录引用来源，也能作为过滤条件。',
      'Query clues / 问题线索': '问题中的约束',
      'document = annual report': '文档 = 年报',
      'object = table': '对象 = 表格',
      'Longitudinal corpus / 跨年度语料': '跨年度语料',
      '2016 table': '2016 年表格',
      '2017 paragraph': '2017 年段落',
      '2017 table ✓': '2017 年表格 ✓',
      'Ranked evidence': '筛选并排序',
      '可检索，也可引用': '既可检索，也可引用',
    },
  },
  'lexical-vs-dense-retrieval.svg': {
    zh: {
      'Lexical retrieval compared with dense retrieval': '关键词检索与向量检索',
      'The same query follows an exact-term path through an inverted index and a semantic path through embeddings.':
        '同一个查询可以沿倒排索引匹配精确词项，也可以通过向量表示匹配语义。',
      'Two signals, two candidate lists': '两种信号，两份候选列表',
      QUERY: '查询',
      '2017 Angola liquid production share': '2017 年安哥拉液体产量占比',
      'Keyword / BM25': '关键词检索 / BM25',
      'Exact terms and corpus statistics': '精确词项与语料统计',
      'term → posting list': '词项 → 倒排列表',
      'Strong: names · numbers · identifiers': '优势：名称 · 数字 · 标识符',
      'Weak: synonyms · paraphrases': '弱点：同义表达 · 改写',
      'Dense retrieval': '向量检索',
      'Learned semantic representations': '学习得到的语义表示',
      'Strong: meaning · reformulation': '优势：语义 · 改写',
      'Weak: exact years · fine distinctions': '弱点：精确年份 · 细微差异',
      'Both return candidates — neither proves correctness': '两者返回的都只是候选，不能直接证明证据正确',
    },
  },
  'retrieval-signal-failures.svg': {
    zh: {
      'Complementary retrieval failure modes': '互补的检索成功与失败模式',
      'Keyword and dense retrieval succeed on different query patterns and can both retrieve wrong evidence.':
        '关键词检索和向量检索擅长不同类型的查询，也都可能返回错误证据。',
      'Same corpus, different strengths': '同一语料，不同优势',
      Dense: '向量检索',
      'Exact ID: BLOCK-17A': '精确编号：BLOCK-17A',
      'Paraphrase: “net profit”': '改写表达：“净利润”',
      'Near-copy, wrong year': '内容近似，但年份错误',
      'Damaged OCR token': 'OCR 导致词项损坏',
      '✓ exact match': '✓ 精确匹配',
      '△ may blur': '△ 可能混淆',
      '✕ no overlap': '✕ 没有词项重合',
      '✓ semantic match': '✓ 语义匹配',
      '△ year can help': '△ 年份可能有帮助',
      '✕ dangerously close': '✕ 相似但危险',
      '✕ token missing': '✕ 词项缺失',
      '△ may recover': '△ 可能恢复',
    },
  },
  'hybrid-retrieval-rrf.svg': {
    zh: {
      'Hybrid retrieval with reciprocal rank fusion': '使用倒数排名融合的混合检索',
      'BM25 and dense rankings are combined by RRF into one deduplicated candidate list.':
        'RRF 将 BM25 与向量检索排名融合为一份去重后的候选列表。',
      'Hybrid retrieval: combine ranks, preserve evidence': 'Hybrid Retrieval：融合排名，保留证据',
      'BM25 ranking': 'BM25 排名',
      '1  2017 table': '1  2017 年表格',
      '2  Angola note': '2  安哥拉说明',
      '3  2016 table': '3  2016 年表格',
      '4  Block glossary': '4  区块术语表',
      'Dense ranking': '向量检索排名',
      '1  2016 table': '1  2016 年表格',
      '2  2017 table': '2  2017 年表格',
      '3  Production summary': '3  产量摘要',
      '4  Angola note': '4  安哥拉说明',
      '+ dedupe': '+ 去重',
      Fused: '融合结果',
      '2  2016 table': '2  2016 年表格',
      '3  Angola note': '3  安哥拉说明',
      '4  Summary': '4  摘要',
      'Fusion improves candidate coverage; it does not verify the year': '融合提高候选覆盖率，但不会自动核验年份',
    },
  },
  'retrieve-rerank-funnel.svg': {
    zh: {
      'Retrieve and rerank funnel': '检索与重排序漏斗',
      'A fast retriever reduces a large corpus to candidates, then a cross-encoder produces a smaller ranked context.':
        '快速检索器先从大规模语料生成候选，Cross-Encoder 再得到更小的排序上下文。',
      'Fast coverage first, careful comparison second': '先快速覆盖，再仔细比较',
      'Corpus · 1,000,000 chunks': '语料库 · 1,000,000 个 chunks',
      'BM25 / bi-encoder / hybrid search': 'BM25 / 双编码器 / 混合检索',
      '100 candidates': '100 个候选',
      'Cross-encoder: [query ; candidate]': 'Cross-Encoder：[查询；候选]',
      'Top-5 context': 'Top-5 上下文',
      'selected evidence': '选定证据',
      'Higher cost': '成本更高',
      'Higher precision': '精确率更高',
    },
  },
  'retrieval-evaluation-setup.svg': {
    zh: {
      'Retrieval evaluation setup': '检索评价的基本设置',
      'A query has known gold evidence and a ranked result list evaluated at a cutoff.':
        '一个查询对应已知的标准证据，并在指定截断位置评价排序结果。',
      'Evaluation compares rankings with evidence judgments': '评价就是比较检索排名与证据标注',
      QUERY: '查询',
      'Gold evidence Gq': '标准证据 Gq',
      'known relevant items': '已知相关对象',
      'Ranked results Rq': '排序结果 Rq',
      '1 · A · relevant': '1 · A · 相关',
      '2 · B · not relevant': '2 · B · 不相关',
      '3 · C · relevant': '3 · C · 相关',
      '4 · D · not relevant': '4 · D · 不相关',
      '5 · E · relevant': '5 · E · 相关',
      'cutoff k=4': '截断位置 k=4',
    },
  },
  'retrieval-metrics-compare.svg': {
    zh: {
      'Comparison of common retrieval metrics': '常见检索指标对比',
      'Precision, recall, MRR, and nDCG focus on noise, coverage, first relevant rank, and graded ranking quality.':
        'Precision、Recall、MRR 和 nDCG 分别关注噪声、覆盖率、首个相关结果与分级排序质量。',
      'Four metrics, four questions': '四个指标，四个问题',
      'How much of Top-k is relevant?': 'Top-k 中有多少是相关结果？',
      'Focus: noise in the returned set': '关注：返回集合中的噪声',
      'How much gold evidence was found?': '找到了多少标准证据？',
      'Focus: coverage and candidate ceiling': '关注：覆盖率与候选上限',
      'Where is the first relevant result?': '第一个相关结果排在哪里？',
      'Focus: one-answer lookup': '关注：单答案查找',
      'Are highly useful results near the top?': '高价值结果是否排在前面？',
      'Focus: graded relevance and order': '关注：分级相关性与顺序',
    },
  },
  'evidence-completeness.svg': {
    zh: {
      'Partial evidence compared with complete evidence': '部分证据与完整证据',
      'A question needs evidence A, B, and C. One retrieval finds only two items while another finds all three.':
        '一个问题需要 A、B、C 三项证据；一次检索只找到两项，另一次找全三项。',
      'Any evidence is not complete evidence': '找到证据不等于找全证据',
      'Question requires the set Gq = { A, B, C }': '问题需要证据集合 Gq = { A, B, C }',
      'Partial retrieval': '部分检索成功',
      'Complete retrieval': '完整检索成功',
    },
  },
  'multi-hop-evidence-chain.svg': {
    zh: {
      'Multi-hop evidence chain': '多跳证据链',
      'An original question is decomposed into dependent searches that recover blocks, numerator, and denominator before computing an answer.':
        '原始问题被拆成相互依赖的搜索步骤，依次找到区块、分子与分母，再计算答案。',
      'Multi-hop retrieval follows evidence dependencies': 'Multi-hop Retrieval 沿证据依赖逐步搜索',
      'Original question: what share?': '原始问题：占比是多少？',
      'Hop 1 · entities': '第 1 跳 · 实体',
      'Which three blocks?': '是哪三个区块？',
      'Hop 2 · numerator': '第 2 跳 · 分子',
      'Combined production?': '合计产量是多少？',
      'Hop 3 · denominator': '第 3 跳 · 分母',
      'Outside-Norway total?': '挪威境外总量是多少？',
      'Answer + evidence path': '答案 + 证据路径',
      'all required hops present': '所有必要步骤均已完成',
    },
  },
  'rag-strategy-comparison.svg': {
    zh: {
      'Comparison of vector retrieval, GraphRAG, and Agentic RAG': '向量检索、GraphRAG 与 Agentic RAG 对比',
      'Vector retrieval ranks similarity, GraphRAG traverses relations, and Agentic RAG controls actions over multiple steps.':
        '向量检索按相似度排序，GraphRAG 沿关系遍历，Agentic RAG 控制多步骤行动。',
      'Three different design questions': '三种不同的设计问题',
      'Vector retrieval': '向量检索',
      'Which chunks are close?': '哪些 chunks 最相似？',
      'similarity + nearest neighbours': '相似度 + 最近邻',
      'Which relations form a path?': '哪些关系构成路径？',
      'nodes + edges + communities': '节点 + 边 + 社区',
      plan: '规划',
      'choose tool': '选择工具',
      'inspect + retry': '检查 + 重试',
      'What action comes next?': '下一步采取什么行动？',
      'state + policy + stop rule': '状态 + 策略 + 停止规则',
    },
  },
  'agentic-rag-bounded-loop.svg': {
    zh: {
      'Bounded Agentic RAG loop': '有边界的 Agentic RAG 循环',
      'A controller plans, retrieves, checks evidence, retries on a diagnosed gap, and stops when evidence is sufficient or a budget is reached.':
        '控制器先规划和检索，再检查证据；发现缺口时重试，证据充分或预算耗尽时停止。',
      'Agentic retrieval needs diagnosis and stopping': 'Agentic Retrieval 需要诊断与停止条件',
      Plan: '规划',
      Retrieve: '检索',
      Check: '检查',
      evidence: '证据',
      Answer: '回答',
      'Abstain /': '拒答 /',
      ask: '追问',
      sufficient: '证据充分',
      'budget / impossible': '预算耗尽 / 无法完成',
      'diagnosed gap → rewrite query → retry (bounded)': '诊断缺口 → 改写查询 → 有限次数重试',
      'STOP RULES': '停止条件',
      'sufficient · no new evidence · budget · uncertainty': '证据充分 · 没有新证据 · 预算限制 · 不确定性',
    },
  },
};

function replaceText(svg, replacements) {
  return svg.replace(/<(title|desc|text)([^>]*)>(.*?)<\/\1>/gs, (_node, tag, attrs, text) => {
    const translated = Object.hasOwn(replacements, text) ? replacements[text] : text;
    return `<${tag}${attrs}>${translated}</${tag}>`;
  });
}

for (const [filename, translations] of Object.entries(assets)) {
  const source = await readFile(join(root, filename), 'utf8');
  const stem = filename === 'rag-with-and-without-zh.svg' ? 'rag-with-and-without' : filename.slice(0, -4);

  for (const language of ['en', 'zh']) {
    const localized = replaceText(source, translations[language] ?? {});
    await writeFile(join(root, `${stem}-${language}.svg`), localized, 'utf8');
  }
}

console.log(`Generated ${Object.keys(assets).length * 2} localized SVG files.`);
