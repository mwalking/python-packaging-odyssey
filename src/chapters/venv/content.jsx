import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import Takeaways from '../../components/Chapter/Takeaways';
import VenvLifecycle from '../../visuals/VenvLifecycle';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'intro',
    label: 'Zero State',
    title: 'A Clean Slate',
    body: (
      <>
        <p>
           We start with a simple project folder. Maybe you have a <code>main.py</code> or a <code>README.md</code>. 
           At this stage, if you run python, you are running the System Python.
        </p>
        <p>
           Any package you install now would go to the global site-packages, potentially breaking your OS tools.
           We need a sandbox.
        </p>
      </>
    ),
  },
  {
    id: 'create',
    label: 'Creation',
    title: 'Summoning the Environment',
    body: (
      <>
        <p>
           Running <code>python -m venv .venv</code> creates a directory. That's it.
           It's not a background process or a daemon. It is just a folder containing a few binary symlinks (like `python3`) and an empty `lib/` directory.
        </p>
        <p>
           The name <code>.venv</code> is a convention. The leading dot hides it from your file explorer (on Unix systems), keeping your workspace visualy clean.
        </p>
      </>
    ),
  },
  {
    id: 'activate',
    label: 'Activation',
    title: 'Entering the Matrix',
    body: (
      <>
        <p>
           Running <code>source .venv/bin/activate</code> is the magic step. 
           This shell script modifies your shell's current session.
        </p>
        <p>
           It sets the <code>VIRTUAL_ENV</code> environment variable and prepends <code>.venv/bin</code> to your <code>PATH</code>.
           Now, when you type <code>python</code>, the shell finds the one in your local folder first.
           You are now "inside" the environment.
        </p>
      </>
    ),
  },
  {
    id: 'ignore',
    label: 'Best Practice',
    title: 'Git Ignore',
    body: (
      <>
        <p>
           <strong>Never commit your virtual environment.</strong>
        </p>
        <p>
           A venv is not portable. It contains absolute file paths and binaries specific to your machine's CPU architecture and OS.
           Committing it bloats the repo and breaks it for everyone else.
           Always add <code>.venv</code> to your <code>.gitignore</code> file immediately.
        </p>
      </>
    ),
  },
];

const VenvContent = () => (
  <article className="pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        Virtual Environments in Practice
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
         Now that we know the theory, let's master the mechanics. 
         Creating, activating, and destroying environments should be muscle memory for every Python developer.
      </p>
    </div>

    {/* Using Overlay layout for consistency and depth */}
    <Scrolly steps={steps} Visual={VenvLifecycle} isOverlay={true} />

    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-12">
      <div className="prose prose-lg prose-slate mx-auto">
         <h2>The Platform Cheatsheet</h2>
         <p>
            The Python community has standardized on `venv`, but the operating systems have not. 
            The activation command is the only friction point. Memorize the one for your daily driver.
         </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 not-prose">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl select-none">🍎</div>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            macOS & Linux (Bash/Zsh)
          </h3>
          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Create</div>
              <code className="bg-white px-4 py-3 rounded-lg border border-slate-200 block font-mono text-sm shadow-sm text-slate-700">python3 -m venv .venv</code>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Activate</div>
              <code className="bg-white px-4 py-3 rounded-lg border border-slate-200 block font-mono text-sm shadow-sm text-indigo-700 font-bold">source .venv/bin/activate</code>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl select-none">❖</div>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            Windows
          </h3>
          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Create</div>
              <code className="bg-white px-4 py-3 rounded-lg border border-slate-200 block font-mono text-sm shadow-sm text-slate-700">python -m venv .venv</code>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Activate (PowerShell)</div>
              <code className="bg-white px-4 py-3 rounded-lg border border-slate-200 block font-mono text-sm shadow-sm text-indigo-700 font-bold">.venv\Scripts\Activate.ps1</code>
            </div>
             <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Activate (CMD)</div>
              <code className="bg-white px-4 py-3 rounded-lg border border-slate-200 block font-mono text-sm shadow-sm text-slate-700">.venv\Scripts\activate.bat</code>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg prose-slate mx-auto mt-16">
        <h2>Philosophy: Cattle, Not Pets</h2>
        <p>
          In DevOps, servers are treated as "Cattle" (replaceable) rather than "Pets" (precious, unique). 
          You should treat your virtual environments the same way.
        </p>
        <p>
          If your environment starts acting weird—maybe you installed a conflicting package, or deleted a file by accident—<strong>do not try to fix it.</strong>
        </p>
        <p>
           The correct solution is always:
        </p>
        <ol>
           <li>Deactivate: <code>deactivate</code></li>
           <li>Delete the folder: <code>rm -rf .venv</code></li>
           <li>Recreate it: <code>python -m venv .venv</code></li>
           <li>Reinstall: <code>pip install ...</code> (or <code>uv sync</code>)</li>
        </ol>
        <p>
           This fearlessness is a superpower. It allows you to experiment wildly, knowing you are always 30 seconds away from a clean slate.
        </p>
      </div>

      <div className="mt-12">
        <Takeaways
          points={[
            'Standardize on `.venv` as your directory name.',
            'Always add `.venv` to `.gitignore` before your first commit.',
            'Memorize the activation command for your OS.',
            'Treat environments as disposable. When in doubt, delete and recreate.',
          ]}
        />
      </div>

      <div className="mt-16 flex justify-end">
        <Button as="a" href="#/chapters/pip-pyproject" className="text-lg px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform bg-indigo-600 hover:bg-indigo-700 text-white" aria-label="Continue to pip and pyproject">
          Next: Pip & pyproject.toml →
        </Button>
      </div>
    </section>
  </article>
);

const chapter = {
  slug: 'venv',
  title: 'Virtual Environments in Practice',
  subtitle: 'Creation, activation, and lifecycle management.',
  summary: 'Master the daily workflow of venv: create, activate, ignore, and destroy.',
  readingTime: 8,
  tags: ['Workflow', 'Git', 'CLI'],
  component: VenvContent,
};

export default chapter;
