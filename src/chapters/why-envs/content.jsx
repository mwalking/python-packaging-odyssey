import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import Takeaways from '../../components/Chapter/Takeaways';
import EnvSandbox from '../../visuals/EnvSandbox';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'hook',
    label: 'Hook',
    title: '“It worked yesterday…”',
    body: 'Global Python feels friendly until an innocent pip install mutates the only copy of a library on your machine.',
  },
  {
    id: 'conflict',
    label: 'Villain',
    title: 'Shared site-packages become a haunted house',
    body: 'Project A depends on pandas==1.0. Project B upgrades to pandas==2.0. Because both share /usr/lib/python, Project A now crashes.',
  },
  {
    id: 'venv',
    label: 'Fix',
    title: 'Build a bubble with venv',
    body: 'python -m venv .venv creates a folder with its own python binary and site-packages. Activation simply prepends that folder to PATH.',
  },
  {
    id: 'venvSafe',
    label: 'Safety',
    title: 'Install inside the bubble',
    body: 'With the virtual environment active, pip installs land in .venv/lib/python3.11/site-packages, leaving your system Python untouched.',
  },
  {
    id: 'pip',
    label: 'Muscle memory',
    title: 'Use python -m pip for clarity',
    body: 'Invoking pip through the interpreter guarantees you are talking to the right site-packages and console scripts.',
  },
];

const WhyEnvsContent = () => (
  <article className="prose max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <p className="text-lg leading-relaxed text-slate-700">
      Python packages install into a directory called <code>site-packages</code>. If every project points at the same directory,
      whoever installed last wins. That is why Python has a reputation for “haunting” laptops after a single <code>pip install</code>.
    </p>

    <Callout
      title="The mental model"
      body="A Python environment is just a folder containing: (1) a python binary, (2) a site-packages directory, (3) console scripts. Swap the folder, swap the world your code runs in."
    />

    <div className="mt-12">
      <Scrolly steps={steps} Visual={EnvSandbox} />
    </div>

    <section className="mt-12 space-y-4">
      <h2>What actually happens during activation?</h2>
      <p>
        Activation does not change Python itself. It simply updates your shell environment variables. The most important change is
        that <code>.venv/bin</code> is pushed to the front of <code>PATH</code>, so running <code>python</code> or
        <code>pip</code> resolves to the copies inside the virtual environment.
      </p>
      <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm space-y-1">
        <div># created by python -m venv .venv</div>
        <div>source .venv/bin/activate</div>
        <div className="text-emerald-300">(.venv) $ echo $PATH</div>
        <div className="text-emerald-300">/Users/you/project/.venv/bin:/usr/bin:/bin</div>
      </div>
      <p>
        Deactivating simply removes that prefix. Nothing “magical” persists. That is why environments are disposable—you can delete
        them and recreate them whenever dependencies change.
      </p>
    </section>

    <section className="mt-12 space-y-4">
      <h2>Project muscle memory</h2>
      <ul>
        <li>Create the env: <code>python -m venv .venv</code></li>
        <li>Activate it: <code>source .venv/bin/activate</code> (or <code>.venv\\Scripts\\activate</code> on Windows)</li>
        <li>Install: <code>python -m pip install -r requirements.txt</code></li>
        <li>Run your code: <code>python main.py</code></li>
      </ul>
      <p>
        Following those four lines keeps each project self-contained. If something explodes, wipe the <code>.venv</code> folder and
        rebuild.
      </p>
    </section>

    <Takeaways
      points={[
        'Global site-packages are shared mutable state—perfect for conflicts.',
        'A virtual environment is just a folder with its own python binary and site-packages.',
        'Activating a venv only mutates PATH so your shell picks up the right tools.',
        'Use python -m pip to tie installations to the interpreter you expect.',
        'Environments are cheap to recreate; deleting .venv is a safe reset button.',
      ]}
    />

    <div className="mt-10 flex justify-end">
      <Button as="a" href="#/chapters/venv" className="shadow" aria-label="Continue to the venv chapter">
        Continue to virtual environments →
      </Button>
    </div>
  </article>
);

const chapter = {
  slug: 'why-envs',
  title: 'Why environments exist (and why your laptop gets haunted)',
  subtitle: 'Global site-packages are shared mutable state. Virtual environments are how we take back control.',
  summary: 'Meet the villain (global Python), learn the mental model for environments, and see how venv and python -m pip fix the haunted laptop problem.',
  readingTime: 10,
  tags: ['venv', 'pip', 'mental model', 'sys.path'],
  component: WhyEnvsContent,
};

export default chapter;
