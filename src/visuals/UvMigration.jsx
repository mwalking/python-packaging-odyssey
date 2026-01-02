import React, { useEffect, useState } from 'react';

const UvMigration = ({ activeId }) => {
  const [pipTime, setPipTime] = useState(0);
  const [uvTime, setUvTime] = useState(0);

  // Simulation effect
  useEffect(() => {
    if (activeId === 'speed') {
      let p = 0;
      let u = 0;
      const interval = setInterval(() => {
        if (p < 3500) p += 50; // Pip slow
        if (u < 150) u += 10;  // Uv fast
        setPipTime(p);
        setUvTime(u);
      }, 20);
      return () => clearInterval(interval);
    } else {
       setPipTime(0);
       setUvTime(0);
    }
  }, [activeId]);

  return (
    <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
       {/* PIP SIDE */}
       <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-slate-100 px-3 py-1 rounded-bl-lg text-xs font-bold text-slate-500">Legacy</div>
          <h3 className="font-mono text-lg font-bold text-slate-700 mb-4">pip install</h3>
          <div className="space-y-2">
             <div className="h-2 bg-slate-100 rounded overflow-hidden">
                <div className="h-full bg-slate-400 transition-all duration-300" style={{ width: `${Math.min(pipTime / 35, 100)}%` }} />
             </div>
             <div className="flex justify-between text-xs text-slate-500">
                <span>Resolving...</span>
                <span className="font-mono">{pipTime}ms</span>
             </div>
             <div className="pt-8 opacity-50 space-y-2">
                <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse" />
             </div>
          </div>
       </div>

       {/* UV SIDE */}
       <div className="bg-indigo-50 rounded-xl border border-indigo-200 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-200 px-3 py-1 rounded-bl-lg text-xs font-bold text-indigo-800">New</div>
          <h3 className="font-mono text-lg font-bold text-indigo-700 mb-4">uv pip install</h3>
          <div className="space-y-2">
             <div className="h-2 bg-indigo-100 rounded overflow-hidden">
                <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${Math.min(uvTime / 1.5, 100)}%` }} />
             </div>
             <div className="flex justify-between text-xs text-indigo-600 font-bold">
                <span>Done</span>
                <span className="font-mono">{uvTime}ms</span>
             </div>
             <div className="pt-8 space-y-2">
                <div className="flex items-center gap-2 text-sm text-indigo-800">
                   <span className="text-emerald-500">✔</span> Resolved 50 packages
                </div>
                <div className="flex items-center gap-2 text-sm text-indigo-800">
                   <span className="text-emerald-500">✔</span> Linked 50 files
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default UvMigration;
