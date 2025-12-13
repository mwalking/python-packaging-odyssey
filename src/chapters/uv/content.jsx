import React from 'react';

const UvContent = () => (
  <article className="prose max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
    <p className="text-lg text-slate-700 leading-relaxed">
      uv is rethinking Python packaging with speed and a project-first mindset. This chapter will showcase uv add, uv run, and cross-platform lockfiles soon.
    </p>
    <div className="bg-white border border-dashed border-slate-200 rounded-lg p-6 text-slate-500">
      Live demos of uv's resolver and cache are coming soon.
    </div>
  </article>
);

const chapter = {
  slug: 'uv',
  title: 'uv and the next generation of Python tooling',
  subtitle: 'A fast, project-first workflow for dependencies and execution.',
  summary: 'Preview how uv simplifies installs, lockfiles, and command execution.',
  readingTime: 5,
  tags: ['uv', 'tooling'],
  component: UvContent,
};

export default chapter;
