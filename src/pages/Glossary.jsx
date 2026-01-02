import React from 'react';

const terms = [
  { term: 'Environment', definition: 'A folder containing a Python interpreter, site-packages, and console scripts.' },
  { term: 'site-packages', definition: 'Directory where installed Python packages live for a given interpreter.' },
  { term: 'venv', definition: 'Built-in module that creates isolated Python environments backed by symlinks.' },
  { term: 'pyproject.toml', definition: 'The standardized metadata file that declares build backends and dependencies (PEP 621).' },
  { term: 'Lockfile', definition: 'A file that pins exact package versions (and often hashes) to ensure reproducible installs.' },
  { term: 'Wheel (.whl)', definition: 'A built package format for Python, ready to be installed without compilation.' },
  { term: 'sdist (Source Distribution)', definition: 'A distribution format (usually .tar.gz) that contains the raw source code and requires a build step.' },
  { term: 'Dependency Resolution', definition: 'The process of finding a set of package versions that satisfy all constraints from all dependencies.' },
  { term: 'uv', definition: 'An extremely fast Python package installer and resolver, written in Rust, designed as a drop-in replacement for pip and pip-tools.' },
  { term: 'Global Cache', definition: 'A centralized storage for package files, allowing multiple projects to share the same physical files via linking.' },
  { term: 'Reflink (Copy-on-Write)', definition: 'A filesystem feature where a "copy" shares the same data blocks on disk until one of the copies is modified.' },
  { term: 'PEP 517/518', definition: 'Standards that defined the build system independence, allowing tools like Poetry, Hatch, and Flit to exist.' },
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
