import React from 'react';

const PipContent = () => (
  <article className="prose max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
    <p className="text-lg text-slate-700 leading-relaxed">
      This chapter will unpack modern Python packaging: pyproject.toml, pip, build backends, and how dependency resolution works.
    </p>
    <div className="bg-white border border-dashed border-slate-200 rounded-lg p-6 text-slate-500">
      Interactive visuals for dependency graphs and build backends are on the way. Stay tuned!
    </div>
  </article>
);

const chapter = {
  slug: 'pip-pyproject',
  title: 'pip, pyproject, and the build backend',
  subtitle: 'Understand how pyproject.toml powers installs and why metadata matters.',
  summary: 'A roadmap for modern Python packaging with pip and pyproject.toml.',
  readingTime: 7,
  tags: ['pip', 'pyproject', 'build backends'],
  component: PipContent,
};

export default chapter;
