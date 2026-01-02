import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import UvInstallation from '../../visuals/UvInstallation';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'curl',
    label: 'Install',
    title: 'The Standalone Binary',
    body: (
      <>
        <p>
           The recommended way to install uv is via their standalone installer script. 
           This fetches a pre-compiled binary for your specific OS and architecture (macOS, Linux, Windows).
        </p>
        <p>
           Unlike pip-based tools, uv does not depend on a system Python to run. It is self-contained.
        </p>
      </>
    ),
  },
  {
    id: 'pip',
    label: 'Alternative',
    title: 'Installing via Pip',
    body: (
      <>
        <p>
           If you prefer, you can strictly install uv as a Python package: <code>pip install uv</code>.
        </p>
        <p>
           However, the standalone install is preferred because it allows uv to manage Python versions for you without circular dependencies.
        </p>
      </>
    ),
  },
  {
    id: 'verify',
    label: 'Verification',
    title: 'Check Version',
    body: (
      <>
        <p>
           Once installed, verify it works. The CLI is extremely responsive.
        </p>
        <p>
           <code>uv --version</code> should return instantly.
        </p>
      </>
    ),
  },
  {
    id: 'update',
    label: 'Maintenance',
    title: 'Self Update',
    body: (
      <>
        <p>
           Because uv is a single binary, updating it is trivial. 
           Just run <code>uv self update</code>. It replaces itself with the latest version in milliseconds.
        </p>
      </>
    ),
  },
];

const UvInstallContent = () => (
  <article className="pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        Installing uv
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
         Getting started is easy. Because uv is a standalone binary, it has zero dependencies. 
         You don't even need Python installed to install uv.
      </p>
    </div>

    <Scrolly steps={steps} Visual={UvInstallation} isOverlay={true} />

    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-12">
      <div className="prose prose-lg prose-slate mx-auto">
        <h2>Shell Autocompletion</h2>
        <p>
           A modern CLI isn't complete without tab completion. uv supports all major shells (bash, zsh, fish, powershell).
        </p>
        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`# Add this to your .zshrc or .bashrc
eval "$(uv generate-shell-completion zsh)"`}
        </pre>
        <p className="text-sm text-slate-600 mt-2">
           Restart your shell, and you can tab-complete commands like `uv add` or `uv lock`.
        </p>
      </div>

      <div className="mt-16 flex justify-end">
        <Button as="a" href="#/chapters/uv-migration" className="text-lg px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform bg-indigo-600 hover:bg-indigo-700 text-white">
          Next: Adopting into Existing Workflows →
        </Button>
      </div>
    </section>
  </article>
);

const chapter = {
  slug: 'uv-install',
  title: 'Installing uv',
  subtitle: 'Getting the binary, shell completions, and updates.',
  summary: 'How to install and configure uv on your machine.',
  readingTime: 3,
  tags: ['Setup', 'CLI'],
  component: UvInstallContent,
};

export default chapter;
