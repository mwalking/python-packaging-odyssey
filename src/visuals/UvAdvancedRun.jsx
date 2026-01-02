import React from 'react';
import { Play, Trash2, Box, Layers } from 'lucide-react';

const STEPS = {
  'script': {
    title: 'Inline Metadata',
    code: `# /// script
# dependencies = ["requests<3", "rich"]
# ///
import requests`,
    env: null
  },
  'run': {
    title: 'uv run',
    code: `$ uv run main.py`,
    env: 'creating'
  },
  'env': {
    title: 'Ephemeral Env',
    code: `Resolved 2 packages...`,
    env: 'active'
  },
  'exec': {
    title: 'Execution',
    code: `> Output from script...`,
    env: 'active'
  },
  'clean': {
    title: 'Cleanup',
    code: `Done.`,
    env: 'deleted'
  }
};

const UvAdvancedRun = ({ activeId }) => {
  const step = STEPS[activeId] || STEPS['script'];

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-full">
       <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-sm w-full max-w-md shadow-2xl border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
          <pre className="whitespace-pre-wrap">{step.code}</pre>
       </div>

       <div className={`transition-all duration-500 flex flex-col items-center gap-2 ${step.env ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4'}`}>
          <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center relative bg-white shadow-xl transition-colors duration-300
             ${step.env === 'creating' ? 'border-amber-400 animate-pulse' : ''}
             ${step.env === 'active' ? 'border-emerald-500' : ''}
             ${step.env === 'deleted' ? 'border-slate-200 grayscale opacity-50' : ''}
          `}>
             {step.env === 'active' ? <Box className="w-12 h-12 text-emerald-600" /> : <Layers className="w-12 h-12 text-slate-400" />}
             
             {step.env === 'active' && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                   <Play className="w-4 h-4 fill-current" />
                </div>
             )}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
             {step.env === 'creating' ? 'Building Env...' : 
              step.env === 'active' ? 'Isolated Runtime' : 
              step.env === 'deleted' ? 'Garbage Collected' : 'Idle'}
          </span>
       </div>
    </div>
  );
};

export default UvAdvancedRun;
