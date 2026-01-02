import React, { useState, useEffect } from 'react';
import { Cloud, HardDrive, Copy, Link, Database, ArrowRight } from 'lucide-react';

const STEPS = {
  'legacy': {
    title: 'Standard Pip Behavior',
    mode: 'pip',
    diskUsage: 85,
    message: 'Pip downloads, caches, and then COPIES files into every virtual environment. 100 projects = 100 copies.',
  },
  'cache': {
    title: 'The Global Store',
    mode: 'uv',
    diskUsage: 15,
    message: 'uv maintains a central, content-addressable store. Packages are unzipped here once.',
  },
  'reflink': {
    title: 'Reflinks / Hardlinks',
    mode: 'uv-link',
    diskUsage: 16,
    message: 'Instead of copying, uv uses filesystem links (reflinks). The file appears in the venv instantly, consuming near-zero extra disk space.',
  },
  'speed': {
    title: 'Instant Creation',
    mode: 'uv-speed',
    diskUsage: 16,
    message: 'Because no bytes are actually copied, creating an environment with heavy dependencies (like PyTorch) takes milliseconds, not minutes.',
  },
};

const GlobalCacheMech = ({ activeId }) => {
  const step = STEPS[activeId] || STEPS['legacy'];
  const [activePacket, setActivePacket] = useState(null);

  // Animation loop to spawn packets
  useEffect(() => {
    const interval = setInterval(() => {
       setActivePacket(Date.now());
    }, 2000);
    return () => clearInterval(interval);
  }, [activeId]);

  const isPip = step.mode === 'pip';
  const isLink = step.mode.includes('uv');

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm h-[420px] flex flex-col">
       <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
         <div>
            <h3 className="font-bold text-slate-800">{step.title}</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 leading-snug">{step.message}</p>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Disk Usage</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full mt-1 overflow-hidden">
               <div 
                  className={`h-full transition-all duration-1000 ${step.diskUsage > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${step.diskUsage}%` }}
               />
            </div>
         </div>
      </div>

      <div className="flex-1 relative p-6">
         {/* Layout */}
         <div className="grid grid-cols-[1fr_auto_1fr] h-full gap-8">
            
            {/* LEFT: CACHE */}
            <div className="bg-slate-200 rounded-xl border-2 border-slate-300 p-4 flex flex-col items-center justify-center relative">
               <div className="absolute -top-3 bg-slate-400 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">~/.cache</div>
               <Database className="w-12 h-12 text-slate-500 mb-2" />
               <div className="space-y-1 w-full">
                  <div className="h-2 bg-slate-400 rounded w-3/4 mx-auto" />
                  <div className="h-2 bg-slate-400 rounded w-1/2 mx-auto" />
                  <div className="h-2 bg-slate-400 rounded w-5/6 mx-auto" />
               </div>
            </div>

            {/* CENTER: ACTION */}
            <div className="flex flex-col items-center justify-center gap-12 relative w-16">
               {/* Packet Animation */}
               {activePacket && (
                 <>
                   {/* Top Path */}
                   <div 
                     key={`top-${activePacket}`} 
                     className="absolute w-4 h-4 bg-indigo-500 rounded shadow-sm animate-fly-right-top"
                     style={{ top: '30%', left: 0 }}
                   />
                   {/* Bottom Path */}
                   <div 
                     key={`btm-${activePacket}`} 
                     className="absolute w-4 h-4 bg-indigo-500 rounded shadow-sm animate-fly-right-btm"
                     style={{ top: '70%', left: 0 }}
                   />
                 </>
               )}

               <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm z-10">
                  {isPip ? <Copy className="w-5 h-5 text-amber-500" /> : <Link className="w-5 h-5 text-emerald-500" />}
               </div>
            </div>

            {/* RIGHT: PROJECTS */}
            <div className="flex flex-col gap-4">
               {/* Project A */}
               <div className="flex-1 bg-white border-2 border-slate-200 border-dashed rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 uppercase">Project A</div>
                  <div className="mt-6 grid grid-cols-4 gap-2">
                     {[...Array(isPip ? 8 : 8)].map((_, i) => (
                        <div key={i} className={`h-2 rounded ${isPip ? 'bg-amber-300' : 'bg-emerald-300/50 border border-emerald-400'}`} />
                     ))}
                  </div>
                  {isLink && <div className="absolute inset-0 flex items-center justify-center text-emerald-600/10 font-black text-4xl -rotate-12 select-none">LINKED</div>}
               </div>

               {/* Project B */}
               <div className="flex-1 bg-white border-2 border-slate-200 border-dashed rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 uppercase">Project B</div>
                  <div className="mt-6 grid grid-cols-4 gap-2">
                     {[...Array(isPip ? 8 : 8)].map((_, i) => (
                        <div key={i} className={`h-2 rounded ${isPip ? 'bg-amber-300' : 'bg-emerald-300/50 border border-emerald-400'}`} />
                     ))}
                  </div>
                  {isLink && <div className="absolute inset-0 flex items-center justify-center text-emerald-600/10 font-black text-4xl -rotate-12 select-none">LINKED</div>}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default GlobalCacheMech;
