import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ChapterNav = ({ prev, next }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between mt-10">
      {prev ? (
        <Link
          to={`/chapters/${prev.slug}`}
          className="flex-1 inline-flex items-center justify-between border border-slate-200 rounded-lg p-4 bg-white hover:border-indigo-200 hover:shadow-sm transition"
        >
          <div className="flex items-center gap-2 text-slate-700">
            <ArrowLeft className="w-4 h-4" />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Previous</p>
              <p className="font-semibold">{prev.title}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          to={`/chapters/${next.slug}`}
          className="flex-1 inline-flex items-center justify-between border border-slate-200 rounded-lg p-4 bg-white hover:border-indigo-200 hover:shadow-sm transition"
        >
          <div className="flex items-center gap-2 text-slate-700">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Next</p>
              <p className="font-semibold">{next.title}</p>
            </div>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};

export default ChapterNav;
