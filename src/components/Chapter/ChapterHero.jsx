import React from 'react';
import Tag from '../ui/Tag';

const ChapterHero = ({ title, subtitle, readingTime, tags = [] }) => {
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-4">
        <div className="flex items-center gap-3">
          <Tag>Chapter</Tag>
          <span className="text-sm text-slate-500">{readingTime} min read</span>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChapterHero;
