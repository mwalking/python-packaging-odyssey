import React from 'react';

const LockfilesContent = () => (
  <article className="prose max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
    <p className="text-lg text-slate-700 leading-relaxed">
      Lockfiles keep environments reproducible by freezing every dependency version. We will explore resolver quirks and diffing strategies soon.
    </p>
    <div className="bg-white border border-dashed border-slate-200 rounded-lg p-6 text-slate-500">
      Coming soon: lockfile diff visualizations and guidance for pip-compile, Poetry, and uv.
    </div>
  </article>
);

const chapter = {
  slug: 'lockfiles',
  title: 'Lockfiles and reproducibility',
  subtitle: 'Why freezing dependencies matters and how to keep installs deterministic.',
  summary: 'A primer on lockfiles, pinning, and dependency hash guarantees.',
  readingTime: 6,
  tags: ['lockfiles', 'reproducibility'],
  component: LockfilesContent,
};

export default chapter;
