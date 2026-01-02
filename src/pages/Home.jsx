import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles, Compass, Layers, Map, ChevronDown, ChevronUp, Package } from 'lucide-react';
import chapters from '../chapters';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Tag from '../components/ui/Tag';

const learnings = [
  'Why global site-packages become a source of haunted bugs',
  'How virtual environments isolate Python, site-packages, and scripts',
  'The anatomy of pyproject.toml and modern builds',
  'How lockfiles freeze dependency graphs for teammates',
  'Why uv is reshaping the Python packaging experience',
  'Reliable habits: python -m pip, .venv naming, and reproducible runs',
];

const Home = () => {
  const [uvExpanded, setUvExpanded] = useState(false);

  const standardChapters = chapters.filter(c => !c.slug.startsWith('uv-') && c.slug !== 'uv');
  const uvChapters = chapters.filter(c => c.slug.startsWith('uv-') || c.slug === 'uv');

  return (
    <div>
      <section className="bg-gradient-to-b from-white to-indigo-50/60 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
              <Sparkles className="w-4 h-4" />
              Interactive visual essay
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">Python Packaging Odyssey</h1>
              <div className="text-xl font-medium text-slate-500">By Mason Walker</div>
              <p className="text-lg text-slate-700 leading-relaxed">
                A guided, visual journey through environments, packaging, and the modern tools that keep Python projects sane.
                Scroll-friendly storytelling.
              </p>
            </div>
            <div className="flex gap-3">
              <Button as={Link} to="/chapters/why-envs" className="shadow">Start the Odyssey</Button>
              <Button as={Link} to="/resources" variant="ghost">
                Browse resources
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" /> 9 chapters
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" /> React + D3 scrollytelling
              </div>
            </div>
          </div>
          <Card className="p-6 space-y-4 bg-white/70 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Map className="w-4 h-4 text-indigo-600" /> Chapter map
            </div>
            <div className="space-y-3">
              {standardChapters.map((chapter) => (
                <Link key={chapter.slug} to={`/chapters/${chapter.slug}`} className="block border border-slate-200 rounded-lg p-3 flex items-start justify-between hover:border-indigo-300 hover:shadow-sm transition bg-white">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{chapter.title}</p>
                    <p className="text-xs text-slate-500">{chapter.subtitle}</p>
                  </div>
                  <Tag>{chapter.tags[0]}</Tag>
                </Link>
              ))}
              <Link to="/chapters/uv-intro" className="block border border-indigo-200 bg-indigo-50/50 rounded-lg p-3 flex items-start justify-between hover:border-indigo-300 hover:shadow-sm transition">
                 <div>
                    <p className="text-sm font-semibold text-indigo-900">The uv Era</p>
                    <p className="text-xs text-indigo-600">5 chapters on the modern unified toolchain</p>
                 </div>
                 <Tag>Advanced</Tag>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
          <Layers className="w-4 h-4 text-indigo-600" /> Chapters
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Standard Chapters */}
          {standardChapters.map((chapter) => (
            <Card key={chapter.slug} className="p-5 hover:shadow-md transition flex flex-col">
              <div className="flex flex-wrap gap-2 mb-3">
                {chapter.tags.slice(0, 3).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{chapter.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">{chapter.summary}</p>
              <div className="flex items-center justify-between text-sm text-slate-500 mt-auto">
                <span>{chapter.readingTime} min read</span>
                <Link to={`/chapters/${chapter.slug}`} className="inline-flex items-center gap-1 text-indigo-600 font-semibold">
                  Dive in <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}

          {/* UV Expansion Card */}
          <Card 
            className={`p-5 hover:shadow-md transition cursor-pointer border-indigo-200 bg-indigo-50/30 ${uvExpanded ? 'md:col-span-2 lg:col-span-3 ring-2 ring-indigo-500/20' : ''}`}
            onClick={() => setUvExpanded(!uvExpanded)}
          >
             <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                         <Package className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-slate-900">The uv Era</h3>
                         <p className="text-sm text-slate-500">The high-performance future of Python packaging</p>
                      </div>
                   </div>
                   <button className="text-indigo-600 hover:bg-indigo-100 p-1 rounded-full transition">
                      {uvExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                   </button>
                </div>
                
                {!uvExpanded && (
                   <p className="text-sm text-slate-600 leading-relaxed">
                      Click to reveal 5 chapters covering the new unified toolchain: installation, migration, project creation, and advanced workflows.
                   </p>
                )}

                {uvExpanded && (
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                      {uvChapters.map((chapter) => (
                         <div key={chapter.slug} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition shadow-sm">
                            <div className="flex flex-wrap gap-2 mb-2">
                               {chapter.tags.slice(0, 2).map((tag) => (
                                  <Tag key={tag}>{tag}</Tag>
                               ))}
                            </div>
                            <h4 className="font-bold text-slate-900 mb-1">{chapter.title}</h4>
                            <p className="text-xs text-slate-600 mb-3 line-clamp-2">{chapter.summary}</p>
                            <Link 
                               to={`/chapters/${chapter.slug}`} 
                               onClick={(e) => e.stopPropagation()}
                               className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                            >
                               Read Chapter <ArrowRight className="w-3 h-3" />
                            </Link>
                         </div>
                      ))}
                   </div>
                )}
             </div>
          </Card>

        </div>
      </section>

      <section className="bg-white border-y border-slate-200 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What you’ll learn</h2>
          <ul className="grid md:grid-cols-2 gap-3 text-slate-700">
            {learnings.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
