import React from 'react';
import { useD3 } from '../hooks/useD3';

const CircleExample = ({ currentStepIndex }) => {
  const ref = useD3(
    (svg) => {
      const height = 400;
      const width = "100%";
      const radius = 20 + currentStepIndex * 25; // Radius grows with each step

      // Clear SVG before drawing
      svg.selectAll("*").remove();

      // Append a circle and apply a transition
      svg.append('circle')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', 0) // Start with radius 0 for transition
        .style('fill', 'steelblue')
        .transition()
        .duration(500)
        .attr('r', radius);
    },
    [currentStepIndex] // Redraw when currentStepIndex changes
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 400,
        width: "100%",
      }}
    />
  );
};

export default CircleExample;
