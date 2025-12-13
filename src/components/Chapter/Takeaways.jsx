import React from 'react';
import { Lightbulb } from 'lucide-react';

const Takeaways = ({ points = [] }) => (
  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-3">
    <div className="flex items-center gap-2 text-amber-700 font-semibold">
      <Lightbulb className="w-5 h-5" /> Key takeaways
    </div>
    <ul className="list-disc ml-5 text-amber-900 space-y-2">
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
);

export default Takeaways;
