import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const UvInitFlow = ({ activeId }) => {
  const svgRef = useRef(null);
  
  // States: 'empty', 'init', 'add', 'lock'
  
  useEffect(() => {
    if (!svgRef.current) return;
    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const files = [];
    if (activeId !== 'empty') {
       files.push({ id: 'toml', label: 'pyproject.toml', color: '#f59e0b', x: 200, y: 100 });
       files.push({ id: 'pyver', label: '.python-version', color: '#64748b', x: 400, y: 100 });
       files.push({ id: 'git', label: '.gitignore', color: '#64748b', x: 300, y: 50 });
    }
    if (['add', 'lock', 'sync'].includes(activeId)) {
       files.push({ id: 'lock', label: 'uv.lock', color: '#10b981', x: 300, y: 200 });
    }
    if (['sync'].includes(activeId)) {
       files.push({ id: 'venv', label: '.venv/', color: '#8b5cf6', x: 300, y: 300 });
    }

    const t = svg.transition().duration(500);

    const items = svg.selectAll('.file').data(files, d => d.id);

    items.exit()
       .transition(t)
       .attr('opacity', 0)
       .attr('transform', d => `translate(${d.x}, ${d.y + 20})`)
       .remove();

    const enter = items.enter().append('g')
       .attr('class', 'file')
       .attr('transform', d => `translate(${d.x}, ${d.y - 20})`)
       .attr('opacity', 0);

    enter.append('rect')
       .attr('width', 100)
       .attr('height', 40)
       .attr('x', -50)
       .attr('y', -20)
       .attr('rx', 6)
       .attr('fill', d => d.color)
       .attr('stroke', '#fff')
       .attr('stroke-width', 2)
       .attr('filter', 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))');

    enter.append('text')
       .attr('text-anchor', 'middle')
       .attr('dy', '0.32em')
       .attr('fill', '#fff')
       .attr('font-size', 12)
       .attr('font-weight', 'bold')
       .text(d => d.label);

    enter.merge(items)
       .transition(t)
       .attr('transform', d => `translate(${d.x}, ${d.y})`)
       .attr('opacity', 1);

    // Connecting lines
    // (Simpler to redraw all lines)
    const lines = [];
    if (activeId === 'add' || activeId === 'lock' || activeId === 'sync') {
       lines.push({ from: {x: 200, y: 120}, to: {x: 300, y: 180} }); // toml -> lock
    }
    if (activeId === 'sync') {
       lines.push({ from: {x: 300, y: 220}, to: {x: 300, y: 280} }); // lock -> venv
    }

    const lineSel = svg.selectAll('.line').data(lines);
    lineSel.exit().remove();
    lineSel.enter().append('line')
       .attr('class', 'line')
       .attr('stroke', '#cbd5e1')
       .attr('stroke-width', 2)
       .attr('stroke-dasharray', '4 2')
       .merge(lineSel)
       .transition(t)
       .attr('x1', d => d.from.x).attr('y1', d => d.from.y)
       .attr('x2', d => d.to.x).attr('y2', d => d.to.y);

  }, [activeId]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/50">
       <div className="absolute top-4 left-4 text-xs font-bold uppercase text-slate-400">
         Project Structure Evolution
       </div>
       <svg ref={svgRef} className="w-full max-w-3xl drop-shadow-sm" />
    </div>
  );
};

export default UvInitFlow;
