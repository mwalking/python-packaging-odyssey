import React from 'react';
import { Terminal, Check, Download } from 'lucide-react';

const STEPS = {
  'curl': { 
    cmd: 'curl -LsSf https://astral.sh/uv/install.sh | sh',
    out: ['Downloading uv 0.1.10...', 'Installing to ~/.cargo/bin', 'Done.'],
    hl: 'curl' 
  },
  'pip': { 
    cmd: 'pip install uv', 
    out: ['Collecting uv', 'Downloading uv... (8MB)', 'Successfully installed uv'],
    hl: 'pip' 
  },
  'verify': { 
    cmd: 'uv --version', 
    out: ['uv 0.1.10 (8d2a...)'],
    hl: 'version' 
  },
  'update': {
    cmd: 'uv self update',
    out: ['Checking for updates...', 'Upgraded uv v0.1.10 -> v0.1.11'],
    hl: 'update'
  }
};

const UvInstallation = ({ activeId }) => {
  const step = STEPS[activeId] || STEPS['curl'];

  return (
    <div className="bg-slate-900 rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl border border-slate-700">
       <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
          <div className="flex gap-1.5">
             <div className="w-3 h-3 rounded-full bg-red-500" />
             <div className="w-3 h-3 rounded-full bg-amber-500" />
             <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="ml-4 text-xs text-slate-400 font-mono">terminal — -zsh</span>
       </div>
       <div className="p-6 font-mono text-sm h-64 flex flex-col justify-end">
          <div className="space-y-4">
             {/* Previous phantom command for context */}
             <div className="opacity-30">
                <div className="flex gap-2 text-indigo-400">
                   <span>$</span>
                   <span>whoami</span>
                </div>
                <div className="text-slate-400">developer</div>
             </div>

             {/* Active Command */}
             <div>
                <div className="flex gap-2 text-indigo-400 font-bold items-center">
                   <span>$</span>
                   <span className="typing-effect">{step.cmd}</span>
                </div>
                <div className="mt-2 space-y-1 text-slate-300">
                   {step.out.map((line, i) => (
                      <div key={i} className="animate-fade-in" style={{ animationDelay: `${i*0.2}s` }}>
                         {line.startsWith('Done') || line.startsWith('Success') ? 
                            <span className="text-emerald-400 font-bold flex items-center gap-2"><Check className="w-3 h-3" /> {line}</span> 
                            : line
                         }
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default UvInstallation;
