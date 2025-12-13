import React, { useState, useCallback } from 'react';
import { Scrollama, Step } from 'react-scrollama';

const Scrolly = ({ steps, Visual }) => {
  const [activeId, setActiveId] = useState(steps?.[0]?.id);

  const onStepEnter = useCallback(
    ({ data }) => {
      window.requestAnimationFrame(() => setActiveId(data));
      const step = steps.find((item) => item.id === data);
      if (step?.onEnter) step.onEnter();
    },
    [steps]
  );

  return (
    <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 items-start">
      <div className="space-y-6">
        <Scrollama onStepEnter={onStepEnter} offset={0.6} debug={false}>
          {steps.map((step) => (
            <Step data={step.id} key={step.id}>
              <div className="min-h-[70vh] flex items-center">
                <div className={`bg-white border rounded-xl shadow-sm p-6 space-y-2 ${activeId === step.id ? 'border-indigo-200 shadow-lg' : 'border-slate-200'}`}>
                  {step.label && <p className="text-xs uppercase tracking-wide text-indigo-600">{step.label}</p>}
                  <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.body}</p>
                </div>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
      <div className="sticky top-24">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white px-4 py-3 text-sm font-semibold">Live visual</div>
          <div className="p-4">
            <Visual activeId={activeId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scrolly;
