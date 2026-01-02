import React, { useEffect, useRef, useState } from 'react';
import { Settings, Box, Package, ArrowRight, FileJson, Hammer, Trash2 } from 'lucide-react';

const STEPS = {
  'legacy': {
    title: 'The Legacy Era (setup.py)',
    activeStage: 'legacy',
    description: 'Pip executes setup.py directly. This is dangerous (arbitrary code) and fragile (requires dependencies to be pre-installed).',
  },
  'toml': {
    title: 'The Declaration (PEP 518)',
    activeStage: 'toml',
    description: 'pyproject.toml defines the [build-system]. It tells the frontend exactly what tools are needed to build the project.',
  },
  'isolation': {
    title: 'Build Isolation',
    activeStage: 'isolation',
    description: 'Pip creates a temporary, isolated environment. It installs only the build tools (e.g., setuptools, wheel). No pollution.',
  },
  'build': {
    title: 'The Build Backend',
    activeStage: 'build',
    description: 'The backend (e.g., hatchling, flit) takes over. It compiles code, gathers assets, and produces a standardized artifact.',
  },
  'wheel': {
    title: 'The Wheel',
    activeStage: 'wheel',
    description: 'The result is a .whl file. It is a pre-built binary package. No compilation is needed at install time.',
  },
  'install': {
    title: 'Installation',
    activeStage: 'install',
    description: 'Pip simply unzips the wheel into site-packages. Fast, safe, and deterministic.',
  },
};

const BuildBackendArch = ({ activeId }) => {
  const step = STEPS[activeId] || STEPS['legacy'];
  const [animState, setAnimState] = useState(0);

  // Simple looped animation for the "active" part
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimState((s) => (s + 1) % 4);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const isStageActive = (stage) => {
    const order = ['legacy', 'toml', 'isolation', 'build', 'wheel', 'install'];
    return order.indexOf(activeId) >= order.indexOf(stage);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm h-[480px] flex flex-col">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
         <div>
            <h3 className="font-bold text-slate-800">{step.title}</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 leading-snug">{step.description}</p>
         </div>
         <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
            <Settings className={`w-5 h-5 ${step.activeStage === 'build' ? 'animate-spin' : ''}`} />
         </div>
      </div>

      <div className="flex-1 relative p-8 flex items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
        
        {/* Legacy Path */}
        {activeId === 'legacy' ? (
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-center gap-2">
                <Box className="w-12 h-12 text-slate-400" />
                <span className="text-xs font-mono font-bold text-slate-500">Source</span>
             </div>
             <ArrowRight className="w-6 h-6 text-red-400 animate-pulse" />
             <div className="p-4 bg-red-50 border-2 border-red-200 border-dashed rounded-xl flex flex-col items-center gap-2 relative">
                <div className="absolute -top-3 bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Risky</div>
                <Hammer className="w-8 h-8 text-red-500" />
                <span className="text-xs font-mono font-bold text-red-700">setup.py install</span>
             </div>
             <ArrowRight className="w-6 h-6 text-red-400 animate-pulse" />
             <div className="flex flex-col items-center gap-2">
                <Package className="w-12 h-12 text-slate-600" />
                <span className="text-xs font-mono font-bold text-slate-500">Site-Packages</span>
             </div>
          </div>
        ) : (
          /* Modern Path */
          <div className="relative w-full max-w-lg">
             {/* CONFIG NODE */}
             <div className={`absolute top-0 left-0 transition-all duration-500 ${isStageActive('toml') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-2 rounded-lg shadow-lg">
                   <FileJson className="w-4 h-4 text-emerald-400" />
                   <div className="text-[10px] font-mono">
                      <div>[build-system]</div>
                      <div className="text-slate-400">requires = ["flit"]</div>
                   </div>
                </div>
                <div className="h-8 w-0.5 bg-slate-300 mx-auto" />
             </div>

             {/* MAIN FLOW */}
             <div className="flex items-center justify-between mt-12">
                
                {/* 1. SOURCE */}
                <div className="flex flex-col items-center gap-2 z-10">
                   <div className="w-16 h-16 bg-white border border-slate-300 rounded-xl flex items-center justify-center shadow-sm">
                      <Box className="w-8 h-8 text-slate-400" />
                   </div>
                   <span className="text-xs font-bold text-slate-500">Source</span>
                </div>

                {/* ARROW 1 */}
                <div className="flex-1 h-0.5 bg-slate-200 mx-2 relative overflow-hidden">
                   {isStageActive('isolation') && <div className="absolute inset-0 bg-indigo-500 w-1/2 animate-[shimmer_1s_infinite]" />}
                </div>

                {/* 2. ISOLATED BUILD ENV */}
                <div className={`relative p-6 rounded-2xl border-2 transition-all duration-500 z-10 ${isStageActive('isolation') ? 'bg-white border-indigo-500 shadow-xl scale-110' : 'bg-slate-50 border-slate-200 grayscale opacity-50'}`}>
                   {isStageActive('isolation') && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide whitespace-nowrap shadow-sm">
                         Build Env
                      </div>
                   )}
                   
                   {/* Backend Inside */}
                   <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${isStageActive('build') ? 'opacity-100' : 'opacity-40'}`}>
                      <Hammer className={`w-8 h-8 text-indigo-600 ${activeId === 'build' ? 'animate-bounce' : ''}`} />
                      <span className="text-[10px] font-mono font-bold text-indigo-900">Backend</span>
                   </div>
                </div>

                {/* ARROW 2 */}
                <div className="flex-1 h-0.5 bg-slate-200 mx-2 relative overflow-hidden">
                   {isStageActive('wheel') && <div className="absolute inset-0 bg-emerald-500 w-1/2 animate-[shimmer_1s_infinite]" />}
                </div>

                {/* 3. WHEEL */}
                <div className={`flex flex-col items-center gap-2 z-10 transition-all duration-500 ${isStageActive('wheel') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                   <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center shadow-sm">
                      <div className="text-xs font-mono font-bold text-emerald-700">.whl</div>
                   </div>
                   <span className="text-xs font-bold text-emerald-600">Artifact</span>
                </div>
             </div>

             {/* INSTALL STEP */}
             {isStageActive('install') && (
                <div className="absolute top-28 right-0 w-16 flex flex-col items-center animation-fade-in-up">
                   <div className="h-8 w-0.5 bg-emerald-300 mx-auto mb-1" />
                   <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                      <Package className="w-8 h-8 text-white" />
                   </div>
                   <span className="text-xs font-bold text-slate-800 mt-2">Installed</span>
                </div>
             )}

             {/* Cleanup Step (Implicit) */}
             {isStageActive('install') && (
                <div className="absolute top-28 left-1/2 -translate-x-1/2 text-slate-300 flex flex-col items-center">
                   <div className="h-8 w-0.5 bg-slate-300 mb-1" />
                   <Trash2 className="w-5 h-5" />
                   <span className="text-[10px]">Env Deleted</span>
                </div>
             )}

          </div>
        )}
      </div>
    </div>
  );
};

export default BuildBackendArch;
