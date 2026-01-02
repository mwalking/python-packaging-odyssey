import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import Takeaways from '../../components/Chapter/Takeaways';
import Pep517Diagram from '../../visuals/Pep517Diagram';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'legacy',
    label: 'The Dark Ages',
    title: 'setup.py install',
    body: (
      <>
        <p>
          In the early days, installing a package meant downloading a tarball, unpacking it, and running <code>python setup.py install</code>.
        </p>
        <p>
          This was flawed for two reasons:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li><strong>Arbitrary Code Execution:</strong> You are asking the user to run a Python script on their machine just to install a library. This script could do anything—delete files, mine crypto, or just crash.</li>
          <li><strong>The Chicken and Egg Problem:</strong> If your <code>setup.py</code> imports <code>numpy</code> to compile some C code... how do you install numpy? You can't declare it as a dependency, because you need it <em>before</em> you can read the dependency metadata.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'toml',
    label: 'The Solution',
    title: 'PEP 518: pyproject.toml',
    body: (
      <>
        <p>
          The community solved the Chicken/Egg problem with <strong>PEP 518</strong>. 
          It introduced <code>pyproject.toml</code>, a static configuration file that exists <em>outside</em> of Python execution.
        </p>
        <p>
          This file contains a special table: <code>[build-system]</code>. 
          It tells the installer exactly what tools are needed to build the project, <em>before</em> the project code is ever touched.
        </p>
        <pre className="text-xs bg-slate-100 p-2 rounded mt-2 border border-slate-200">
{`[build-system]
requires = ["hatchling", "numpy>=1.20"]
build-backend = "hatchling.build"`}
        </pre>
      </>
    ),
  },
  {
    id: 'isolation',
    label: 'Safety',
    title: 'Build Isolation',
    body: (
      <>
        <p>
          Now, when you run <code>pip install .</code>, pip does something clever. 
          It reads the TOML file and creates a temporary, empty virtual environment called the <strong>Isolated Build Environment</strong>.
        </p>
        <p>
          It downloads the tools listed in <code>requires</code> (like <code>hatchling</code>) and installs them into this bubble. 
          This ensures that your local environment (which might have a weird, broken version of Hatch) does not contaminate the build process.
        </p>
      </>
    ),
  },
  {
    id: 'build',
    label: 'Compilation',
    title: 'PEP 517: The Backend Hook',
    body: (
      <>
        <p>
          With the tools installed, Pip (the "Frontend") calls the "Backend" (Hatchling) via a standardized interface defined in <strong>PEP 517</strong>.
        </p>
        <p>
          It essentially says: <em>"Here is the source code. Please build me a Wheel."</em>
        </p>
        <p>
          The backend takes over. It compiles C extensions, gathers asset files, and validates metadata. 
          Because it is running in the isolated environment, it has access to exactly the dependencies it requested.
        </p>
      </>
    ),
  },
  {
    id: 'wheel',
    label: 'Artifact',
    title: 'The Wheel (.whl)',
    body: (
      <>
        <p>
          The output of this process is a <strong>Wheel</strong>. 
          This is a ZIP archive containing the ready-to-use code and a <code>dist-info</code> directory.
        </p>
        <p>
          Crucially, a Wheel is "built". It does not require a compiler to install. 
          It does not execute arbitrary code on installation. It is just files.
        </p>
      </>
    ),
  },
  {
    id: 'install',
    label: 'Finale',
    title: 'Installation',
    body: (
      <>
        <p>
          Finally, Pip takes the Wheel and unzips it into your target <code>site-packages</code> directory. 
          It generates a `RECORD` file (a manifest of every file installed) so it can uninstall them later.
        </p>
        <p>
          The Isolated Build Environment is deleted, leaving no trace. 
          This is the modern, safe, and reproducible way to install Python software.
        </p>
      </>
    ),
  },
];

const PipContent = () => (
  <article className="pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        The Build Backend Architecture
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
         We often think of <code>pip install</code> as a simple file copy. 
         In reality, it is a complex orchestration of build frontends, backends, and ephemeral environments. 
         This architecture (PEP 517/518) saved Python packaging from the chaos of <code>setup.py</code>.
      </p>
    </div>

    <Scrolly steps={steps} Visual={Pep517Diagram} isOverlay={true} />

    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-12">
      <div className="prose prose-lg prose-slate mx-auto">
        <h2>Why Separation of Concerns Matters</h2>
        <p>
          Before PEP 517, `pip` had to know how to build everything. It had logic for `distutils`, `setuptools`, and `egg` formats hardcoded inside it. 
          This made it impossible to innovate. If you wanted to write a new build tool for Rust extensions (like `maturin`), you couldn't, because pip didn't know how to talk to it.
        </p>
        <p>
          PEP 517 decoupled the <strong>Frontend</strong> (the user interface, like pip or uv) from the <strong>Backend</strong> (the builder, like flit, poetry-core, or hatchling).
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 not-prose">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Hatchling</h3>
            <p className="text-sm text-slate-600">The modern default. Strictly standards-compliant, extensible, and part of the PyPA (Python Packaging Authority). Great for general use.</p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Maturin</h3>
            <p className="text-sm text-slate-600">Built for Rust. It compiles Rust binaries and wraps them in Python bindings automatically. Essential for high-performance libraries like `pydantic` or `polars`.</p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Flit</h3>
            <p className="text-sm text-slate-600">The minimalist choice. If you just have a pure Python package and want to ship it to PyPI with zero configuration, Flit is perfect.</p>
         </div>
      </div>

      <div className="mt-12">
        <Callout
          title="Pro Tip: Disable Isolation for Debugging"
          body="Sometimes, build isolation hides errors. If a build is failing and you can't see why, you can run `pip install . --no-build-isolation`. This forces pip to use your CURRENT environment to build the package. This allows you to manually install build tools and debug the process interactively."
        />
      </div>

      <div className="mt-16">
        <Takeaways
          points={[
            'pyproject.toml (PEP 518) solves the "Chicken and Egg" dependency problem.',
            'Pip creates an ephemeral "Isolated Build Environment" to prevent pollution.',
            'PEP 517 defines the standard interface between Frontends (Pip) and Backends (Hatch).',
            'Always distribute Wheels. Source Distributions (sdist) require the user to build the code, which is slow and risky.',
          ]}
        />
      </div>

      <div className="mt-16 flex justify-end">
        <Button as="a" href="#/chapters/lockfiles" className="text-lg px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform bg-indigo-600 hover:bg-indigo-700 text-white" aria-label="Continue to lockfiles">
          Next: The SAT Solver (Lockfiles) →
        </Button>
      </div>
    </section>
  </article>
);

const chapter = {
  slug: 'pip-pyproject',
  title: 'The Build Backend Architecture',
  subtitle: 'PEP 517, Isolation, and the journey from Source to Wheel.',
  summary: 'Visualize the invisible factory that runs every time you type pip install.',
  readingTime: 12,
  tags: ['PEP 517', 'Architecture', 'Compilers'],
  component: PipContent,
};

export default chapter;
