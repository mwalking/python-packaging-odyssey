import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import UvAdvancedRun from '../../visuals/UvAdvancedRun';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'script',
    label: 'PEP 723',
    title: 'Inline Script Metadata',
    body: (
      <>
        <p>
           Python scripts historically had no way to declare their own dependencies. 
           You had to ship a <code>requirements.txt</code> alongside a 10-line script.
        </p>
        <p>
           PEP 723 allows you to embed dependencies in a comment block at the top of the file.
        </p>
      </>
    ),
  },
  {
    id: 'run',
    label: 'Execution',
    title: 'uv run',
    body: (
      <>
        <p>
           When you execute <code>uv run my_script.py</code>, magic happens.
        </p>
        <p>
           uv parses the metadata block, resolving the dependencies instantly.
        </p>
      </>
    ),
  },
  {
    id: 'env',
    label: 'Isolation',
    title: 'Ephemeral Environments',
    body: (
      <>
        <p>
           It creates a temporary, throwaway virtual environment just for this execution. 
           It installs the required packages (using the global cache, so it's fast).
        </p>
      </>
    ),
  },
  {
    id: 'clean',
    label: 'Cleanup',
    title: 'Zero Trace',
    body: (
      <>
        <p>
           Once the script finishes, the environment is torn down (or cached for next time). 
           Your global environment remains pristine. No pollution.
        </p>
      </>
    ),
  },
];

const UvAdvancedContent = () => (
  <article className="pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        Advanced uv: Scripts & Tools
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
         Beyond project management, uv revolutionizes how we run standalone scripts and CLI tools.
      </p>
    </div>

    <Scrolly steps={steps} Visual={UvAdvancedRun} isOverlay={true} />

    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-12">
      <div className="prose prose-lg prose-slate mx-auto">
        <h2>uvx: Run Tools Instantly</h2>
        <p>
           Need to run <code>black</code>, <code>ruff</code>, or <code>httpie</code> but don't want to install them?
        </p>
        <p>
           <code>uvx ruff check .</code>
        </p>
        <p>
           This (like `npx` in the Node world) downloads the tool to a temporary environment and runs it. 
           It's the cleanest way to use Python CLIs.
        </p>
      </div>

      <div className="mt-16 flex justify-end">
        <Button as="a" href="#/" className="text-lg px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform bg-indigo-600 hover:bg-indigo-700 text-white">
          Complete the Odyssey (Home) →
        </Button>
      </div>
    </section>
  </article>
);

const chapter = {
  slug: 'uv-advanced',
  title: 'Advanced uv Usage',
  subtitle: 'Scripts, Ephemeral Envs, and uvx.',
  summary: 'Mastering the power features of uv for scripts and global tools.',
  readingTime: 5,
  tags: ['Advanced', 'Scripts'],
  component: UvAdvancedContent,
};

export default chapter;
