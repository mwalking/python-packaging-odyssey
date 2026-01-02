import React from 'react';

const categories = [
  {
    title: 'Official Guides & Docs',
    links: [
      { title: 'Python Packaging User Guide', url: 'https://packaging.python.org/' },
      { title: 'pip documentation', url: 'https://pip.pypa.io/' },
      { title: 'virtualenv documentation', url: 'https://virtualenv.pypa.io/en/latest/' },
    ]
  },
  {
    title: 'Modern Tooling',
    links: [
      { title: 'uv (Astral)', url: 'https://github.com/astral-sh/uv' },
      { title: 'Ruff (Linter/Formatter)', url: 'https://docs.astral.sh/ruff/' },
      { title: 'Hatch', url: 'https://hatch.pypa.io/latest/' },
      { title: 'Poetry', url: 'https://python-poetry.org/' },
    ]
  },
  {
    title: 'Key Specifications (PEPs)',
    links: [
      { title: 'PEP 517 - Build System Independent Format', url: 'https://peps.python.org/pep-0517/' },
      { title: 'PEP 621 - Storing project metadata in pyproject.toml', url: 'https://peps.python.org/pep-0621/' },
      { title: 'PyPA Specifications', url: 'https://www.pypa.io/en/latest/specifications/' },
    ]
  }
];

const Resources = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-wide text-indigo-600">References</p>
      <h1 className="text-3xl font-bold text-slate-900">Resources</h1>
      <p className="text-slate-600">Curated links to deepen your understanding of Python packaging.</p>
    </div>
    
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category.title} className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">{category.title}</h2>
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-200">
            {category.links.map((link) => (
              <div key={link.url} className="p-5 flex items-center justify-between gap-4 group hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">{link.title}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{link.url}</p>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 group-hover:text-indigo-600 text-sm font-semibold flex items-center gap-1 transition-colors"
                >
                  Visit <span className="text-lg">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Resources;
