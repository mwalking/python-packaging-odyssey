import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

const scenarios = {
  hook: {
    label: 'Yesterday it worked…',
    systemPackages: [
      { name: 'python', version: '3.11', type: 'runtime' },
      { name: 'pip', version: '23.x', type: 'tooling' },
      { name: 'pandas', version: '1.0', type: 'lib' },
    ],
    envPackages: [],
    activeEnv: 'system',
    message: 'Everything lives in global site-packages. One wrong install mutates all projects.',
  },
  conflict: {
    label: 'Global soup conflict',
    systemPackages: [
      { name: 'python', version: '3.11', type: 'runtime' },
      { name: 'pip', version: '23.x', type: 'tooling' },
      { name: 'pandas', version: '2.0', type: 'lib', replaced: '1.0' },
      { name: 'numpy', version: '2.x', type: 'lib' },
    ],
    envPackages: [],
    activeEnv: 'system',
    message: 'Installing pandas==2.0 overwrote the old version. Project A breaks overnight.',
  },
  venv: {
    label: 'Create a bubble',
    systemPackages: [
      { name: 'python', version: '3.11', type: 'runtime' },
      { name: 'pip', version: '23.x', type: 'tooling' },
      { name: 'pandas', version: '2.0', type: 'lib', replaced: '1.0' },
    ],
    envPackages: [
      { name: 'python', version: '3.11 → .venv/bin/python', type: 'runtime' },
    ],
    activeEnv: 'venv',
    message: 'python -m venv .venv gives you a sandbox that can shadow the global packages.',
  },
  venvSafe: {
    label: 'Install safely inside the venv',
    systemPackages: [
      { name: 'python', version: '3.11', type: 'runtime' },
      { name: 'pandas', version: '2.0', type: 'lib', replaced: '1.0' },
    ],
    envPackages: [
      { name: 'python', version: '3.11 → .venv/bin/python', type: 'runtime' },
      { name: 'pip', version: '23.x (venv)', type: 'tooling' },
      { name: 'pandas', version: '1.0 (project A)', type: 'lib' },
    ],
    activeEnv: 'venv',
    message: 'Inside the venv, you can pin pandas==1.0 without touching system Python.',
  },
  pip: {
    label: 'Use python -m pip',
    systemPackages: [
      { name: 'python', version: '3.11', type: 'runtime' },
      { name: 'pandas', version: '2.0', type: 'lib' },
    ],
    envPackages: [
      { name: 'python', version: '3.11 → .venv/bin/python', type: 'runtime' },
      { name: 'pip', version: '23.x (venv)', type: 'tooling' },
      { name: 'pandas', version: '1.0 (project A)', type: 'lib' },
    ],
    activeEnv: 'venv',
    message: 'Calling python -m pip ties installs to the right interpreter and keeps paths predictable.',
  },
};

const colorScale = d3
  .scaleOrdinal()
  .domain(['runtime', 'lib', 'tooling'])
  .range(['#4f46e5', '#22c55e', '#f59e0b']);

const EnvSandbox = ({ activeId }) => {
  const [scenarioKey, setScenarioKey] = useState('hook');
  const svgRef = useRef(null);

  useEffect(() => {
    if (activeId && scenarios[activeId]) {
      setScenarioKey(activeId);
    }
  }, [activeId]);

  const scenario = scenarios[scenarioKey];

  const nodes = useMemo(() => {
    const system = scenario.systemPackages.map((pkg, index) => ({
      ...pkg,
      environment: 'system',
      index,
    }));
    const env = scenario.envPackages.map((pkg, index) => ({
      ...pkg,
      environment: 'venv',
      index,
    }));
    return [...system, ...env];
  }, [scenario]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 520;
    const height = 320;
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const xScale = d3
      .scaleBand()
      .domain(['system', 'venv'])
      .range([40, width - 40])
      .padding(0.45);

    const yScale = d3.scaleLinear().domain([0, 6]).range([60, height - 40]);

    const selection = svg.selectAll('g.node').data(nodes, (d) => `${d.environment}-${d.name}`);

    const nodeEnter = selection
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${xScale(d.environment)}, ${yScale(d.index)})`);

    nodeEnter
      .append('circle')
      .attr('r', 26)
      .attr('fill', (d) => colorScale(d.type))
      .attr('opacity', 0.12)
      .attr('stroke', (d) => colorScale(d.type))
      .attr('stroke-width', 2.5);

    nodeEnter
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('fill', '#0f172a')
      .attr('font-size', 12)
      .attr('font-weight', 700)
      .text((d) => d.name);

    nodeEnter
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 20)
      .attr('fill', '#475569')
      .attr('font-size', 10)
      .text((d) => d.version);

    selection
      .merge(nodeEnter)
      .transition()
      .duration(500)
      .attr('transform', (d) => `translate(${xScale(d.environment)}, ${yScale(d.index)})`)
      .select('circle')
      .attr('stroke', (d) => colorScale(d.type))
      .attr('fill', (d) => colorScale(d.type))
      .attr('opacity', (d) => (d.environment === scenario.activeEnv ? 0.2 : 0.1));

    selection.exit().remove();
  }, [nodes, scenario.activeEnv]);

  const sysPath =
    scenario.activeEnv === 'venv'
      ? ['.venv/bin/python', '.venv/lib/python3.11/site-packages', '/usr/lib/python3.11']
      : ['/usr/bin/python', '/usr/lib/python3.11/site-packages'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Active view</p>
          <p className="text-lg font-semibold text-slate-900">{scenario.label}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setScenarioKey('conflict')}
            className="text-xs px-3 py-2 rounded-full bg-white border border-slate-200 hover:border-amber-300 hover:text-amber-700"
          >
            Trigger conflict
          </button>
          <button
            onClick={() => setScenarioKey('venvSafe')}
            className="text-xs px-3 py-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200"
          >
            Install inside venv
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className={`rounded-xl border ${scenario.activeEnv === 'system' ? 'border-amber-300 bg-amber-50/60' : 'border-slate-200 bg-white'} p-3`}>
          <div className="flex items-center gap-2 font-semibold text-slate-800 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> System Python
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>python → /usr/bin/python</li>
            <li>site-packages → /usr/lib/python3.11/site-packages</li>
            <li>Shared by every project</li>
          </ul>
        </div>
        <div className={`rounded-xl border ${scenario.activeEnv === 'venv' ? 'border-emerald-300 bg-emerald-50/60' : 'border-slate-200 bg-white'} p-3`}>
          <div className="flex items-center gap-2 font-semibold text-slate-800 mb-2">
            <Shield className="w-4 h-4 text-emerald-500" /> Virtual environment
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>python → .venv/bin/python</li>
            <li>site-packages → .venv/lib/python3.11/site-packages</li>
            <li>Only this project touches these files</li>
          </ul>
        </div>
      </div>
      <svg ref={svgRef} className="w-full h-[320px] bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200" />
      <div className="bg-slate-100 rounded-lg p-3 text-xs text-slate-700 border border-slate-200">
        <div className="font-semibold mb-1">sys.path</div>
        <div className="space-y-1">
          {sysPath.map((path) => (
            <div key={path} className="px-2 py-1 rounded bg-white border border-slate-200 font-mono text-[11px]">
              {path}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg p-3">
        {scenario.activeEnv === 'venv' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-500" />
        )}
        <span>{scenario.message}</span>
      </div>
    </div>
  );
};

export default EnvSandbox;
