import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
    <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
    <p className="text-slate-600">The odyssey does not have a page here yet. Try heading back home.</p>
    <Link to="/" className="text-indigo-600 font-semibold">
      Return home →
    </Link>
  </div>
);

export default NotFound;
