import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';

const DATA_STEPS = {
  'intro': {
    nodes: [
      { id: 'Root', group: 'app', r: 30, fx: 0, fy: -100 },
      { id: 'A', group: 'pkg', r: 20 },
      { id: 'B', group: 'pkg', r: 20 },
    ],
    links: [
      { source: 'Root', target: 'A' },
      { source: 'Root', target: 'B' },
    ]
  },
  'step1': { // Greedy A
    nodes: [
      { id: 'Root', group: 'app', r: 30, fx: 0, fy: -150 },
      { id: 'A', group: 'pkg', r: 25, label: 'A (v1.0)' },
    ],
    links: [
      { source: 'Root', target: 'A' }
    ]
  },
  'step2': { // A pulls in B-new
    nodes: [
      { id: 'Root', group: 'app', r: 30, fx: 0, fy: -150 },
      { id: 'A', group: 'pkg', r: 25, label: 'A (v1.0)' },
      { id: 'B', group: 'pkg', r: 25, label: 'B (v2.5)' },
    ],
    links: [
      { source: 'Root', target: 'A' },
      { source: 'A', target: 'B', label: '>=2.0' },
    ]
  },
  'step3': { // Root pulls in C
    nodes: [
      { id: 'Root', group: 'app', r: 30, fx: 0, fy: -150 },
      { id: 'A', group: 'pkg', r: 25, label: 'A (v1.0)' },
      { id: 'B', group: 'pkg', r: 25, label: 'B (v2.5)' },
      { id: 'C', group: 'pkg', r: 25, label: 'C (v1.0)' },
    ],
    links: [
      { source: 'Root', target: 'A' },
      { source: 'A', target: 'B', label: '>=2.0' },
      { source: 'Root', target: 'C' },
    ]
  },
  'conflict': { // C pulls B (conflict)
    nodes: [
      { id: 'Root', group: 'app', r: 30, fx: 0, fy: -150 },
      { id: 'A', group: 'pkg', r: 25, label: 'A (v1.0)' },
      { id: 'B', group: 'error', r: 30, label: 'B (v2.5)', conflict: true },
      { id: 'C', group: 'pkg', r: 25, label: 'C (v1.0)' },
    ],
    links: [
      { source: 'Root', target: 'A' },
      { source: 'A', target: 'B', label: '>=2.0' },
      { source: 'Root', target: 'C' },
      { source: 'C', target: 'B', label: '<2.0', error: true },
    ]
  },
  'backtrack': { // Removing B
     nodes: [
      { id: 'Root', group: 'app', r: 30, fx: 0, fy: -150 },
      { id: 'A', group: 'pkg', r: 25, label: 'A (v1.0)' },
      { id: 'C', group: 'pkg', r: 25, label: 'C (v1.0)' },
    ],
    links: [
      { source: 'Root', target: 'A' },
      { source: 'Root', target: 'C' },
    ]
  },
  'resolved': { // Correct B
     nodes: [
      { id: 'Root', group: 'app', r: 30, fx: 0, fy: -150 },
      { id: 'A', group: 'pkg', r: 25, label: 'A (v1.0)' },
      { id: 'B', group: 'pkg', r: 25, label: 'B (v1.9)', success: true },
      { id: 'C', group: 'pkg', r: 25, label: 'C (v1.0)' },
    ],
    links: [
      { source: 'Root', target: 'A' },
      { source: 'A', target: 'B', label: '>=2.0' },
      { source: 'Root', target: 'C' },
      { source: 'C', target: 'B', label: '<2.0' },
    ]
  }
};

const ResolverGraph = ({ activeId }) => {
  const svgRef = useRef(null);
  
  // Logic to map activeId to step data
  const currentStepKey = Object.keys(DATA_STEPS).includes(activeId) ? activeId : 'intro';
  const data = DATA_STEPS[currentStepKey];

  useEffect(() => {
    if (!svgRef.current) return;
    
    const width = 600;
    const height = 400;
    
    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', [-width / 2, -height / 2, width, height]);

    // Force Simulation
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(0, 50)) // Center slightly down
      .force('y', d3.forceY(0).strength(0.1));

    // --- LINKS ---
    // Join
    const linksGroup = svg.selectAll('.links-group').data([0]).join('g').attr('class', 'links-group');
    
    const link = linksGroup.selectAll('line')
      .data(data.links, d => `${d.source}-${d.target}`);

    link.exit().remove();

    const linkEnter = link.enter().append('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2);

    const linkMerge = linkEnter.merge(link)
      .attr('stroke', d => d.error ? '#ef4444' : '#94a3b8')
      .attr('stroke-dasharray', d => d.error ? '4 2' : null);

    // Link Labels
    const linkLabel = linksGroup.selectAll('text')
       .data(data.links, d => `${d.source}-${d.target}`);

    linkLabel.exit().remove();
    
    const linkLabelEnter = linkLabel.enter().append('text')
       .attr('font-size', 10)
       .attr('fill', '#64748b')
       .attr('text-anchor', 'middle')
       .attr('dy', -5);

    const linkLabelMerge = linkLabelEnter.merge(linkLabel)
       .text(d => d.label || '')
       .attr('fill', d => d.error ? '#ef4444' : '#64748b');


    // --- NODES ---
    const nodesGroup = svg.selectAll('.nodes-group').data([0]).join('g').attr('class', 'nodes-group');

    const node = nodesGroup.selectAll('g')
      .data(data.nodes, d => d.id);

    node.exit().transition().duration(500).attr('opacity', 0).remove();

    const nodeEnter = node.enter().append('g')
      .attr('cursor', 'grab');

    nodeEnter.append('circle')
      .attr('r', 0) // animate in
      .attr('fill', '#fff')
      .attr('stroke-width', 3)
      .transition().duration(500)
      .attr('r', d => d.r);

    nodeEnter.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', 10)
      .attr('font-weight', 'bold')
      .attr('pointer-events', 'none')
      .text(d => d.label || d.id);

    const nodeMerge = nodeEnter.merge(node);
    
    // Update Styles
    nodeMerge.select('circle')
      .transition().duration(500)
      .attr('stroke', d => {
         if (d.conflict) return '#ef4444';
         if (d.success) return '#10b981';
         if (d.group === 'app') return '#6366f1';
         return '#cbd5e1';
      })
      .attr('fill', d => {
         if (d.conflict) return '#fef2f2';
         if (d.success) return '#ecfdf5';
         if (d.group === 'app') return '#eef2ff';
         return '#fff';
      });

    nodeMerge.select('text')
       .text(d => d.label || d.id)
       .attr('fill', d => {
          if (d.conflict) return '#ef4444';
          if (d.success) return '#059669';
          if (d.group === 'app') return '#4338ca';
          return '#475569';
       });

    // Conflict Animation
    if (activeId === 'conflict') {
       nodeMerge.filter(d => d.conflict)
          .select('circle')
          .transition()
          .duration(100)
          .ease(d3.easeLinear)
          .attr('transform', 'translate(2, 0)')
          .transition()
          .attr('transform', 'translate(-2, 0)')
          .transition()
          .attr('transform', 'translate(0, 0)')
          .on('end', function repeat() {
             d3.select(this)
                .transition().duration(100).attr('transform', 'translate(2, 0)')
                .transition().attr('transform', 'translate(-2, 0)')
                .transition().attr('transform', 'translate(0, 0)')
                .on('end', repeat);
          });
    } else {
       nodeMerge.select('circle').interrupt(); // Stop animation
    }

    // Simulation Tick
    simulation.nodes(data.nodes).on('tick', () => {
      nodeMerge.attr('transform', d => `translate(${d.x}, ${d.y})`);
      
      linkMerge
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      linkLabelMerge
         .attr('x', d => (d.source.x + d.target.x) / 2)
         .attr('y', d => (d.source.y + d.target.y) / 2);
    });

    simulation.force('link').links(data.links);
    simulation.alpha(1).restart();

    // Clean up
    return () => simulation.stop();

  }, [data, activeId]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/50">
       <div className="absolute top-4 left-4 text-xs font-bold uppercase text-slate-400">
         Resolver Graph (Force Directed)
       </div>
       <svg ref={svgRef} className="w-full h-full max-h-[500px] drop-shadow-sm" />
       <div className="absolute bottom-8 text-center max-w-md text-sm text-slate-500">
          Dependency Resolution is a graph traversal problem.
       </div>
    </div>
  );
};

export default ResolverGraph;