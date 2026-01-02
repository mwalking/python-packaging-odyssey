import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import Takeaways from '../../components/Chapter/Takeaways';
import SysPathExplorer from '../../visuals/SysPathExplorer';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'intro',
    label: 'The Fundamentals',
    title: 'The Mechanics of Import',
    body: (
      <>
        <p>
          Every Python journey begins with a simple statement: <code>import numpy</code>. 
          To the beginner, this is a magical incantation. The interpreter somehow "knows" where the code lives. 
          But to the engineer, this is a mechanical process—a deterministic search algorithm that runs every time your code starts.
        </p>
        <p>
          This algorithm doesn't scan your entire hard drive. It doesn't look in your "Downloads" folder. 
          It scans a specific, finite list of directories stored in a variable called <code>sys.path</code>.
        </p>
        <p>
          If a file isn't in one of these folders, it doesn't exist to Python. 
          Understanding this list is the first step to dispelling the magic.
        </p>
      </>
    ),
  },
  {
    id: 'search-start',
    label: 'The Algorithm',
    title: 'Linear Resolution',
    body: (
      <>
        <p>
          Python behaves like a simple robot. When asked to find <code>numpy</code>, it starts at Index 0 of the <code>sys.path</code> list.
          It checks: "Is numpy here?" If no, it moves to Index 1.
        </p>
        <p>
          This process is synchronous and blocking. But more importantly, it is <strong>ordered</strong>.
          The position of a directory in this list determines its priority.
          A package in Index 0 will <em>always</em> override a package in Index 10.
        </p>
      </>
    ),
  },
  {
    id: 'search-hit',
    label: 'Standard Behavior',
    title: 'The Global Install',
    body: (
      <>
        <p>
          In a standard, out-of-the-box Python installation, most third-party libraries live in a system-wide directory called <code>site-packages</code>.
          This is typically the last entry in the path.
        </p>
        <p>
          For a single script, this is fine. The search robot skips the empty user directories, reaches the system folder, finds the library, and imports it.
          It’s simple. It works. Until you start your second project.
        </p>
      </>
    ),
  },
  {
    id: 'conflict',
    label: 'The Problem',
    title: 'The Single Namespace Collision',
    body: (
      <>
        <p>
          The fragility of Python's global state arises because <code>site-packages</code> is a <strong>flat namespace</strong>.
          Operating systems generally do not allow two folders with the exact same name to exist in the same parent directory.
        </p>
        <p>
          You cannot have <code>numpy/</code> (containing version 1.24) and <code>numpy/</code> (containing version 1.26) side-by-side.
          If Project A installs the older version, and Project B installs the newer one, the files on disk are physically overwritten.
        </p>
        <p>
          Project A is now broken. It attempts to import a function that no longer exists in the newer version. 
          This is the "Haunted Laptop" syndrome: code that worked yesterday breaks today, because of an action taken in a completely different project.
        </p>
      </>
    ),
  },
  {
    id: 'venv-prepend',
    label: 'The Solution',
    title: 'Hacking sys.path',
    body: (
      <>
        <p>
          This is where virtual environments (<code>venv</code>) come in. They are not heavy containers like Docker. 
          They don't virtualize the CPU or the network. They are a lightweight hack of the search path.
        </p>
        <p>
          When you "activate" an environment, you are essentially telling the Python interpreter to launch with a modified configuration.
          It <strong>prepends</strong> a new, project-specific directory (e.g., <code>.venv/lib/site-packages</code>) to the very front of <code>sys.path</code>.
        </p>
      </>
    ),
  },
  {
    id: 'venv-hit',
    label: 'Resolution',
    title: 'Shadowing the Global State',
    body: (
      <>
        <p>
          Now, when the search robot runs, it hits your project's folder (Index 1) <em>before</em> it hits the system folder (Index 3).
        </p>
        <p>
          It finds the local copy of <code>numpy</code> and stops immediately.
          The global copy might still exist later in the list, but it is effectively <strong>shadowed</strong>. 
          It is rendered invisible.
        </p>
        <p>
          This "Shadowing" behavior is the core mechanism of Python isolation. 
          It allows you to use `numpy==1.24` locally, even if the system has `numpy==1.26`, without any conflict.
        </p>
      </>
    ),
  },
];

const WhyEnvsContent = () => (
  <article className="pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        The Anatomy of an Import
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
        To understand Python packaging, we must stop treating <code>import</code> as magic. 
        It is a deterministic linear search over a list of strings. 
        Mastering <code>sys.path</code> is the difference between "it works on my machine" and engineering robust systems.
      </p>
    </div>

    <Scrolly steps={steps} Visual={SysPathExplorer} isOverlay={true} />

    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-12">
      <div className="prose prose-lg prose-slate mx-auto">
        <h2>Deep Dive: How is `sys.path` constructed?</h2>
        <p>
          When you type <code>python</code>, the interpreter initializes <code>sys.path</code> using a specific logic before running a single line of your code.
          It is not random. It follows a strict precedence order defined by the CPython runtime.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-100 text-indigo-700 font-mono font-bold px-3 py-1 rounded-full text-sm">Priority 1</span>
              <h3 className="text-xl font-bold m-0 text-slate-900">The Script Directory</h3>
           </div>
           <p className="text-slate-600 leading-relaxed">
              The folder containing the script you are running is <strong>always</strong> inserted at Index 0. 
              This is why you can <code>import utils</code> if <code>utils.py</code> is sitting right next to <code>main.py</code>.
              Note: If you run python as a REPL (just typing `python`), this index is an empty string, representing the current working directory.
           </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-100 text-indigo-700 font-mono font-bold px-3 py-1 rounded-full text-sm">Priority 2</span>
              <h3 className="text-xl font-bold m-0 text-slate-900">PYTHONPATH</h3>
           </div>
           <p className="text-slate-600 leading-relaxed">
              If you have set the <code>PYTHONPATH</code> environment variable, its contents are added next.
              This is an "escape hatch" often used in Docker containers, monorepos, or complex build systems to inject paths manually without changing code.
           </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-100 text-indigo-700 font-mono font-bold px-3 py-1 rounded-full text-sm">Priority 3</span>
              <h3 className="text-xl font-bold m-0 text-slate-900">Standard Library</h3>
           </div>
           <p className="text-slate-600 leading-relaxed">
              Next come the locations of the built-in standard library modules like <code>os</code>, <code>sys</code>, <code>math</code>, and <code>json</code>. 
              These usually live in a protected system directory like <code>/usr/lib/python3.11</code>.
           </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-100 text-indigo-700 font-mono font-bold px-3 py-1 rounded-full text-sm">Priority 4</span>
              <h3 className="text-xl font-bold m-0 text-slate-900">Site Packages</h3>
           </div>
           <p className="text-slate-600 leading-relaxed">
              Finally, the <code>site.py</code> module runs. It appends the <code>site-packages</code> directory. 
              <strong>This is the only mutable part of the system</strong> for package managers like pip.
              Virtual environments work by changing <em>which</em> site-packages directory gets added here.
           </p>
        </div>
      </div>

      <div className="mt-12">
         <Callout
           title="The Docker vs. Venv Distinction"
           body="It is a common misconception that Docker replaces virtual environments. Docker isolates the entire filesystem (OS, shared libraries, network, users). A virtual environment only isolates the Python path. While you *can* use system Python in Docker, using a venv inside Docker is still best practice. It prevents your application dependencies from conflicting with OS-level Python tools (like `apt` or `yum` implementations) that might share the system python."
         />
      </div>

      <div className="mt-16">
        <Takeaways
          points={[
            'Imports are resolved by a deterministic, linear search through `sys.path`.',
            'Virtual environments do not copy Python; they manipulate the `sys.path` order.',
            'Shadowing allows a local package to take precedence over a global one.',
            'There is no magic: you can always `print(sys.path)` to debug import errors.',
          ]}
        />
      </div>

      <div className="mt-16 flex justify-end">
        <Button as="a" href="#/chapters/venv" className="text-lg px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform bg-indigo-600 hover:bg-indigo-700 text-white" aria-label="Continue to the venv chapter">
          Next: Virtual Environments in Practice →
        </Button>
      </div>
    </section>
  </article>
);

const chapter = {
  slug: 'why-envs',
  title: 'The Mechanics of Import',
  subtitle: 'From magic to mechanics: How Python actually finds your code.',
  summary: 'A deep technical dive into sys.path, import resolution, and how environments exploit the search order.',
  readingTime: 12,
  tags: ['sys.path', 'Internals', 'Architecture'],
  component: WhyEnvsContent,
};

export default chapter;
