import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, BookOpen, ChevronDown } from 'lucide-react';
import chapters from '../../chapters';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition hover:bg-white/70 ${
      isActive ? 'text-indigo-700' : 'text-slate-700'
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-900 font-semibold">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            Python Packaging Odyssey
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
              <div className="relative">
                <button
                  onClick={() => setChaptersOpen((v) => !v)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-white/70 flex items-center gap-1"
                >
                  Chapters
                  <ChevronDown className={`w-4 h-4 transition ${chaptersOpen ? 'rotate-180' : ''}`} />
                </button>
                {chaptersOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-xl border border-slate-200 p-3 space-y-1">
                    {chapters.map((chapter) => (
                      <NavLink
                        key={chapter.slug}
                        to={`/chapters/${chapter.slug}`}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-sm hover:bg-slate-50 ${
                            isActive ? 'bg-slate-100 text-indigo-700' : 'text-slate-700'
                          }`
                        }
                        onClick={() => setChaptersOpen(false)}
                      >
                        <div className="font-semibold">{chapter.title}</div>
                        <div className="text-xs text-slate-500">{chapter.subtitle}</div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
              <NavLink to="/glossary" className={navLinkClass}>
                Glossary
              </NavLink>
              <NavLink to="/resources" className={navLinkClass}>
                Resources
              </NavLink>
            </nav>

            <button className="md:hidden p-2 rounded-md hover:bg-white/70" onClick={() => setOpen((v) => !v)}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-sm">
          <div className="px-4 py-4 space-y-2">
            <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)} end>
              Home
            </NavLink>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Chapters</div>
              <div className="grid grid-cols-1 gap-2">
                {chapters.map((chapter) => (
                  <NavLink
                    key={chapter.slug}
                    to={`/chapters/${chapter.slug}`}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm border border-slate-200 hover:border-indigo-200 ${
                        isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    <div className="font-semibold">{chapter.title}</div>
                    <div className="text-xs text-slate-500">{chapter.subtitle}</div>
                  </NavLink>
                ))}
              </div>
            </div>
            <NavLink to="/glossary" className={navLinkClass} onClick={() => setOpen(false)}>
              Glossary
            </NavLink>
            <NavLink to="/resources" className={navLinkClass} onClick={() => setOpen(false)}>
              Resources
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
