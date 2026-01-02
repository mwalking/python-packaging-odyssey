import React from 'react';
import { Zap, Package, Layers, Play } from 'lucide-react';

const steps = {
  fragmentation: {
    title: 'Tool Fragmentation',
    bars: [
      { label: 'pip', width: '80%', color: 'bg-slate-300' },
      { label: 'venv', width: '60%', color: 'bg-slate-300' },
      { label: 'pip-tools', width: '50%', color: 'bg-slate-300' },
      { label: 'pyenv', width: '70%', color: 'bg-slate-300' },
    ],
    message: 'Traditionally, you need a different tool for every task.',
  },
  unification: {
    title: 'One Tool to Rule Them All',
    bars: [
      { label: 'uv', width: '100%', color: 'bg-purple-500' },
    ],
    message: 'uv collapses the stack. It handles python versions, environments, and packages.',
  },
  speed: {
    title: 'Resolution Speed',
    bars: [
      { label: 'pip', width: '100%', color: 'bg-slate-300', value: '30s' },
      { label: 'uv', width: '5%', color: 'bg-purple-500', value: '0.3s' },
    ],
    message: 'Written in Rust. It uses a global cache and concurrent downloads to be nearly instant.',
  },
  scripts: {
    title: 'Inline Scripts',
    code: true,
    message: 'Declare dependencies directly in your script file.',
  },
};

const UvFeatures = ({ activeId }) => {
  const step = steps[activeId] || steps.fragmentation;

  return (
    <div className="space-y-6">
      <div className="h-[300px] bg-slate-50 rounded-xl border border-slate-200 p-8 flex flex-col justify-center">
        {step.code ? (
          <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm shadow-xl">
             <div className="text-slate-500"># /// script</div>
             <div className="text-slate-500"># dependencies = [</div>
             <div className="text-green-400">#   "requests&lt;3",</div>
             <div className="text-green-400">#   "rich",</div>
             <div className="text-slate-500"># ]</div>
             <div className="text-slate-500"># ///</div>
             <br/>
             <div className="text-purple-400">import</div> requests
             <br/>
             <div className="text-purple-400">from</div> rich <div className="text-purple-400">import</div> print
             <br/>
             <br/>
             print(<span className="text-amber-300">"Hello from a self-contained script!"</span>)
          </div>
        ) : (
          <div className="space-y-4">
             {step.bars.map((bar) => (
                <div key={bar.label} className="space-y-1">
                   <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                      <span>{bar.label}</span>
                      {bar.value && <span>{bar.value}</span>}
                   </div>
                   <div className="h-8 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${bar.color} transition-all duration-700 ease-out flex items-center justify-end px-3`} 
                        style={{ width: bar.width }}
                      >
                         {bar.label === 'uv' && <Zap className="w-4 h-4 text-white/50" />}
                      </div>
                   </div>
                </div>
             ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-lg flex items-center gap-3 text-sm text-slate-700 shadow-sm">
        {step.code ? <Play className="w-5 h-5 text-purple-500" /> : <Layers className="w-5 h-5 text-purple-500" />}
        <p>{step.message}</p>
      </div>
    </div>
  );
};

export default UvFeatures;
