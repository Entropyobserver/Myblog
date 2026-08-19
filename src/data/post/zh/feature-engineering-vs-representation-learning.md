---
title: "Feature Engineering vs Representation Learning"
publishDate: 2026-08-19
excerpt: "传统 ML 特征如何连接到 embedding、神经网络和现代 NLP 系统。"
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "feature-engineering-vs-representation-learning"
translationHref: "/feature-engineering-vs-representation-learning"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Feature engineering 手工设计输入；representation learning 让模型从数据中学习有用表示。</p>
</div>

## 1. 桥梁

传统 ML 很依赖 feature engineering：计数、TF-IDF、metadata、比例、手工信号。深度学习把一部分工作转移到模型内部，让模型学习表示。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">从特征到表示</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>原始输入</strong><br />文本、图像、表格</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>手工特征</strong><br />计数、规则、比例</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Embeddings</strong><br />稠密学习向量</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>模型</strong><br />使用表示</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>任务输出</strong><br />预测、检索、生成</div>
  </div>
</div>

## 2. 对比

| 方面 | Feature engineering | Representation learning |
|---|---|---|
| 控制力 | 高 | 较低 |
| 数据需求 | 通常较低 | 通常较高 |
| 可解释性 | 通常更清楚 | 通常更难 |
| 能力 | 受设计限制 | 能学习复杂模式 |
| NLP 例子 | TF-IDF | Transformer embeddings |

## 3. sklearn 例子

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

pipe = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2))),
    ("clf", LogisticRegression(max_iter=1000)),
])
```

## 4. AI/NLP 连接

现代 NLP 没有让特征思维过时，而是改变了特征在哪里。Tokenization、embeddings、prompts、retrieved contexts、fine-tuning data 都会塑造模型可以使用的表示。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">面试回答</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">Features 是输入变量；representations 是为下游任务学习出来的有用特征。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究回答</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">表示选择会改变泛化、公平性、检索行为和错误模式。</p>
  </div>
</div>

## 总结

Feature engineering 和 representation learning 不是敌人，而是两种决定模型能看见什么信息的方式。

## 面试回答模板

如果面试问到这个概念，我会分四层回答：

1. 先给短定义；
2. 再讲直觉；
3. 指出常见失败模式；
4. 最后连接到真实评估或部署决策。

## 参考资料

- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [scikit-learn User Guide](https://scikit-learn.org/stable/user_guide)
- [scikit-learn: Model selection and evaluation](https://scikit-learn.org/stable/model_selection)
- [An Introduction to Statistical Learning / ISLP](https://www.statlearning.com/)
- [ISLP Python labs](https://intro-stat-learning.github.io/ISLP/)
- [StatQuest](https://statquest.org/)
- [Stanford CS229 materials](https://cs229.stanford.edu/materials.html-full)
- [Deep Learning Book](https://www.deeplearningbook.org/)
