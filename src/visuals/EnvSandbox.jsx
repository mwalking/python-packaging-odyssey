import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { Shield, AlertTriangle, CheckCircle2, Box } from 'lucide-react';

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
      { name: 'pandas', version: '2.0', type: 'lib', replaced: '1.0', isConflict: true },
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
    message: 'python -m venv .venv creates a sandbox that isolates your project.',
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
      { name: 'pandas', version: '1.0 (project A)', type: 'lib', isSafe: true },
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
      { name: 'pandas', version: '1.0 (project A)', type: 'lib', isSafe: true },
    ],
    activeEnv: 'venv',
    message: 'Calling python -m pip ties installs to the right interpreter and keeps paths predictable.',
  },
};

const colorScale = d3
  .scaleOrdinal()
  .domain(['runtime', 'lib', 'tooling'])
  .range(['#6366f1', '#10b981', '#f59e0b']);

const EnvSandbox = ({ activeId }) => {
  const svgRef = useRef(null);
  
  // Default to 'hook' if activeId is missing or invalid
  const currentKey = activeId && scenarios[activeId] ? activeId : 'hook';
  const scenario = scenarios[currentKey];

  const nodes = useMemo(() => {
    const system = scenario.systemPackages.map((pkg, index) => ({
      ...pkg,
      environment: 'system',
      id: `sys-${pkg.name}`,
      yIndex: index,
    }));
    const env = scenario.envPackages.map((pkg, index) => ({
      ...pkg,
      environment: 'venv',
      id: `venv-${pkg.name}`,
      yIndex: index,
    }));
    return [...system, ...env];
  }, [scenario]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 520;
    const height = 300;
    
    // Clear previous renders if necessary, though D3 join handles updates.
    // For cleaner React transitions, we rely on D3's enter/update/exit.

    const xScale = d3
      .scalePoint()
      .domain(['system', 'venv'])
      .range([120, width - 120])
      .padding(0.5);

    const yScale = d3.scaleLinear().domain([0, 5]).range([50, height - 50]);

    const t = svg.transition().duration(600).ease(d3.easeCubicOut);

    // Data join
    const selection = svg.selectAll('g.node').data(nodes, (d) => d.id);

    // EXIT
    selection.exit()
      .transition(t)
      .attr('opacity', 0)
      .attr('transform', d => `translate(${xScale(d.environment)}, ${yScale(d.yIndex) + 20})`)
      .remove();

    // ENTER
    const nodeEnter = selection
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('opacity', 0)
      .attr('transform', (d) => `translate(${xScale(d.environment)}, ${yScale(d.yIndex) - 20})`);

    // Circle background
    nodeEnter
      .append('circle')
      .attr('r', 28)
      .attr('fill', '#fff')
      .attr('stroke-width', 2);

    // Text: Name
    nodeEnter
      .append('text')
      .attr('class', 'label-name')
      .attr('text-anchor', 'middle')
      .attr('dy', -2)
      .attr('font-size', 11)
      .attr('font-weight', 700)
      .attr('fill', '#1e293b')
      .style('pointer-events', 'none')
      .text((d) => d.name);

    // Text: Version
    nodeEnter
      .append('text')
      .attr('class', 'label-version')
      .attr('text-anchor', 'middle')
      .attr('dy', 12)
      .attr('font-size', 9)
      .attr('fill', '#64748b')
      .style('pointer-events', 'none')
      .text((d) => d.version);

    // UPDATE (merge enter + update)
    const nodeUpdate = selection.merge(nodeEnter);

    nodeUpdate
      .transition(t)
      .attr('opacity', 1)
      .attr('transform', (d) => `translate(${xScale(d.environment)}, ${yScale(d.yIndex)})`);

    // Update styles based on data changes (e.g. conflict status)
    nodeUpdate.select('circle')
      .transition(t)
      .attr('stroke', (d) => {
         if (d.isConflict) return '#ef4444'; // Red for conflict
         if (d.isSafe) return '#10b981';     // Green for safe
         return colorScale(d.type);
      })
      .attr('fill', (d) => {
         if (d.isConflict) return '#fef2f2';
         if (d.isSafe) return '#ecfdf5';
         return '#f8fafc';
      });
      
    // Update text content in case version changed on the same node ID (unlikely with current ID scheme but good practice)
    nodeUpdate.select('.label-version').text(d => d.version);

  }, [nodes, scenario.activeEnv]);

  const sysPath =
    scenario.activeEnv === 'venv'
      ? ['.venv/bin/python', '.venv/lib/site-packages', '/usr/lib/python3.11']
      : ['/usr/bin/python', '/usr/lib/python3.11/site-packages'];

  return (
    <div className="space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Current State</p>
          <p className="text-sm font-medium text-slate-800">{scenario.label}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
            scenario.activeEnv === 'venv' 
            ? 'bg-emerald-100 text-emerald-800' 
            : 'bg-amber-100 text-amber-800'
          }`}>
           {scenario.activeEnv === 'venv' ? <Shield className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
           {scenario.activeEnv === 'venv' ? 'Virtual Env Active' : 'System Python Active'}
        </div>
      </div>

      {/* Visualization Area */}
      <div className="relative rounded-xl bg-slate-50/50 border border-slate-200 overflow-hidden">
        {/* Background labels */}
        <div className="absolute top-4 left-0 w-full flex justify-between px-16 text-[10px] font-bold tracking-widest text-slate-400 uppercase pointer-events-none z-0">
          <span className="text-center w-24">System / Global</span>
          <span className="text-center w-24">Project .venv</span>
        </div>

        {/* D3 SVG */}
        <svg ref={svgRef} viewBox="0 0 520 300" className="w-full h-auto z-10 relative" />
      </div>

      {/* Sys.path Simulation */}
      <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 shadow-inner">
        <div className="flex items-center gap-2 mb-2 text-slate-500 border-b border-slate-800 pb-2">
           <span className="text-purple-400 font-bold">sys.path</span>
           <span>(Resolution Order)</span>
        </div>
        <div className="space-y-1.5">
          {sysPath.map((path, i) => (
            <div key={path} className={`flex items-center gap-2 ${i === 0 ? 'text-white font-bold' : 'text-slate-400'}`}>
               <span className="text-slate-600 w-4 text-right">{i + 1}.</span>
               <span>{path}</span>
               {i === 0 && <span className="ml-auto text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">Highest Priority</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Narrative Context */}
      <div className="flex gap-3 text-sm text-slate-600 bg-white border border-slate-100 rounded-lg p-3 shadow-sm">
        <div className="mt-0.5 shrink-0">
          {scenario.activeEnv === 'venv' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <Box className="w-5 h-5 text-indigo-500" />
          )}
        </div>
        <p className="leading-snug">{scenario.message}</p>
      </div>
    </div>
  );
};

export default EnvSandbox;
