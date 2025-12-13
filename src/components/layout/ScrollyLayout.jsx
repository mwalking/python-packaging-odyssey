import React, { useState, useRef } from 'react';
import { Scrollama, Step } from 'react-scrollama';

const ScrollyLayout = ({ id, steps, visualization: Visualization }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  return (
    <div id={id} className="flex relative">
      {/* Left Column: Scrolling Text */}
      <div className="w-1/2">
        <Scrollama onStepEnter={onStepEnter} offset={0.5}>
          {steps.map((step) => (
            <Step data={step.index} key={step.index}>
              <div className="h-screen flex items-center justify-center p-8 pointer-events-auto">
                <div className="bg-white/90 p-6 rounded-lg shadow-xl backdrop-blur-sm border border-gray-200 max-w-md">
                  {step.content}
                </div>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>

      {/* Right Column: Sticky Visualization */}
      <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center bg-slate-50 border-l border-slate-200">
        <div className="w-full h-full relative">
          <Visualization index={currentStepIndex} />
        </div>
      </div>
    </div>
  );
};

export default ScrollyLayout;