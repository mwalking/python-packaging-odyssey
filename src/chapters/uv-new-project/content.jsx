import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import UvInitFlow from '../../visuals/UvInitFlow';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'empty',
    label: 'Start',
    title: 'Initialization',
    body: (
      <>
        <p>
           To fully embrace uv, we treat the project as a managed workspace (like Cargo for Rust or npm for Node).
        </p>
        <p>
           Run <code>uv init</code>. This generates a <code>pyproject.toml</code> tailored for uv. 
           It also creates a <code>.python-version</code> file to pin your interpreter version.
        </p>
      </>
    ),
  },
  {
    id: 'add',
    label: 'Dependencies',
    title: 'Adding Packages',
    body: (
      <>
        <p>
           Stop editing files manually. Run <code>uv add pandas</code>.
        </p>
        <p>
           This command does three things atomically:
        </p>
        <ol className="list-decimal pl-5 mt-2">
           <li>Adds `pandas` to <code>pyproject.toml</code>.</li>
           <li>Resolves the graph and updates <code>uv.lock</code>.</li>
           <li>Installs the package into the virtual environment.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'sync',
    label: 'Sync',
    title: 'Synchronization',
    body: (
      <>
        <p>
           The <code>uv sync</code> command is the heartbeat of this workflow. 
           It ensures that <code>pyproject.toml</code>, <code>uv.lock</code>, and the <code>.venv</code> folder are all in perfect harmony.
        </p>
        <p>
           If a teammate updates the lockfile and pushes it, you just run <code>uv sync</code> to match their state exactly.
        </p>
      </>
    ),
  },
];

const UvNewProjectContent = () => (
  <article className="pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        The uv Project Workflow
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
         This is the "Cargo" experience for Python. 
         No more manual venv creation. No more manual pip installs. 
         Just <code>init</code>, <code>add</code>, and <code>sync</code>.
      </p>
    </div>

    <Scrolly steps={steps} Visual={UvInitFlow} isOverlay={true} />

    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-12">
      <div className="prose prose-lg prose-slate mx-auto">
        <h2>Managing Python Versions</h2>
        <p>
           One of uv's best features is implicit Python management. 
           If your project requires Python 3.12, but you don't have it installed, <code>uv sync</code> will download a standalone build of Python 3.12 automatically.
        </p>
        <p>
           You no longer need <code>pyenv</code> or system package managers to onboard new developers. 
           The project defines its own runtime.
        </p>
      </div>

      <div className="mt-16 flex justify-end">
        <Button as="a" href="#/chapters/uv-advanced" className="text-lg px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform bg-indigo-600 hover:bg-indigo-700 text-white">
          Next: Advanced Usage →
        </Button>
      </div>
    </section>
  </article>
);

const chapter = {
  slug: 'uv-new-project',
  title: 'The uv Workflow',
  subtitle: 'Init, Add, Lock, Sync. The modern project lifecycle.',
  summary: 'Adopting the full uv workflow for robust, locked, and reproducible projects.',
  readingTime: 6,
  tags: ['Workflow', 'Best Practices'],
  component: UvNewProjectContent,
};

export default chapter;
