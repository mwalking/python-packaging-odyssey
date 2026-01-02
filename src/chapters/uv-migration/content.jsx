import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import UvMigration from '../../visuals/UvMigration';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'legacy',
    label: 'Context',
    title: 'The Legacy Project',
    body: (
      <>
        <p>
           You have an existing project. It uses <code>requirements.txt</code>. 
           It has a `venv` you created manually. 
           You aren't ready to rewrite your entire configuration yet.
        </p>
      </>
    ),
  },
  {
    id: 'pip-compat',
    label: 'Drop-in',
    title: 'uv pip install',
    body: (
      <>
        <p>
           Good news: uv has a "pip interface" that is a drop-in replacement.
           Just replace <code>pip install</code> with <code>uv pip install</code>.
        </p>
        <p>
           It accepts the same flags: <code>-r requirements.txt</code>, <code>-e .</code>, etc.
           It respects your active virtual environment automatically.
        </p>
      </>
    ),
  },
  {
    id: 'speed',
    label: 'Performance',
    title: 'Immediate Gains',
    body: (
      <>
        <p>
           Even without changing your project structure, using `uv pip` gives you the caching and resolution speed benefits.
           CI/CD pipelines often see a 10-50x speedup just by swapping the binary.
        </p>
      </>
    ),
  },
];

const UvMigrationContent = () => (
  <article className="pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        Adopting uv in Existing Workflows
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
         You don't have to go "all in" on day one. 
         uv offers a compatibility layer that lets you use it as a supercharged pip, 
         respecting your existing `requirements.txt` and legacy venvs.
      </p>
    </div>

    <Scrolly steps={steps} Visual={UvMigration} isOverlay={true} />

    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-12">
      <div className="prose prose-lg prose-slate mx-auto">
        <h2>The Pip Interface</h2>
        <p>
           Many teams start by simply aliasing pip to uv in their CI pipelines.
        </p>
        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono">
{`# In your GitHub Actions or Dockerfile
RUN pip install uv
RUN uv pip install -r requirements.txt`}
        </pre>
        <p>
           This creates/updates the environment exactly like standard pip, but much faster. 
           It does not create a `uv.lock` file or change your project metadata. It is purely an installer optimization.
        </p>
      </div>
      
      <div className="mt-12">
         <Callout
           title="Compiling Requirements"
           body="If you use `pip-tools` (pip-compile), uv replaces that too. Run `uv pip compile requirements.in -o requirements.txt` to generate locked files instantly."
         />
      </div>

      <div className="mt-16 flex justify-end">
        <Button as="a" href="#/chapters/uv-new-project" className="text-lg px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform bg-indigo-600 hover:bg-indigo-700 text-white">
          Next: The uv Project Workflow →
        </Button>
      </div>
    </section>
  </article>
);

const chapter = {
  slug: 'uv-migration',
  title: 'Migrating to uv',
  subtitle: 'Using uv as a drop-in replacement for pip and pip-tools.',
  summary: 'How to speed up existing projects without changing their structure.',
  readingTime: 4,
  tags: ['Migration', 'CI/CD'],
  component: UvMigrationContent,
};

export default chapter;
