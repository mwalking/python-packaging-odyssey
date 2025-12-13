import React from 'react';

const links = [
  { title: 'Python Packaging User Guide', url: 'https://packaging.python.org/' },
  { title: 'pip documentation', url: 'https://pip.pypa.io/' },
  { title: 'virtualenv documentation', url: 'https://virtualenv.pypa.io/en/latest/' },
  { title: 'PyPA specs', url: 'https://www.pypa.io/en/latest/specifications/' },
  { title: 'uv project', url: 'https://github.com/astral-sh/uv' },
];

const Resources = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-wide text-indigo-600">References</p>
      <h1 className="text-3xl font-bold text-slate-900">Resources</h1>
      <p className="text-slate-600">Curated links to deepen your understanding of Python packaging.</p>
    </div>
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-200">
      {links.map((link) => (
        <div key={link.url} className="p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">{link.title}</p>
            <p className="text-xs text-slate-500">{link.url}</p>
          </div>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 text-sm font-semibold hover:text-indigo-700"
          >
            Visit →
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Resources;
