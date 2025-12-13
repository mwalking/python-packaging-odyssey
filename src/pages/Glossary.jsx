import React from 'react';

const terms = [
  { term: 'Environment', definition: 'A folder containing a Python interpreter, site-packages, and console scripts.' },
  { term: 'site-packages', definition: 'Directory where installed Python packages live for a given interpreter.' },
  { term: 'venv', definition: 'Built-in module that creates isolated Python environments backed by symlinks.' },
  { term: 'pyproject.toml', definition: 'The standardized metadata file that declares build backends and dependencies.' },
  { term: 'Lockfile', definition: 'A file that pins exact package versions (and often hashes) to ensure reproducible installs.' },
];

const Glossary = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-wide text-indigo-600">Reference</p>
      <h1 className="text-3xl font-bold text-slate-900">Glossary</h1>
      <p className="text-slate-600">Quick definitions for packaging terms you will see throughout the odyssey.</p>
    </div>
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-200">
      {terms.map((item) => (
        <div key={item.term} className="p-5">
          <p className="text-sm font-semibold text-slate-900">{item.term}</p>
          <p className="text-sm text-slate-600 leading-relaxed">{item.definition}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Glossary;
