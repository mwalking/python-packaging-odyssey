import React from 'react';

const VenvContent = () => (
  <article className="prose max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
    <p className="text-lg text-slate-700 leading-relaxed">This chapter will dive deep into virtual environment ergonomics, activation scripts, and project templates.</p>
    <div className="bg-white border border-dashed border-slate-200 rounded-lg p-6 text-slate-500">
      Detailed guidance is coming soon. We will cover common shell customizations, .venv naming conventions, and how to automate setup.
    </div>
  </article>
);

const chapter = {
  slug: 'venv',
  title: 'Virtual environments in practice',
  subtitle: 'Naming, activation, shell helpers, and day-to-day venv habits.',
  summary: 'Practical tips for creating and managing virtual environments without friction.',
  readingTime: 6,
  tags: ['venv', 'workflow'],
  component: VenvContent,
};

export default chapter;
