import React, { useState } from 'react';
import { Terminal, FileCode, Package, Layers, Play, Zap, Box, Globe } from 'lucide-react';

const WORKFLOWS = {
  'init': {
    cmd: 'uv init my-project',
    desc: 'Bootstrapping',
    output: [
      'Initialized project "my-project"',
      '+ pyproject.toml',
      '+ .python-version',
      '+ .gitignore'
    ],
    visual: {
      type: 'fs',
      items: [
        { name: 'pyproject.toml', type: 'file', hl: true },
        { name: '.python-version', type: 'file', hl: true },
        { name: 'src/', type: 'dir' },
      ]
    },
    note: 'Creates a standard directory structure and a PEP 621 compliant configuration.'
  },
  'add': {
    cmd: 'uv add pandas',
    desc: 'Dependency Management',
    output: [
      'Resolved 15 packages in 12ms',
      'Built lockfile: uv.lock',
      '+ pandas==2.2.0',
      '+ numpy==1.26.3',
      'Audited 15 packages in 0.5ms'
    ],
    visual: {
      type: 'dependency',
      items: [
        { name: 'pyproject.toml', status: 'updated' },
        { name: 'uv.lock', status: 'created' },
        { name: '.venv', status: 'synced' }
      ]
    },
    note: 'Updates constraints, resolves the graph, writes the lockfile, and syncs the environment—all in one atomic step.'
  },
  'python': {
    cmd: 'uv python install 3.12',
    desc: 'Python Management',
    output: [
      'Downloading Python 3.12.1...',
      'Installed Python 3.12.1 to ~/.local/share/uv/python',
      'Time: 1.2s'
    ],
    visual: {
      type: 'global',
      items: [
        { name: 'CPython 3.11', installed: true },
        { name: 'CPython 3.12', installed: true, new: true },
        { name: 'PyPy 3.9', installed: false }
      ]
    },
    note: 'uv manages Python versions itself. You can request any version, and it fetches a standalone build instantly.'
  },
  'run': {
    cmd: 'uv run script.py',
    desc: 'Ephemeral Execution',
    output: [
      'Reading inline script metadata...',
      'Created temporary environment',
      'Installed 3 dependencies',
      '> Hello from script!'
    ],
    visual: {
      type: 'ephemeral',
      stages: ['Read', 'Env', 'Run', 'Clean']
    },
    note: 'Executes scripts in isolated environments created just-in-time. Dependencies are declared inside the script file.'
  },
};

const UvUnifiedWorkflow = ({ activeId }) => {
  const [activeTab, setActiveTab] = useState('init');
  
  // If activeId from scrolly matches a workflow, auto-select it
  React.useEffect(() => {
    if (activeId && WORKFLOWS[activeId]) {
      setActiveTab(activeId);
    }
  }, [activeId]);

  const workflow = WORKFLOWS[activeTab] || WORKFLOWS['init'];

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[500px]">
      {/* Tab Bar */}
      <div className="flex border-b border-slate-700 bg-slate-800/50">
        {Object.entries(WORKFLOWS).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors
              ${activeTab === key ? 'bg-slate-800 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}
            `}
          >
            {key === 'init' && <Box className="w-4 h-4" />}
            {key === 'add' && <Layers className="w-4 h-4" />}
            {key === 'python' && <Globe className="w-4 h-4" />}
            {key === 'run' && <Play className="w-4 h-4" />}
            {key}
          </button>
        ))}
      </div>

      <div className="p-6 grid gap-6 grid-rows-[auto_1fr]">
        
        {/* Terminal Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
             <Terminal className="w-3 h-3" />
             <span>~/dev/project</span>
          </div>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm border border-slate-700/50 shadow-inner">
             <div className="flex gap-2 text-indigo-400 font-bold mb-2">
                <span>$</span>
                <span className="typing-effect">{workflow.cmd}</span>
             </div>
             <div className="space-y-1 text-slate-300">
                {workflow.output.map((line, i) => (
                   <div key={i} className={`opacity-0 animate-fade-in`} style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}>
                      {line}
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Visual Section */}
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-24 h-24" />
           </div>

           <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">{workflow.desc} Visualization</h4>

           {/* FILESYSTEM MODE */}
           {workflow.visual.type === 'fs' && (
              <div className="flex items-center gap-4">
                 {workflow.visual.items.map((item, i) => (
                    <div key={item.name} className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-800 border ${item.hl ? 'border-emerald-500/50 text-emerald-100' : 'border-slate-600 text-slate-400'} animate-pop-in`} style={{ animationDelay: `${i * 200}ms` }}>
                       <FileCode className="w-8 h-8" />
                       <span className="text-xs font-mono">{item.name}</span>
                    </div>
                 ))}
              </div>
           )}

           {/* DEPENDENCY MODE */}
           {workflow.visual.type === 'dependency' && (
              <div className="flex items-center justify-around relative">
                 <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -z-10" />
                 {workflow.visual.items.map((item, i) => (
                    <div key={item.name} className="flex flex-col items-center gap-2 bg-slate-900 p-3 rounded-xl border border-indigo-500/30 z-10 shadow-xl">
                       <div className="text-[10px] uppercase font-bold text-indigo-400">{item.status}</div>
                       <div className="font-mono text-xs text-white">{item.name}</div>
                    </div>
                 ))}
              </div>
           )}

           {/* GLOBAL PYTHON MODE */}
           {workflow.visual.type === 'global' && (
              <div className="space-y-2">
                 {workflow.visual.items.map((py, i) => (
                    <div key={py.name} className={`flex items-center justify-between p-3 rounded bg-slate-900 border ${py.new ? 'border-emerald-500/50' : 'border-slate-700'}`}>
                       <span className="text-sm text-slate-200">{py.name}</span>
                       {py.installed ? (
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${py.new ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                             {py.new ? 'Just Installed' : 'Ready'}
                          </span>
                       ) : (
                          <span className="text-[10px] text-slate-600 uppercase font-bold">Not Installed</span>
                       )}
                    </div>
                 ))}
              </div>
           )}

            {/* EPHEMERAL MODE */}
            {workflow.visual.type === 'ephemeral' && (
               <div className="flex items-center justify-between mt-8">
                  {workflow.visual.stages.map((stage, i) => (
                     <div key={stage} className="flex flex-col items-center gap-2 relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-all duration-500 
                           ${i < 3 ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-600 text-slate-500'}
                        `}>
                           {i + 1}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400">{stage}</span>
                        {i < 3 && <div className="absolute top-5 left-10 w-24 h-0.5 bg-slate-700 -z-10" />}
                     </div>
                  ))}
               </div>
            )}
        </div>

        <div className="bg-indigo-900/20 border border-indigo-500/30 p-3 rounded-lg text-indigo-300 text-sm flex gap-3 items-start">
           <Zap className="w-5 h-5 shrink-0 mt-0.5" />
           <p className="leading-snug">{workflow.note}</p>
        </div>

      </div>
    </div>
  );
};

export default UvUnifiedWorkflow;
