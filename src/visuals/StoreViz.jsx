import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DATA_STEPS = {
  'copy': { mode: 'copy', files: [], activeLink: null },
  'store': { mode: 'store', files: ['f1', 'f2'], activeLink: null },
  'link-a': { mode: 'link', project: 'A', files: ['f1', 'f2'], activeLink: 'A' },
  'link-b': { mode: 'link', project: 'B', files: ['f1', 'f2'], activeLink: 'B' },
};

const StoreViz = ({ activeId }) => {
  const svgRef = useRef(null);
  const step = DATA_STEPS[activeId] || DATA_STEPS['copy'];

  useEffect(() => {
    if (!svgRef.current) return;
    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const centerX = width / 2;
    const centerY = height / 2;

    // --- NODES ---
    // Central Store
    const storeGroup = svg.selectAll('.store').data([0]).join('g').attr('class', 'store');
    
    storeGroup.selectAll('circle')
      .data([0])
      .join('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .transition().duration(500)
      .attr('r', step.mode === 'copy' ? 0 : 50)
      .attr('fill', '#f1f5f9')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4 2');

    storeGroup.selectAll('text')
      .data([0])
      .join('text')
      .attr('x', centerX)
      .attr('y', centerY + 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .attr('fill', '#64748b')
      .attr('opacity', step.mode === 'copy' ? 0 : 1)
      .text('Global Cache');

    // Projects
    const projects = [
       { id: 'A', x: 150, y: 200, label: 'Project A' },
       { id: 'B', x: 450, y: 200, label: 'Project B' },
    ];

    const projGroups = svg.selectAll('.proj').data(projects).join('g').attr('class', 'proj')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    projGroups.append('circle')
      .attr('r', 40)
      .attr('fill', '#fff')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 2);
      
    projGroups.append('text')
      .attr('y', 55)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('fill', '#475569')
      .text(d => d.label);

    // --- FILES ---
    // In copy mode: Files appear inside projects directly.
    // In link mode: Files appear in store, then "links" appear in projects.
    
    // FILES IN STORE
    const storeFiles = svg.selectAll('.store-file')
       .data(step.mode === 'copy' ? [] : step.files);
       
    storeFiles.join('circle')
       .attr('class', 'store-file')
       .attr('cx', (d, i) => centerX - 10 + i*20)
       .attr('cy', centerY)
       .attr('r', 8)
       .attr('fill', '#6366f1')
       .transition().duration(500)
       .attr('opacity', 1);

    // LINKS / COPIES
    // We simulate files in projects
    const projFilesData = [];
    if (step.mode === 'copy') {
       // Files are physically in projects (simulated by copies)
       // Just visual filler for "legacy"
    } else if (step.activeLink) {
       // Create links
    }

    // --- BEAMS (Action) ---
    if (step.activeLink) {
       const target = projects.find(p => p.id === step.activeLink);
       
       const beam = svg.selectAll('.beam').data([target]);
       beam.enter().append('line')
          .attr('class', 'beam')
          .attr('x1', centerX)
          .attr('y1', centerY)
          .attr('x2', centerX) // start at center
          .attr('y2', centerY)
          .attr('stroke', '#10b981')
          .attr('stroke-width', 2)
          .transition().duration(500)
          .attr('x2', d => d.x)
          .attr('y2', d => d.y)
          .remove();
          
       // Show "Link" appearing
       setTimeout(() => {
          svg.append('text')
             .attr('x', target.x)
             .attr('y', target.y)
             .attr('text-anchor', 'middle')
             .attr('dy', 5)
             .attr('font-size', 20)
             .text('🔗')
             .attr('opacity', 0)
             .transition()
             .attr('opacity', 1)
             .transition().delay(1000).attr('opacity', 0).remove();
       }, 500);
    }
    
    // Copy Animation
    if (activeId === 'copy') {
       // Animate files flying from "internet" (top) to both projects
       const packets = svg.selectAll('.packet').data([0, 1]);
       packets.enter().append('circle')
          .attr('class', 'packet')
          .attr('cx', width/2)
          .attr('cy', -20)
          .attr('r', 8)
          .attr('fill', '#ef4444')
          .transition()
          .duration(1000)
          .attr('cy', 200)
          .attr('cx', (d, i) => i === 0 ? 150 : 450)
          .remove();
    }


  }, [activeId, step]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/50">
       <div className="absolute top-4 left-4 text-xs font-bold uppercase text-slate-400">
         Storage Model Visualization
       </div>
       <svg ref={svgRef} className="w-full max-w-3xl drop-shadow-sm" />
    </div>
  );
};

export default StoreViz;
