import React from 'react';

const Tag = ({ children }) => {
  return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">{children}</span>;
};

export default Tag;
