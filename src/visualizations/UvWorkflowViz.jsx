import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// A robust dataset representing a Pandas dependency graph
const dependencyData = {
  nodes: [
    { id: 'pandas', group: 1, label: 'pandas' }, { id: 'numpy', group: 2, label: 'numpy' },
    { id: 'pytz', group: 2, label: 'pytz' }, { id: 'dateutil', group: 2, label: 'python-dateutil' },
    { id: 'six', group: 3, label: 'six' }, { id: 'tzdata', group: 3, label: 'tzdata' },
    ...Array.from({ length: 24 }, (_, i) => ({ id: `lib-${i}`, group: 3, label: `sub-dep-${i}` })),
  ],
  links: [
    { source: 'pandas', target: 'numpy' }, { source: 'pandas', target: 'pytz' },
    { source: 'pandas', target: 'dateutil' }, { source: 'dateutil', target: 'six' },
    { source: 'pytz', target: 'tzdata' },
    ...Array.from({ length: 24 }, (_, i) => ({ source: 'numpy', target: `lib-${i}` })),
  ],
};

const UvWorkflowViz = ({ index: currentStepIndex }) => {
  const ref = useRef();
  const width = 600;
  const height = 500;
  const d3Ref = useRef({});

  // Initial, one-time setup
  useEffect(() => {
    const svg = d3.select(ref.current).attr('width', width).attr('height', height).attr('viewBox', `0 0 ${width} ${height}`);
    d3Ref.current = {
      svg,
      fileGroup: svg.append('g').attr('class', 'file-group'),
      graphGroup: svg.append('g').attr('class', 'graph-group'),
      bubbleGroup: svg.append('g').attr('class', 'bubble-group'),
      simulation: d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(40))
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2)),
    };
  }, []);

  // Main animation logic, runs on step change
  useEffect(() => {
    const { svg, fileGroup, graphGroup, bubbleGroup, simulation } = d3Ref.current;
    if (!svg) return;

    const nodes = dependencyData.nodes.map(d => ({...d}));
    const links = dependencyData.links.map(d => ({...d}));
    
    // --- Clear state from previous step ---
    fileGroup.selectAll('*').transition().duration(200).attr('opacity', 0).remove();
    bubbleGroup.selectAll('*').transition().duration(200).attr('opacity', 0).remove();
    graphGroup.transition().duration(200).attr('opacity', currentStepIndex < 3 ? 1 : 0.2);

    const tick = () => {
        graphGroup.selectAll('.link').attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
        graphGroup.selectAll('.node').attr('cx', d => d.x).attr('cy', d => d.y);
    };

    simulation.nodes(nodes).force('link').links(links);
    simulation.alpha(1).tick(300).stop(); // Pre-calculate layout
    tick(); // Apply layout immediately

    // --- Render Base Graph (for steps 1, 2, 3) ---
    if (currentStepIndex >= 1) {
        graphGroup.selectAll('.link').data(links).join('line').attr('class', 'link').attr('stroke-width', 1.5).attr('stroke', currentStepIndex === 2 ? '#D69E2E' : '#718096');
        graphGroup.selectAll('.node').data(nodes).join('circle').attr('class', 'node').attr('r', 5).attr('fill', d => d.group === 1 ? '#C53030' : d.group === 2 ? '#DD6B20' : '#38A169');
        fileGroup.append('rect').attr('x', width / 2 - 50).attr('y', height / 2 - 15).attr('width', 100).attr('height', 30).attr('fill', '#4299E1').attr('rx', 4);
        fileGroup.append('text').attr('x', width / 2).attr('y', height / 2 + 5).text('pyproject.toml').attr('fill', 'white').attr('text-anchor', 'middle');
    }

    // --- Step-specific Logic ---
    switch (currentStepIndex) {
      case 0: // uv init
        graphGroup.selectAll('*').remove();
        const folder = fileGroup.append('g').attr('opacity', 0);
        folder.append('rect').attr('x', width / 2 - 150).attr('y', height / 2 - 100).attr('width', 300).attr('height', 200).attr('fill', '#2D3748').attr('rx', 8);
        folder.append('text').attr('x', width / 2).attr('y', height / 2 - 70).text('my-project/').attr('fill', 'white').attr('text-anchor', 'middle');
        folder.append('rect').attr('x', width / 2 - 75).attr('y', height / 2 - 25).attr('width', 150).attr('height', 50).attr('fill', '#4299E1').attr('rx', 4);
        folder.append('text').attr('x', width / 2).attr('y', height / 2 + 5).text('pyproject.toml').attr('fill', 'white').attr('text-anchor', 'middle');
        folder.transition().duration(500).attr('opacity', 1);
        break;

      case 2: // uv sync
        const lockFile = fileGroup.append('g').attr('opacity', 0);
        lockFile.append('rect').attr('x', width / 2 - 50).attr('y', height / 2 - 15).attr('width', 100).attr('height', 30).attr('fill', '#718096').attr('rx', 4).attr('stroke', '#FBBF24').attr('stroke-width', 2);
        lockFile.append('text').attr('x', width / 2).attr('y', height / 2 + 5).text('uv.lock').attr('fill', 'white').attr('text-anchor', 'middle');
        lockFile.transition().duration(500).attr('opacity', 1);
        break;

      case 3: // uv run
        const bubble = bubbleGroup.append('g').attr('opacity', 0);
        bubble.append('circle').attr('cx', width / 2).attr('cy', height / 2).attr('r', 100).attr('fill', '#63B3ED').attr('fill-opacity', 0.3).attr('stroke', '#63B3ED').attr('stroke-width', 3);
        bubble.append('text').attr('x', width / 2).attr('y', height / 2).attr('font-size', '24px').attr('text-anchor', 'middle').attr('dominant-baseline', 'central').text('▶️');
        bubble.append('text').attr('x', width / 2).attr('y', height / 2 + 40).attr('font-size', '14px').text('uv run').attr('fill', 'white').attr('text-anchor', 'middle');
        
        bubble.transition().duration(500).attr('opacity', 1)
          .transition().duration(300).ease(d3.easeCubicInOut).attr('transform', 'scale(1.1)')
          .transition().duration(300).ease(d3.easeCubicInOut).attr('transform', 'scale(1)')
          .transition().duration(500).delay(500).attr('opacity', 0).remove();
        break;
    }
  }, [currentStepIndex]);

  return <svg ref={ref} />;
};

export default UvWorkflowViz;