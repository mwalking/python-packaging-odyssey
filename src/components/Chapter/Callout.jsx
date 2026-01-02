import React from 'react';

const Callout = ({ title, body }) => (
  <div className="bg-slate-900 text-white rounded-xl p-6 space-y-2 shadow-lg">
    <p className="text-sm uppercase tracking-wide text-amber-300">{title}</p>
    <p className="text-slate-100 leading-relaxed">{body}</p>
  </div>
);

export default Callout;
