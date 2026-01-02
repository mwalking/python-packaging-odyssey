import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DATA_STEPS = {
  'legacy': { phase: 'setup.py', activeNodes: ['Source', 'Pip', 'System'], particles: [] },
  'toml': { phase: 'config', activeNodes: ['Source', 'TOML', 'Pip'], particles: [{ from: 'Source', to: 'TOML' }] },
  'isolation': { phase: 'env', activeNodes: ['Pip', 'BuildEnv'], particles: [{ from: 'Pip', to: 'BuildEnv' }] },
  'build': { phase: 'backend', activeNodes: ['BuildEnv', 'Backend', 'Source'], particles: [{ from: 'Source', to: 'Backend' }] },
  'wheel': { phase: 'artifact', activeNodes: ['Backend', 'Wheel'], particles: [{ from: 'Backend', to: 'Wheel' }] },
  'install': { phase: 'install', activeNodes: ['Wheel', 'Pip', 'SitePackages'], particles: [{ from: 'Wheel', to: 'SitePackages' }] },
};

const NODES = [
  { id: 'Source', x: 100, y: 300, label: 'Source Code', type: 'file' },
  { id: 'TOML', x: 100, y: 150, label: 'pyproject.toml', type: 'config' },
  { id: 'Pip', x: 300, y: 50, label: 'Pip (Frontend)', type: 'tool' },
  { id: 'BuildEnv', x: 300, y: 200, label: 'Isolated Env', type: 'env' },
  { id: 'Backend', x: 300, y: 200, label: 'Backend (Hatch/Flit)', type: 'tool', parent: 'BuildEnv' }, // Inside Env
  { id: 'Wheel', x: 500, y: 200, label: 'Wheel (.whl)', type: 'artifact' },
  { id: 'SitePackages', x: 500, y: 350, label: 'Site Packages', type: 'dir' },
  { id: 'System', x: 300, y: 350, label: 'System Python', type: 'bad' }, // For legacy path
];

const Pep517Diagram = ({ activeId }) => {
  const svgRef = useRef(null);
  const step = DATA_STEPS[activeId] || DATA_STEPS['legacy'];

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // --- DEFS (Markers & Gradients) ---
    const defs = svg.select('defs').empty() ? svg.append('defs') : svg.select('defs');
    
    // Arrow marker
    defs.selectAll('marker')
      .data(['arrow'])
      .join('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', '#94a3b8')
      .attr('d', 'M0,-5L10,0L0,5');

    // --- DRAW NODES ---
    const nodeGroup = svg.selectAll('.nodes').data([0]).join('g').attr('class', 'nodes');

    const nodes = nodeGroup.selectAll('.node')
      .data(NODES, d => d.id);

    const nodesEnter = nodes.enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // Node Shapes
    nodesEnter.append('circle')
      .attr('r', 30)
      .attr('fill', '#fff')
      .attr('stroke-width', 2)
      .attr('stroke', '#cbd5e1');

    // Icons/Labels inside
    nodesEnter.append('text')
      .attr('dy', 45)
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .attr('font-weight', 'bold')
      .attr('fill', '#475569')
      .text(d => d.label);

    const nodesMerge = nodesEnter.merge(nodes);

    // Update active state
    nodesMerge.transition().duration(500)
      .attr('opacity', d => {
         if (activeId === 'legacy' && d.id === 'System') return 1;
         if (activeId !== 'legacy' && d.id === 'System') return 0; // Hide system in modern
         if (step.activeNodes.includes(d.id)) return 1;
         return 0.3;
      });
      
    nodesMerge.select('circle')
      .transition().duration(500)
      .attr('stroke', d => {
         if (d.id === 'System') return '#ef4444';
         if (step.activeNodes.includes(d.id)) return '#6366f1';
         return '#cbd5e1';
      })
      .attr('fill', d => {
         if (d.id === 'System') return '#fef2f2';
         if (step.activeNodes.includes(d.id)) return '#eef2ff';
         return '#fff';
      });

    // Special handling for Backend inside BuildEnv
    if (activeId === 'isolation' || activeId === 'build') {
       // Expand BuildEnv
       nodesMerge.filter(d => d.id === 'BuildEnv')
         .select('circle')
         .transition().duration(500)
         .attr('r', 50)
         .attr('stroke-dasharray', '4 2');
         
       // Show Backend inside
       nodesMerge.filter(d => d.id === 'Backend')
         .attr('opacity', 1)
         .attr('transform', `translate(300, 200) scale(0.6)`); // Center inside parent
    } else {
       nodesMerge.filter(d => d.id === 'BuildEnv')
         .select('circle')
         .transition().duration(500)
         .attr('r', 30)
         .attr('stroke-dasharray', null);
    }

    // --- PARTICLES (Flow) ---
    // We simulate flow by moving circles along paths
    const particleGroup = svg.selectAll('.particles').data([0]).join('g').attr('class', 'particles');
    
    // Define active flows based on step
    let flows = [];
    if (activeId === 'legacy') flows = [{ from: 'Source', to: 'System' }]; // Bad flow
    else if (activeId === 'toml') flows = [{ from: 'Source', to: 'Pip' }];
    else if (activeId === 'isolation') flows = [{ from: 'Pip', to: 'BuildEnv' }];
    else if (activeId === 'build') flows = [{ from: 'Source', to: 'BuildEnv' }];
    else if (activeId === 'wheel') flows = [{ from: 'BuildEnv', to: 'Wheel' }];
    else if (activeId === 'install') flows = [{ from: 'Wheel', to: 'SitePackages' }];

    const particles = particleGroup.selectAll('.particle')
       .data(flows, d => `${d.from}-${d.to}`);

    particles.exit().remove();

    const particlesEnter = particles.enter().append('circle')
       .attr('class', 'particle')
       .attr('r', 4)
       .attr('fill', activeId === 'legacy' ? '#ef4444' : '#6366f1');

    particlesEnter.merge(particles)
       .each(function(d) {
          const el = d3.select(this);
          const start = NODES.find(n => n.id === d.from);
          const end = NODES.find(n => n.id === d.to);
          
          function repeat() {
             el.attr('cx', start.x).attr('cy', start.y)
               .attr('opacity', 1)
               .transition()
               .duration(1000)
               .ease(d3.easeLinear)
               .attr('cx', end.x)
               .attr('cy', end.y)
               .on('end', repeat);
          }
          repeat();
       });

  }, [activeId, step]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/50">
       <div className="absolute top-4 left-4 text-xs font-bold uppercase text-slate-400">
         PEP 517 Build Diagram
       </div>
       <svg ref={svgRef} className="w-full max-w-3xl drop-shadow-sm" />
    </div>
  );
};

export default Pep517Diagram;
