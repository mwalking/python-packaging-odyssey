import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';

const VenvViz = ({ index }) => {
  const ref = useRef();
  const width = 600;
  const height = 500;
  
  // Use refs to persist D3 simulation and data across renders
  const simulationRef = useRef();
  const nodesRef = useRef([]);
  const linksRef = useRef([]);

  // Define the layout structure
  const layout = {
    system: { x: width / 2, y: 100 },
    projectA: { x: width / 4, y: 350 },
    projectB: { x: 3 * width / 4, y: 350 },
  };

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('.viz-content').remove(); // Clear previous renders
    const g = svg.append('g').attr('class', 'viz-content');

    // --- Draw static environment boxes ---
    const environments = [
      { id: 'system', label: 'System Python', ...layout.system, width: 200, height: 80 },
      { id: 'projectA', label: 'Project A Env', ...layout.projectA, width: 220, height: 120 },
      { id: 'projectB', label: 'Project B Env', ...layout.projectB, width: 220, height: 120 },
    ];
    
    g.selectAll('.env-box')
      .data(environments)
      .enter()
      .append('rect')
        .attr('class', 'env-box')
        .attr('x', d => d.x - d.width / 2)
        .attr('y', d => d.y - d.height / 2)
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('fill', '#F7FAFC')
        .attr('stroke', '#CBD5E0')
        .attr('rx', 8);

    g.selectAll('.env-label')
      .data(environments)
      .enter()
      .append('text')
        .attr('class', 'env-label')
        .attr('x', d => d.x)
        .attr('y', d => d.y - d.height / 2 - 10)
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'bold')
        .attr('fill', '#4A5568')
        .text(d => d.label);

    // --- Dynamic elements based on index ---
    let packages = [];
    let venvLinks = [];

    if (index >= 1) { // Create venv for Project A
      venvLinks.push({ source: layout.projectA, target: layout.system });
      packages.push({
        id: 'pandas1',
        version: 'Pandas 1.0',
        color: '#3182CE',
        radius: 50,
        ...layout.projectA
      });
    }
    if (index >= 2) { // Create venv for Project B
      venvLinks.push({ source: layout.projectB, target: layout.system });
      packages.push({
        id: 'pandas2',
        version: 'Pandas 2.0',
        color: '#C53030',
        radius: 50,
        ...layout.projectB
      });
    }

    // --- Draw Venv Links (Pointers) ---
    const linkGroup = g.append('g').attr('class', 'links');
    const links = linkGroup.selectAll('line')
      .data(venvLinks)
      .enter()
      .append('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .attr('stroke', '#718096')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0);
    
    links.transition().duration(500).delay(200).attr('opacity', 1);

    // --- Draw Package Nodes ---
    const nodeGroup = g.append('g').attr('class', 'nodes');
    const nodes = nodeGroup.selectAll('.node-group')
      .data(packages, d => d.id)
      .enter()
      .append('g')
        .attr('class', 'node-group')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodes.append('rect')
      .attr('x', d => -d.radius)
      .attr('y', d => -d.radius/3)
      .attr('width', d => d.radius * 2)
      .attr('height', d => d.radius * 2 / 3)
      .attr('rx', 8)
      .attr('fill', d => d.color)
      .attr('transform', 'scale(0)')
      .transition()
      .duration(750)
      .ease(d3.easeElastic)
      .delay((d, i) => i * 200 + 500)
      .attr('transform', 'scale(1)');

    nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .text(d => d.version)
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .delay((d, i) => i * 200 + 800)
      .attr('opacity', 1);
      
  }, [index]);

  return (
    <svg ref={ref} width={width} height={height} viewBox={`0 0 ${width} ${height}`} />
  );
};

export default VenvViz;