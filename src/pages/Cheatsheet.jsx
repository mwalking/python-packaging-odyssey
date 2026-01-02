import React from 'react';

const categories = [
  {
    title: 'Project Initialization',
    commands: [
      { cmd: 'uv init', desc: 'Initialize a new project with pyproject.toml in the current directory.' },
      { cmd: 'uv init <name>', desc: 'Create a new project directory with the given name.' },
      { cmd: 'uv init --lib', desc: 'Initialize a library project (as opposed to an application).' },
    ]
  },
  {
    title: 'Dependency Management',
    commands: [
      { cmd: 'uv add <package>', desc: 'Add a dependency to pyproject.toml and install it.' },
      { cmd: 'uv add --dev <package>', desc: 'Add a development dependency.' },
      { cmd: 'uv remove <package>', desc: 'Remove a dependency from the project.' },
      { cmd: 'uv sync', desc: 'Sync the environment with pyproject.toml and uv.lock.' },
      { cmd: 'uv lock', desc: 'Update the lockfile without installing packages.' },
    ]
  },
  {
    title: 'Python Management',
    commands: [
      { cmd: 'uv python install <version>', desc: 'Install a specific Python version (e.g., 3.12).' },
      { cmd: 'uv python list', desc: 'List installed Python versions.' },
      { cmd: 'uv python pin <version>', desc: 'Pin the project to a specific Python version.' },
    ]
  },
  {
    title: 'Running Commands',
    commands: [
      { cmd: 'uv run <script.py>', desc: 'Run a script in an isolated environment with dependencies declared inline.' },
      { cmd: 'uv run <command>', desc: 'Run a command within the project\'s environment (e.g., uv run pytest).' },
      { cmd: 'uv tool run <tool>', desc: 'Run a tool from a package without installing it globally (like pipx run).' },
    ]
  },
  {
    title: 'Tools',
    commands: [
      { cmd: 'uv tool install <package>', desc: 'Install a command-line tool globally.' },
      { cmd: 'uv tool list', desc: 'List globally installed tools.' },
    ]
  },
  {
    title: 'Pip Interface',
    commands: [
      { cmd: 'uv pip install <package>', desc: 'Low-level install command (like standard pip).' },
      { cmd: 'uv pip compile', desc: 'Compile requirements.in to requirements.txt.' },
      { cmd: 'uv pip sync', desc: 'Sync an environment with requirements.txt.' },
    ]
  }
];

const Cheatsheet = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-wide text-indigo-600">Reference</p>
      <h1 className="text-3xl font-bold text-slate-900">uv Cheatsheet</h1>
      <p className="text-slate-600">Common commands for the unified Python toolchain.</p>
    </div>

    <div className="grid gap-8 md:grid-cols-2">
      {categories.map((category) => (
        <div key={category.title} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">{category.title}</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {category.commands.map((item) => (
              <div key={item.cmd} className="p-4 group hover:bg-slate-50 transition-colors">
                <code className="text-sm font-mono text-indigo-600 font-bold block mb-1">{item.cmd}</code>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Cheatsheet;
