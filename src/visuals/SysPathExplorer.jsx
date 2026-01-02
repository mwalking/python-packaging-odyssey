import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';

const DATA = {
  sysPath: [
    { id: 'script', path: '/app/src', type: 'user', contents: ['main.py', 'utils.py'] },
    { id: 'pythonpath', path: '$PYTHONPATH', type: 'config', contents: [] },
    { id: 'stdlib', path: '/usr/lib/python3.11', type: 'system', contents: ['os.py', 'sys.py', 'math.py', 'json/'] },
    { id: 'site-packages', path: '/usr/lib/site-packages', type: 'site', contents: ['requests/', 'numpy/'] },
  ],
  venvPath: [
    { id: 'script', path: '/app/src', type: 'user', contents: ['main.py', 'utils.py'] },
    { id: 'venv-site', path: '.venv/lib/site-packages', type: 'venv', contents: ['numpy/ (v1.24)', 'pandas/'] },
    { id: 'stdlib', path: '/usr/lib/python3.11', type: 'system', contents: ['os.py', 'sys.py', 'math.py'] },
    { id: 'site-packages', path: '/usr/lib/site-packages', type: 'site', contents: ['numpy/ (v1.26)', 'requests/'] },
  ]
};

const STEPS = {
  'intro': { mode: 'sysPath', searchIdx: -1, query: 'numpy', found: false },
  'search-start': { mode: 'sysPath', searchIdx: 0, query: 'numpy', found: false },
  'search-hit': { mode: 'sysPath', searchIdx: 3, query: 'numpy', found: true }, // Index 3 is site-packages
  'conflict': { mode: 'sysPath', searchIdx: 3, query: 'numpy', found: true, conflict: true },
  'venv-prepend': { mode: 'venvPath', searchIdx: -1, query: 'numpy', found: false },
  'venv-hit': { mode: 'venvPath', searchIdx: 1, query: 'numpy', found: true }, // Index 1 is venv
};

const SysPathExplorer = ({ activeId }) => {
  const svgRef = useRef(null);
  
  // Derive current state from activeId
  const state = STEPS[activeId] || STEPS['intro'];
  const pathData = DATA[state.mode];

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 100 };
    const innerWidth = width - margin.left - margin.right;

    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // --- SCALES ---
    const yScale = d3.scaleBand()
      .domain(d3.range(pathData.length))
      .range([margin.top, height - margin.bottom])
      .padding(0.4);

    const xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([margin.left, width - margin.right]);

    // --- DRAW PIPELINE (The "Path") ---
    // We render the path as a vertical stack of "Buckets" to imply order
    
    // Transitions
    const t = svg.transition().duration(750).ease(d3.easeCubicOut);

    // Data Binding for Buckets
    const buckets = svg.selectAll('.bucket')
      .data(pathData, d => d.id);

    // EXIT
    buckets.exit()
      .transition(t)
      .attr('opacity', 0)
      .attr('transform', `translate(-50, 0)`)
      .remove();

    // ENTER
    const bucketsEnter = buckets.enter()
      .append('g')
      .attr('class', 'bucket')
      .attr('transform', (d, i) => `translate(-50, ${yScale(i)})`)
      .attr('opacity', 0);

    // Bucket Background
    bucketsEnter.append('rect')
      .attr('width', innerWidth)
      .attr('height', yScale.bandwidth())
      .attr('rx', 8)
      .attr('fill', '#f8fafc')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 2);

    // Bucket Label (Path)
    bucketsEnter.append('text')
      .attr('class', 'path-label')
      .attr('x', 16)
      .attr('y', yScale.bandwidth() / 2)
      .attr('dy', '0.32em')
      .attr('font-family', 'monospace')
      .attr('font-size', 12)
      .attr('fill', '#64748b')
      .text(d => d.path);

    // Type Badge
    bucketsEnter.append('text')
      .attr('class', 'type-badge')
      .attr('x', innerWidth - 10)
      .attr('y', yScale.bandwidth() / 2)
      .attr('dy', '0.32em')
      .attr('text-anchor', 'end')
      .attr('font-size', 10)
      .attr('font-weight', 'bold')
      .attr('fill', d => {
         if (d.type === 'venv') return '#9333ea';
         if (d.type === 'site') return '#0ea5e9';
         return '#94a3b8';
      })
      .attr('opacity', 0.5)
      .text(d => d.type.toUpperCase());

    // UPDATE
    const bucketsMerge = bucketsEnter.merge(buckets);
    
    bucketsMerge.transition(t)
      .attr('transform', (d, i) => `translate(${margin.left}, ${yScale(i)})`)
      .attr('opacity', 1);

    bucketsMerge.select('rect')
      .transition(t)
      .attr('height', yScale.bandwidth())
      .attr('stroke', (d, i) => {
         if (i === state.searchIdx && state.found) return '#10b981'; // Green hit
         if (i === state.searchIdx) return '#6366f1'; // Indigo searching
         return '#e2e8f0';
      })
      .attr('stroke-width', (d, i) => i === state.searchIdx ? 3 : 2)
      .attr('fill', (d, i) => {
         if (i === state.searchIdx && state.found) return '#ecfdf5';
         if (i === state.searchIdx) return '#eef2ff';
         return '#f8fafc';
      });

    // --- SEARCH HEAD ---
    const head = svg.selectAll('.search-head').data(state.searchIdx >= 0 ? [state.searchIdx] : []);
    
    head.exit().transition().duration(200).attr('opacity', 0).remove();

    const headEnter = head.enter().append('g')
      .attr('class', 'search-head')
      .attr('opacity', 0);
    
    headEnter.append('circle')
      .attr('r', 6)
      .attr('fill', '#ef4444');
      
    headEnter.append('text')
      .attr('x', 12)
      .attr('dy', '0.32em')
      .attr('font-size', 12)
      .attr('font-weight', 'bold')
      .attr('fill', '#ef4444')
      .text(`Looking for "${state.query}"...`);

    headEnter.merge(head)
      .transition(t)
      .attr('opacity', 1)
      .attr('transform', d => `translate(${margin.left - 20}, ${yScale(d) + yScale.bandwidth()/2})`);
      
    headEnter.merge(head).select('text')
      .text(state.found ? `Found "${state.query}"!` : `Looking for "${state.query}"...`)
      .attr('fill', state.found ? '#10b981' : '#6366f1');
    
    headEnter.merge(head).select('circle')
      .attr('fill', state.found ? '#10b981' : '#6366f1');

    // --- CONTENTS PREVIEW (Files inside the bucket) ---
    // Only show contents if we are searching this bucket or found it here
    
    bucketsMerge.each(function(d, i) {
       const group = d3.select(this);
       const showContents = (i === state.searchIdx);
       
       const files = group.selectAll('.file').data(showContents ? d.contents : []);
       
       files.exit().remove();
       
       const filesEnter = files.enter().append('g')
          .attr('class', 'file')
          .attr('transform', (f, j) => `translate(${180 + j * 80}, ${yScale.bandwidth()/2})`)
          .attr('opacity', 0);
          
       filesEnter.append('rect')
          .attr('width', 70)
          .attr('height', 24)
          .attr('y', -12)
          .attr('rx', 4)
          .attr('fill', '#fff')
          .attr('stroke', '#cbd5e1');
          
       filesEnter.append('text')
          .attr('text-anchor', 'middle')
          .attr('x', 35)
          .attr('dy', '0.32em')
          .attr('font-size', 10)
          .attr('font-family', 'monospace')
          .text(f => f);
          
       filesEnter.merge(files)
          .transition()
          .delay((f, j) => j * 100)
          .attr('opacity', 1)
          .select('rect')
          .attr('stroke', f => f.startsWith(state.query) ? '#10b981' : '#cbd5e1')
          .attr('stroke-width', f => f.startsWith(state.query) ? 2 : 1);
    });

  }, [activeId, pathData, state]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/50">
       <div className="absolute top-4 left-4 text-xs font-bold uppercase text-slate-400">
         sys.path Visualization
       </div>
       <svg ref={svgRef} className="w-full max-w-3xl drop-shadow-sm" />
       <div className="absolute bottom-8 text-center max-w-md text-sm text-slate-500">
          {state.mode === 'sysPath' ? 'Standard Python Resolution' : 'Virtual Environment Resolution'}
       </div>
    </div>
  );
};

export default SysPathExplorer;