import React from 'react';
import { Folder, File, Terminal, Plus, Ban, Check } from 'lucide-react';

const steps = {
  intro: {
    files: [
      { name: 'main.py', type: 'file' },
      { name: 'README.md', type: 'file' },
    ],
    terminal: [
      { type: 'prompt', text: '~/project $' },
    ],
    highlight: null,
  },
  create: {
    files: [
      { name: '.venv', type: 'folder', isNew: true },
      { name: 'main.py', type: 'file' },
      { name: 'README.md', type: 'file' },
    ],
    terminal: [
      { type: 'prompt', text: '~/project $' },
      { type: 'cmd', text: 'python -m venv .venv' },
      { type: 'prompt', text: '~/project $' },
    ],
    highlight: '.venv',
  },
  activate: {
    files: [
      { name: '.venv', type: 'folder' },
      { name: 'main.py', type: 'file' },
      { name: 'README.md', type: 'file' },
    ],
    terminal: [
      { type: 'prompt', text: '~/project $' },
      { type: 'cmd', text: 'source .venv/bin/activate' },
      { type: 'prompt', text: '(.venv) ~/project $', active: true },
    ],
    highlight: 'prompt',
  },
  ignore: {
    files: [
      { name: '.venv', type: 'folder', ignored: true },
      { name: '.gitignore', type: 'file', isNew: true },
      { name: 'main.py', type: 'file' },
      { name: 'README.md', type: 'file' },
    ],
    terminal: [
      { type: 'prompt', text: '(.venv) ~/project $', active: true },
      { type: 'cmd', text: 'echo ".venv" >> .gitignore' },
      { type: 'prompt', text: '(.venv) ~/project $', active: true },
    ],
    highlight: '.gitignore',
  }
};

const FileItem = ({ name, type, isNew, ignored }) => (
  <div className={`flex items-center gap-2 p-2 rounded transition-all duration-300 ${isNew ? 'bg-emerald-50 text-emerald-700 animate-pulse' : ''} ${ignored ? 'opacity-50 grayscale' : 'text-slate-700'}`}>
    {type === 'folder' ? <Folder className="w-4 h-4" /> : <File className="w-4 h-4" />}
    <span className="font-mono text-sm">{name}</span>
    {ignored && <span className="text-[10px] uppercase border border-slate-300 px-1 rounded ml-auto">Ignored</span>}
    {isNew && <span className="text-[10px] uppercase bg-emerald-100 text-emerald-800 px-1 rounded ml-auto">New</span>}
  </div>
);

const VenvLifecycle = ({ activeId }) => {
  const step = steps[activeId] || steps.intro;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">File Explorer</span>
        </div>
        <div className="p-4 space-y-1">
          {step.files.map((f) => (
            <FileItem key={f.name} {...f} />
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-lg overflow-hidden text-slate-300 font-mono text-sm">
        <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Terminal</span>
        </div>
        <div className="p-4 space-y-2">
          {step.terminal.map((line, i) => (
            <div key={i} className="flex gap-2">
              {line.type === 'prompt' && (
                <span className={line.active ? 'text-emerald-400' : 'text-slate-500'}>
                  {line.text}
                </span>
              )}
              {line.type === 'cmd' && <span className="text-white">{line.text}</span>}
            </div>
          ))}
          <div className="w-2 h-4 bg-slate-500 animate-pulse inline-block" />
        </div>
      </div>
    </div>
  );
};

export default VenvLifecycle;
