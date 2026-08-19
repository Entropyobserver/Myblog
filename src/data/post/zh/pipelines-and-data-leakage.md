---
title: "Pipelines 与 Data Leakage"
publishDate: 2026-08-19
excerpt: "为什么预处理应该放进验证 pipeline，而不是在划分前对全数据提前处理。"
category: "Machine Learning"
track: "Foundations"
tags: ["Machine Learning Foundations", "Machine Learning", "Model Evaluation", "Interview Prep"]
language: "zh"
author: "Xiaojing Yang"
translationKey: "pipelines-and-data-leakage"
translationHref: "/pipelines-and-data-leakage"
translationLabel: "EN"
---

<div class="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">核心观点</p>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">Data leakage 是评估数据的信息偷偷进入了训练决策。</p>
</div>

## 1. 泄漏问题

Data leakage 会让弱模型看起来很强。经典错误是在 split 或 cross-validation 之前，就用全数据拟合预处理步骤。

<div class="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
  <div class="bg-slate-100 px-5 py-3 font-semibold dark:bg-slate-900">安全 pipeline</div>
  <div class="grid gap-0 text-sm md:grid-cols-5">
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>原始数据</strong><br />还没学习任何东西</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>Split / CV fold</strong><br />分开 train 和 validation</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>只在 train 上拟合预处理</strong><br />Scaler、vectorizer、imputer</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>转换 validation</strong><br />使用 train-fitted 步骤</div>
    <div class="border-t border-slate-200 p-4 dark:border-slate-800"><strong>评估</strong><br />没有 validation 信息泄漏</div>
  </div>
</div>

## 2. 泄漏例子

| 泄漏来源 | 为什么危险 |
|---|---|
| split 前 scaling | validation 分布影响训练变换 |
| CV 前 feature selection | validation labels 指导特征选择 |
| 重复文档 | 模型见过近似测试样本 |
| 时间泄漏 | 用未来信息预测过去 |
| target leakage | 特征直接编码标签 |

## 3. sklearn 例子

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000)),
])
scores = cross_val_score(pipe, X, y, cv=5)
```

## 4. AI/NLP 连接

NLP 里的泄漏可能来自去重失败、用全语料学习 preprocessing vocabulary、话题重叠、prompt examples 过度接近测试项，或者 LLM 预训练中的 benchmark contamination。

<div class="my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">Pipeline 思维</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">每一个会学习的预处理步骤都应该在 training fold 内部。</p>
  </div>
  <div class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
    <p class="font-semibold">研究思维</p>
    <p class="mt-2 text-sm text-muted dark:text-slate-300">每一个评估分数都需要 leakage audit。</p>
  </div>
</div>

## 总结

Pipeline 不只是让代码更整洁，它是在保护评估。

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
