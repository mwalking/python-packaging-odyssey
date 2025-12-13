import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../hooks/useD3';

const UvResolverViz = ({ currentStepIndex }) => {
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 600;
      svg.attr('viewBox', `0 0 ${width} ${height}`).selectAll("*").remove();

      let interval; // To hold the d3.interval for cleanup

      // --- STEP 1: PIP (SLOW) ---
      if (currentStepIndex === 1) {
        const pipNodes = Array.from({ length: 10 }, (_, i) => ({ id: i }));
        const pipLinks = Array.from({ length: 9 }, (_, i) => ({ source: i, target: i + 1 }));

        const resolvingText = svg.append('text')
            .attr('x', width / 2)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .style('font-size', '1.5em')
            .style('fill', 'orange')
            .text('Resolving...');

        function blink() {
            resolvingText.transition().duration(700)
                .attr('opacity', 0.5)
                .transition().duration(700)
                .attr('opacity', 1)
                .on('end', blink);
        }
        blink();

        let visibleNodesCount = 0;
        interval = d3.interval(() => {
          if (visibleNodesCount >= pipNodes.length) {
            interval.stop();
            return;
          }
          visibleNodesCount++;

          const nodesToShow = pipNodes.slice(0, visibleNodesCount);
          const linksToShow = pipLinks.slice(0, Math.max(0, visibleNodesCount - 1));
          
          svg.selectAll('.pip-link')
            .data(linksToShow, d => `${d.source.id}-${d.target.id}`)
            .join('line')
            .attr('class', 'pip-link')
            .attr('x1', d => 100 + d.source.id * 40).attr('y1', 150)
            .attr('x2', d => 100 + d.target.id * 40).attr('y2', 150)
            .attr('stroke', 'orange').attr('stroke-width', 2);

          svg.selectAll('.pip-node')
            .data(nodesToShow, d => d.id)
            .join('circle')
            .attr('class', 'pip-node')
            .attr('cx', d => 100 + d.id * 40).attr('cy', 150)
            .attr('r', 10).attr('fill', 'darkorange');

        }, 500);
      }

      // --- STEP 2 & 3: UV (FAST) ---
      if (currentStepIndex >= 2) {
        // Data
        const numNodes = 30;
        const uvNodes = Array.from({ length: numNodes }, (_, i) => ({ id: i }));
        const uvLinks = Array.from({ length: numNodes - 1 }, () => ({
          source: Math.floor(Math.random() * numNodes),
          target: Math.floor(Math.random() * numNodes)
        }));

        // Simulation
        const simulation = d3.forceSimulation(uvNodes)
          .force('link', d3.forceLink(uvLinks).id(d => d.id).distance(40))
          .force('charge', d3.forceManyBody().strength(-100))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .velocityDecay(0.6);

        // Render Links
        const link = svg.append("g").attr('stroke', '#999').attr('stroke-opacity', 0.6)
          .selectAll("line")
          .data(uvLinks)
          .join("line")
          .attr('stroke-width', 1.5);

        // Render Nodes
        const node = svg.append("g").attr('stroke', '#fff').attr('stroke-width', 1.5)
          .selectAll("circle")
          .data(uvNodes)
          .join("circle")
          .attr("r", 8)
          .attr("fill", 'purple');

        simulation.on('tick', () => {
          link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
              .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
          node.attr('cx', d => d.x).attr('cy', d => d.y);
        });
        
        // --- STEP 3: LOCK ---
        if (currentStepIndex === 3) {
            simulation.stop();
            const padlock = svg.append('g')
                .attr('transform', `translate(${width / 2 - 40}, ${height / 2 - 40}) scale(4)`)
                .attr('fill', 'none').attr('stroke', '#333').attr('stroke-width', 2)
                .attr('stroke-linecap', 'round').attr('stroke-linejoin', 'round')
                .attr('opacity', 0);

            padlock.append('rect').attr('x', 4).attr('y', 11).attr('width', 16).attr('height', 9).attr('rx', 2);
            padlock.append('path').attr('d', 'M8 11V7a4 4 0 0 1 8 0v4');

            padlock.transition().duration(500).attr('opacity', 1);
        }
      }

      // Cleanup function for d3.interval
      return () => {
        if (interval) {
          interval.stop();
        }
      };
    },
    [currentStepIndex]
  );

  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg ref={ref} />
    </div>
  );
};

export default UvResolverViz;
