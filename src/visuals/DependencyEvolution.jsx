import React from 'react';
import { FileText, Package, List } from 'lucide-react';

const steps = {
  adhoc: {
    title: 'Ad-hoc Installs',
    file: null,
    content: null,
    preview: (
      <div className="font-mono text-sm text-slate-300">
        <div className="text-emerald-400">$ pip install pandas</div>
        <div className="text-slate-500">Downloading pandas-2.0.3...</div>
        <div className="text-slate-500">Installing collected packages...</div>
        <div className="text-emerald-400">Successfully installed pandas-2.0.3</div>
      </div>
    ),
    note: 'Great for playing around. Bad for sharing.',
  },
  freeze: {
    title: 'The Flat List',
    file: 'requirements.txt',
    icon: <List className="w-5 h-5 text-slate-500" />,
    content: (
      <div className="space-y-1 text-slate-600">
        <div>numpy==1.26.0</div>
        <div>pandas==2.0.3</div>
        <div>python-dateutil==2.8.2</div>
        <div>pytz==2023.3.post1</div>
        <div>six==1.16.0</div>
        <div>tzdata==2023.3</div>
      </div>
    ),
    preview: null,
    note: 'Simple, but mixes direct dependencies (pandas) with sub-dependencies (six, pytz).',
  },
  toml: {
    title: 'Structured Metadata',
    file: 'pyproject.toml',
    icon: <FileText className="w-5 h-5 text-amber-600" />,
    content: (
      <div className="space-y-1">
        <div className="text-purple-600 font-bold">[project]</div>
        <div className="pl-4">
          <span className="text-slate-500">name = </span>
          <span className="text-green-600">"my-app"</span>
        </div>
        <div className="pl-4">
          <span className="text-slate-500">version = </span>
          <span className="text-green-600">"0.1.0"</span>
        </div>
        <div className="pl-4">
          <span className="text-slate-500">dependencies = [</span>
        </div>
        <div className="pl-8 text-green-600">"pandas>=2.0.0",</div>
        <div className="pl-8 text-green-600">"requests",</div>
        <div className="pl-4 text-slate-500">]</div>
      </div>
    ),
    preview: null,
    note: 'Defines abstract requirements (Ranges allowed). Humans read this.',
  },
  groups: {
    title: 'Dependency Groups',
    file: 'pyproject.toml',
    icon: <FileText className="w-5 h-5 text-amber-600" />,
    content: (
      <div className="space-y-1">
        <div className="text-purple-600 font-bold">[project.optional-dependencies]</div>
        <div className="text-blue-600 font-bold pl-2">dev = [</div>
        <div className="pl-8 text-green-600">"pytest",</div>
        <div className="pl-8 text-green-600">"ruff",</div>
        <div className="pl-4 text-slate-500">]</div>
        <div className="text-blue-600 font-bold pl-2">docs = [</div>
        <div className="pl-8 text-green-600">"mkdocs",</div>
        <div className="pl-4 text-slate-500">]</div>
      </div>
    ),
    preview: null,
    note: 'Cleanly separates production code from developer tooling.',
  },
};

const DependencyEvolution = ({ activeId }) => {
  const step = steps[activeId] || steps.adhoc;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">{step.title}</h3>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[300px] flex flex-col">
        {step.file ? (
          <>
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center gap-2">
              {step.icon}
              <span className="font-mono text-sm text-slate-600 font-medium">{step.file}</span>
            </div>
            <div className="p-6 font-mono text-sm overflow-auto flex-1 bg-slate-50/30">
              {step.content}
            </div>
          </>
        ) : (
          <div className="bg-slate-900 p-6 font-mono text-sm flex-1 flex flex-col justify-center">
            {step.preview}
          </div>
        )}
      </div>

      <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-sm text-indigo-800 flex items-start gap-2">
        <Package className="w-5 h-5 shrink-0 mt-0.5" />
        <p>{step.note}</p>
      </div>
    </div>
  );
};

export default DependencyEvolution;
