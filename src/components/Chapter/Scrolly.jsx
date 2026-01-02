import React, { useState, useCallback } from 'react';
import { Scrollama, Step } from 'react-scrollama';

const Scrolly = ({ steps, Visual, isOverlay = true }) => {
  const [activeId, setActiveId] = useState(steps?.[0]?.id);
  const [progress, setProgress] = useState(0);

  const onStepEnter = useCallback(
    ({ data }) => {
      setActiveId(data);
      const step = steps.find((item) => item.id === data);
      if (step?.onEnter) step.onEnter();
    },
    [steps]
  );

  const onStepProgress = useCallback(
    ({ progress }) => {
      setProgress(progress);
    },
    []
  );

  if (isOverlay) {
    return (
      <div className="relative">
        <div className="sticky top-0 h-screen w-full bg-slate-50 border-x border-slate-200 shadow-inner overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-5xl h-full flex items-center justify-center">
                 <Visual activeId={activeId} progress={progress} />
              </div>
           </div>
        </div>

        <div className="relative z-10 -mt-[100vh] pt-[50vh] pb-[50vh] pointer-events-none">
           <div className="max-w-xl mx-auto px-4">
              <Scrollama onStepEnter={onStepEnter} onStepProgress={onStepProgress} offset={0.5} debug={false}>
                 {steps.map((step) => (
                    <Step data={step.id} key={step.id}>
                       <div className={`transition-all duration-500 mb-[80vh] pointer-events-auto ${activeId === step.id ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-8'}`}>
                          <div className="bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-2xl rounded-2xl p-8 md:p-10 space-y-5 ring-1 ring-slate-900/5">
                             {step.label && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-indigo-50 text-indigo-700 border border-indigo-100">
                                   {step.label}
                                </span>
                             )}
                             <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{step.title}</h3>
                             <div className="text-lg text-slate-700 leading-relaxed space-y-4 font-serif">
                                {step.body}
                             </div>
                          </div>
                       </div>
                    </Step>
                 ))}
              </Scrollama>
           </div>
        </div>
      </div>
    );
  }

  // Fallback to Side-by-Side (Split) if isOverlay={false}
  return (
    <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
      <div className="space-y-12 lg:mb-[50vh]">
        <Scrollama onStepEnter={onStepEnter} onStepProgress={onStepProgress} offset={0.5} debug={false}>
          {steps.map((step) => (
            <Step data={step.id} key={step.id}>
              <div 
                className={`min-h-[80vh] flex items-center transition-opacity duration-500 ${activeId === step.id ? 'opacity-100' : 'opacity-40'}`}
              >
                <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-xl shadow-sm p-8 space-y-4">
                  {step.label && <span className="inline-block px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">{step.label}</span>}
                  <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
                  <div className="text-lg text-slate-700 leading-relaxed space-y-4">
                    {step.body}
                  </div>
                </div>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
      
      <div className="hidden lg:block sticky top-8 h-[calc(100vh-4rem)]">
        <div className="h-full w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
             <Visual activeId={activeId} progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scrolly;