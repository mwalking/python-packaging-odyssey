import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DATA = {
  'fragmented': {
    nodes: [
      { id: 'pip', group: 'old', r: 30, label: 'pip' },
      { id: 'venv', group: 'old', r: 30, label: 'venv' },
      { id: 'twine', group: 'old', r: 30, label: 'twine' },
      { id: 'pyenv', group: 'old', r: 30, label: 'pyenv' },
      { id: 'poetry', group: 'old', r: 30, label: 'poetry' },
      { id: 'pip-tools', group: 'old', r: 30, label: 'pip-tools' },
    ],
    center: null
  },
  'unifying': {
    nodes: [
      { id: 'pip', group: 'old', r: 15, label: 'pip' },
      { id: 'venv', group: 'old', r: 15, label: 'venv' },
      { id: 'twine', group: 'old', r: 15, label: 'twine' },
      { id: 'pyenv', group: 'old', r: 15, label: 'pyenv' },
      { id: 'poetry', group: 'old', r: 15, label: 'poetry' },
      { id: 'pip-tools', group: 'old', r: 15, label: 'pip-tools' },
      { id: 'uv', group: 'new', r: 60, label: 'uv' },
    ],
    center: 'uv'
  },
  'unified': {
    nodes: [
      { id: 'uv', group: 'new', r: 80, label: 'uv' },
    ],
    center: 'uv'
  }
};

const UvToolConsolidation = ({ activeId }) => {
  const svgRef = useRef(null);
  const stepKey = ['fragmented', 'unifying', 'unified'].includes(activeId) ? activeId : 'fragmented';
  
  useEffect(() => {
    if (!svgRef.current) return;
    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', [-width/2, -height/2, width, height]);

    const data = DATA[stepKey];

    // Simulation
    const simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody().strength(stepKey === 'fragmented' ? -100 : -50))
      .force('x', d3.forceX().strength(0.1))
      .force('y', d3.forceY().strength(0.1))
      .force('collide', d3.forceCollide(d => d.r + 5));

    if (stepKey === 'unifying') {
       simulation.force('center', d3.forceRadial(0, 0, 0).strength(0.1));
    }

    const nodes = svg.selectAll('.node')
      .data(data.nodes, d => d.id);

    // EXIT
    nodes.exit()
       .transition().duration(500)
       .attr('opacity', 0)
       .remove();

    // ENTER
    const nodesEnter = nodes.enter().append('g')
      .attr('class', 'node')
      .attr('opacity', 0);

    nodesEnter.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => d.group === 'new' ? '#8b5cf6' : '#94a3b8')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    nodesEnter.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#fff')
      .attr('font-weight', 'bold')
      .attr('font-size', d => d.r / 2.5)
      .text(d => d.label);

    const nodesMerge = nodesEnter.merge(nodes);

    nodesMerge.transition().duration(500)
       .attr('opacity', 1);

    nodesMerge.select('circle')
       .transition().duration(500)
       .attr('r', d => d.r)
       .attr('fill', d => d.group === 'new' ? '#8b5cf6' : '#94a3b8');

    simulation.nodes(data.nodes).on('tick', () => {
       nodesMerge.attr('transform', d => `translate(${d.x}, ${d.y})`);
    });
    
    // Custom positioning for unified state
    if (stepKey === 'unified') {
       simulation.stop();
       nodesMerge.transition().duration(500).attr('transform', 'translate(0,0)');
    } else {
       simulation.alpha(1).restart();
    }

    return () => simulation.stop();

  }, [stepKey]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/50">
       <div className="absolute top-4 left-4 text-xs font-bold uppercase text-slate-400">
         Toolchain Consolidation
       </div>
       <svg ref={svgRef} className="w-full max-w-3xl drop-shadow-sm" />
    </div>
  );
};

export default UvToolConsolidation;
