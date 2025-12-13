import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';

const GlobalSoupViz = ({ index }) => {
  const ref = useRef();
  const width = 500;
  const height = 400;

  // Use a ref to store the simulation and nodes so they persist across re-renders
  const simulationRef = useRef();
  const nodesRef = useRef([]);

  // Memoize static elements so they don't need recalculating
  const staticElements = useMemo(() => {
    return (
      <g>
        <rect
          x={50}
          y={50}
          width={width - 100}
          height={height - 100}
          fill="#F7FAFC"
          stroke="#CBD5E0"
          strokeWidth={2}
          rx={8}
        />
        <text
          x={width / 2}
          y={35}
          textAnchor="middle"
          fontSize="18px"
          fontWeight="bold"
          fill="#2D3748"
        >
          System Python
        </text>
      </g>
    );
  }, [width, height]);


  useEffect(() => {
    const svg = d3.select(ref.current);
    
    // Initialize simulation only once
    if (!simulationRef.current) {
      simulationRef.current = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(20))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => d.radius + 5))
        .on('tick', () => {
          svg.selectAll('.node-group')
             .attr('transform', d => `translate(${d.x}, ${d.y})`);
        });
    }
    
    const simulation = simulationRef.current;
    
    // --- Determine node state based on index ---
    let targetNodes = [];
    if (index === 1) {
      targetNodes = [{ id: 1, version: 'Pandas v1.0', color: '#3182CE', radius: 60 }];
    } else if (index >= 2) {
      // Create a new node that "replaces" the old one
      targetNodes = [{ id: 2, version: 'Pandas v2.0', color: '#C53030', radius: 60 }];
    }
    
    // --- D3 Data Join ---
    const nodeGroups = svg.selectAll('.node-group')
      .data(targetNodes, d => d.id)
      .join(
        enter => {
          const group = enter.append('g')
            .attr('class', 'node-group')
            .call(d3.drag() // Make nodes draggable for fun
                .on("start", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on("drag", (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on("end", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }));

          // Animate entry
          group.attr('transform', `translate(${width / 2}, ${height / 2}) scale(0)`)
               .transition()
               .duration(750)
               .ease(d3.easeElastic)
               .attr('transform', `translate(${width / 2}, ${height / 2}) scale(1)`);

          group.append('rect')
            .attr('x', d => -d.radius)
            .attr('y', d => -d.radius / 2.5)
            .attr('width', d => d.radius * 2)
            .attr('height', d => d.radius * 2 / 2.5)
            .attr('rx', 8)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .attr('fill', d => d.color);

          group.append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('fill', 'white')
            .attr('font-weight', 'bold')
            .text(d => d.version);

          return group;
        },
        update => {
          // Animate the update (color and text change)
          update.select('rect')
            .transition().duration(500)
            .attr('fill', d => d.color);
            
          update.select('text')
            .text(d => d.version);

          return update;
        },
        exit => {
          // Animate exit
          exit.transition().duration(500)
              .attr('transform', `translate(${width/2}, ${height/2}) scale(0)`)
              .remove();
          return exit;
        }
      );
      
    // Update simulation with the new set of nodes
    simulation.nodes(targetNodes);
    simulation.alpha(1).restart(); // Reheat the simulation

  }, [index, staticElements]);

  return (
    <svg ref={ref} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {staticElements}
    </svg>
  );
};

export default GlobalSoupViz;