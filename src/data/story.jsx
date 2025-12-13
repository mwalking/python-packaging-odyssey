// src/data/story.js

export const globalSoupSteps = [
  {
    index: 0,
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4">The Global Soup</h2>
        <p className="mb-4">
          When you start with Python, everything lives in one place: 
          <code className="bg-gray-200 px-1 rounded text-sm mx-1">/usr/bin/python</code>.
        </p>
        <p>
          This is the <strong>System Python</strong>. It's shared by your OS and every project you create.
        </p>
      </>
    ),
  },
  {
    index: 1,
    content: (
      <>
        <h3 className="text-xl font-semibold mb-2">Project A Arrives</h3>
        <p>
          You start your first project. It needs <code className="text-blue-600 font-bold">Pandas v1.0</code>.
        </p>
        <div className="bg-gray-800 text-white p-3 rounded mt-4 font-mono text-sm">
          $ pip install pandas==1.0
        </div>
        <p className="mt-2 text-sm text-gray-500">
          (Watch the blue node enter the system on the right)
        </p>
      </>
    ),
  },
  {
    index: 2,
    content: (
      <>
        <h3 className="text-xl font-semibold mb-2">The Conflict</h3>
        <p>
          Months later, you start Project B. It requires features from <code className="text-red-600 font-bold">Pandas v2.0</code>.
        </p>
        <div className="bg-gray-800 text-white p-3 rounded mt-4 font-mono text-sm">
          $ pip install pandas==2.0
        </div>
        <p className="mt-4 text-red-600 font-bold">
          Warning: This overwrites the old version!
        </p>
      </>
    ),
  },
];

export const venvSteps = [
  {
    index: 0,
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4">The Quarantine (venv)</h2>
        <p>
          To solve conflicts, Python uses <strong>Virtual Environments</strong>.
        </p>
        <p className="mt-2">
          Think of a <code>venv</code> as a folder that mimics a full Python installation.
        </p>
      </>
    ),
  },
  {
    index: 1,
    content: (
      <>
        <h3 className="text-xl font-semibold mb-2">Creation</h3>
        <p>
          When you create a venv, you aren't installing Python again. You are creating a lightweight set of "pointers" (symlinks) to the original binary.
        </p>
        <div className="bg-gray-800 text-white p-3 rounded mt-4 font-mono text-sm">
          $ python -m venv .venv
        </div>
      </>
    ),
  },
  {
    index: 2,
    content: (
      <>
        <h3 className="text-xl font-semibold mb-2">Activation</h3>
        <p>
          This is the magic step. "Activating" hacks your shell's 
          <code className="bg-yellow-100 px-1 mx-1">PATH</code> variable.
        </p>
        <p className="mt-2">
          It tells your terminal: <em>"Look inside this folder BEFORE looking at the system."</em>
        </p>
      </>
    ),
  },
];

export const uvSteps = [
  // --- SUB-CHAPTER 1: INITIALIZATION ---
  {
    index: 0,
    title: "The Project-First Mindset",
    command: "uv init my-project",
    content: (
      <>
        <p>
          Legacy Python workflows focused on the <em>environment</em> (the venv folder). 
          <strong>uv</strong> focuses on the <em>project</em>.
        </p>
        <p className="mt-2">
          Running <code>uv init</code> creates a standard workspace with a 
          <code className="text-blue-600 font-bold mx-1">pyproject.toml</code> file. 
          This single file will declare everything your project needs.
        </p>
      </>
    ),
  },
  
  // --- SUB-CHAPTER 2: ADDING PACKAGES ---
  {
    index: 1,
    title: "The Resolution Burst",
    command: "uv add pandas",
    content: (
      <>
        <p>
          When you add a package, <code>uv</code> doesn't just install it. 
          It scans the entire dependency tree in milliseconds.
        </p>
        <p className="mt-2">
          It automatically:
        </p>
        <ul className="list-disc ml-5 mt-1 text-sm">
          <li>Resolves compatible versions (e.g., Pandas + NumPy + PyTZ).</li>
          <li>Updates <code>pyproject.toml</code>.</li>
          <li><strong>Hard-links</strong> packages from a global cache (saving disk space).</li>
        </ul>
      </>
    ),
  },

  // --- SUB-CHAPTER 3: LOCKING ---
  {
    index: 2,
    title: "The Universal Lock",
    command: "uv sync",
    content: (
      <>
        <p>
          Dependency hell happens when "it works on my machine" but fails on yours.
        </p>
        <p className="mt-2">
          <code>uv</code> creates a cross-platform <strong>uv.lock</strong> file. 
          This file freezes the <em>exact</em> SHA hash of every file.
        </p>
        <p className="mt-2 text-purple-600 font-bold">
          If the lockfile exists, the environment is guaranteed to be identical everywhere.
        </p>
      </>
    ),
  },

  // --- SUB-CHAPTER 4: EXECUTION ---
  {
    index: 3,
    title: "Ephemeral Execution",
    command: "uv run script.py",
    content: (
      <>
        <p>
          Forget <code>source venv/bin/activate</code>.
        </p>
        <p className="mt-2">
          <code>uv run</code> is magic. It creates a temporary, optimized environment just for this command, runs your script, and cleans up.
        </p>
        <p className="mt-2">
          It ensures you never accidentally run your script with the "wrong" python version.
        </p>
      </>
    ),
  },
];
