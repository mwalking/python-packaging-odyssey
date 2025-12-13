import React from 'react';
import { Link } from 'react-router-dom';
import { Github, BookOpenText, Sparkles, ListOrdered } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Python Packaging Odyssey
          </div>
          <p className="text-sm text-slate-400">
            A visual, interactive journey to demystify environments, packaging, and modern Python tooling.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/glossary" className="hover:text-white">Glossary</Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-white">Resources</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Chapters</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <Link to="/chapters/why-envs" className="hover:text-white">Why environments exist</Link>
            </li>
            <li>
              <Link to="/chapters/venv" className="hover:text-white">Virtual envs</Link>
            </li>
            <li>
              <Link to="/chapters/pip-pyproject" className="hover:text-white">pip & pyproject</Link>
            </li>
            <li>
              <Link to="/chapters/lockfiles" className="hover:text-white">Lockfiles</Link>
            </li>
            <li>
              <Link to="/chapters/uv" className="hover:text-white">uv</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Links</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <a
                href="https://github.com/mwalking/python-packaging-odyssey"
                className="flex items-center gap-2 hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </li>
            <li>
              <a href="#glossary" className="flex items-center gap-2 hover:text-white">
                <BookOpenText className="w-4 h-4" /> Glossary
              </a>
            </li>
            <li>
              <a href="#resources" className="flex items-center gap-2 hover:text-white">
                <ListOrdered className="w-4 h-4" /> Resources
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-xs text-slate-500">
        Built with Vite, React, Tailwind, Scrollama, and D3.
      </div>
    </footer>
  );
};

export default Footer;
