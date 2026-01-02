import React from 'react';
import { User, Lock, Unlock, ArrowRight, FileCheck } from 'lucide-react';

const steps = {
  drift: {
    title: 'Dependency Drift',
    locked: false,
    users: [
      { name: 'Alice', time: 'Today', version: '2.0.0', color: 'bg-emerald-100 border-emerald-300' },
      { name: 'Bob', time: 'Tomorrow', version: '2.1.0', color: 'bg-amber-100 border-amber-300' },
    ],
    message: 'Without a lockfile, fresh installs pick the latest compatible version. Environments drift apart.',
  },
  lock: {
    title: 'Generating the Lock',
    locked: true,
    users: [
      { name: 'Alice', time: 'Today', version: '2.0.0', color: 'bg-emerald-100 border-emerald-300', action: 'Generates Lockfile' },
    ],
    message: 'Alice compiles her requirements into a lockfile. This freezes the entire dependency graph.',
  },
  sync: {
    title: 'Reproducible Installs',
    locked: true,
    users: [
      { name: 'Alice', time: 'Today', version: '2.0.0', color: 'bg-emerald-100 border-emerald-300' },
      { name: 'Bob', time: 'Tomorrow', version: '2.0.0', color: 'bg-emerald-100 border-emerald-300', action: 'Syncs from Lock' },
    ],
    message: 'Bob installs from the lockfile. He gets exactly what Alice has, byte-for-byte.',
  },
};

const LockfileMechanism = ({ activeId }) => {
  const step = steps[activeId] || steps.drift;

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-8">
        <div className={`p-4 rounded-full border-4 transition-all duration-500 ${step.locked ? 'bg-emerald-50 border-emerald-400 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          {step.locked ? <Lock className="w-12 h-12" /> : <Unlock className="w-12 h-12" />}
        </div>
      </div>

      <div className="space-y-4">
        {step.users.map((user) => (
          <div key={user.name} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700">
                <User className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 mt-1">{user.name}</span>
            </div>
            
            <div className="grow relative">
               {/* Connector Line */}
               <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10" />
               <div className="flex justify-between items-center bg-white border border-slate-100 rounded-lg p-2 shadow-sm z-10">
                  <div className="text-xs text-slate-400 font-mono">{user.time}</div>
                  <div className="flex items-center gap-2">
                     <span className="text-xs text-slate-500">pip install pandas</span>
                     <ArrowRight className="w-3 h-3 text-slate-300" />
                  </div>
               </div>
            </div>

            <div className={`w-24 h-20 flex flex-col items-center justify-center rounded-lg border-2 shadow-sm transition-colors duration-500 ${user.color}`}>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-1">Pandas</div>
              <div className="text-lg font-bold text-slate-800">v{user.version}</div>
              {user.action && <div className="absolute -bottom-6 text-[10px] bg-slate-800 text-white px-2 py-1 rounded">{user.action}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm text-slate-600 flex gap-3">
        {step.locked ? <FileCheck className="w-5 h-5 text-emerald-500 shrink-0" /> : <Unlock className="w-5 h-5 text-amber-500 shrink-0" />}
        <p>{step.message}</p>
      </div>
    </div>
  );
};

export default LockfileMechanism;
