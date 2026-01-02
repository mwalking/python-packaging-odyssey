import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import Takeaways from '../../components/Chapter/Takeaways';
import UvToolConsolidation from '../../visuals/UvToolConsolidation';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'fragmented',
    label: 'The Past',
    title: 'Tool Fragmentation',
    body: (
      <>
        <p>
           For years, Python packaging has been a scattered landscape. 
           We use <code>pip</code> for installing, <code>venv</code> for environments, <code>twine</code> for publishing, <code>pyenv</code> for Python versions, and <code>pip-tools</code> or <code>poetry</code> for locking.
        </p>
        <p>
           This fragmentation creates friction. Every tool has its own CLI arguments, configuration files, and quirks.
        </p>
      </>
    ),
  },
  {
    id: 'unifying',
    label: 'The Shift',
    title: 'Enter uv',
    body: (
      <>
        <p>
           <strong>uv</strong> is a single binary built by Astral (the creators of Ruff).
           It is designed to replace almost this entire stack.
        </p>
        <p>
           It is written in Rust, which gives it two superpowers: blinding speed and memory safety.
        </p>
      </>
    ),
  },
  {
    id: 'unified',
    label: 'The Present',
    title: 'The Unified Toolchain',
    body: (
      <>
        <p>
           With <code>uv</code>, you have one tool to rule them all. 
           It manages Python versions. It manages virtual environments. It resolves dependencies. It runs scripts.
        </p>
        <p>
           This is the "Cargo for Python" experience that the community has been waiting for.
        </p>
      </>
    ),
  },
];

const UvIntroContent = () => (
  <article className="pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        What is uv?
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
         The Python packaging ecosystem is famous for having "too many tools." 
         uv changes the game by collapsing the stack into a single, high-performance binary.
      </p>
    </div>

    <Scrolly steps={steps} Visual={UvToolConsolidation} isOverlay={true} />

    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-12">
      <div className="prose prose-lg prose-slate mx-auto">
        <h2>Why Rust?</h2>
        <p>
           uv is written in Rust, a systems programming language known for performance and safety. 
           Why does this matter for a package manager?
        </p>
        <ul>
           <li><strong>Startup Time:</strong> uv starts instantly. There is no Python interpreter overhead just to check a version.</li>
           <li><strong>Parallelism:</strong> Rust makes it easy to download and unzip hundreds of files in parallel across all your CPU cores.</li>
           <li><strong>Correctness:</strong> Rust's type system prevents entire classes of bugs (like race conditions) that plague complex concurrent tools.</li>
        </ul>
      </div>

      <div className="mt-12">
         <Callout
           title="Who is Astral?"
           body="Astral is the company behind Ruff, the extremely fast Python linter. They have a track record of rewriting Python tooling in Rust to achieve 10-100x performance improvements. uv is their take on the packaging problem."
         />
      </div>

      <div className="mt-16 flex justify-end">
        <Button as="a" href="#/chapters/uv-install" className="text-lg px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform bg-indigo-600 hover:bg-indigo-700 text-white">
          Next: Installing uv →
        </Button>
      </div>
    </section>
  </article>
);

const chapter = {
  slug: 'uv-intro',
  title: 'What is uv?',
  subtitle: 'The unified, high-performance successor to the Python toolchain.',
  summary: 'Understand the "Why" behind uv and how it consolidates pip, venv, and poetry into one binary.',
  readingTime: 5,
  tags: ['Intro', 'Rust', 'Tooling'],
  component: UvIntroContent,
};

export default chapter;
