import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Foundations',
      links: [
        {
          text: 'Overview',
          href: getPermalink('/foundations'),
        },
        {
          text: 'Mathematics',
          href: getPermalink('mathematics', 'category'),
        },
        {
          text: 'Statistics',
          href: getPermalink('statistics', 'category'),
        },
        {
          text: 'Statistics for AI Research',
          href: getPermalink('/series/statistics-for-ai-research'),
        },
        {
          text: 'Machine Learning',
          href: getPermalink('machine-learning', 'category'),
        },
        {
          text: 'Machine Learning Foundations',
          href: getPermalink('/series/machine-learning-foundations'),
        },
        {
          text: 'NLP & LLMs',
          href: getPermalink('nlp-and-llms', 'category'),
        },
        {
          text: 'NLP & LLM Foundations',
          href: getPermalink('/series/nlp-and-llms'),
        },
        {
          text: 'Research Engineering',
          href: getPermalink('research-engineering', 'category'),
        },
      ],
    },
    {
      text: 'Research',
      links: [
        {
          text: 'Overview',
          href: getPermalink('/research'),
        },
        {
          text: 'Multilingual AI',
          href: getPermalink('multilingual-ai', 'category'),
        },
        {
          text: 'Model Evaluation',
          href: getPermalink('model-evaluation', 'category'),
        },
        {
          text: 'Explainability & Responsible AI',
          href: getPermalink('explainability-and-responsible-ai', 'category'),
        },
        {
          text: 'Retrieval & Knowledge Systems',
          href: getPermalink('retrieval-and-knowledge-systems', 'category'),
        },
        {
          text: 'Applied ML Systems',
          href: getPermalink('applied-ml-systems', 'category'),
        },
      ],
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
  ],
  actions: [{ text: 'Portfolio ↗', href: 'https://nordic-ai.top', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Foundations',
      links: [
        { text: 'Mathematics', href: getPermalink('mathematics', 'category') },
        { text: 'Statistics', href: getPermalink('statistics', 'category') },
        { text: 'Statistics for AI Research', href: getPermalink('/series/statistics-for-ai-research') },
        { text: 'Machine Learning', href: getPermalink('machine-learning', 'category') },
        { text: 'Machine Learning Foundations', href: getPermalink('/series/machine-learning-foundations') },
        { text: 'NLP & LLMs', href: getPermalink('nlp-and-llms', 'category') },
        { text: 'NLP & LLM Foundations', href: getPermalink('/series/nlp-and-llms') },
        { text: 'Research Engineering', href: getPermalink('research-engineering', 'category') },
      ],
    },
    {
      title: 'Research',
      links: [
        { text: 'Multilingual AI', href: getPermalink('multilingual-ai', 'category') },
        { text: 'Model Evaluation', href: getPermalink('model-evaluation', 'category') },
        { text: 'Responsible AI', href: getPermalink('explainability-and-responsible-ai', 'category') },
        { text: 'Retrieval Systems', href: getPermalink('retrieval-and-knowledge-systems', 'category') },
        { text: 'Applied ML Systems', href: getPermalink('applied-ml-systems', 'category') },
      ],
    },
    {
      title: 'Site',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'About', href: getPermalink('/about') },
        { text: 'Portfolio', href: 'https://nordic-ai.top' },
        { text: 'RSS', href: getAsset('/rss.xml') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/Entropyobserver' },
    { ariaLabel: 'Hugging Face', icon: 'tabler:brand-hipchat', href: 'https://huggingface.co/entropy25' },
  ],
  footNote: `
    Notes by Xiaojing Yang · Foundations, research, and applied AI systems.
  `,
};
