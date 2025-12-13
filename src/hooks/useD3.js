import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

/**
 * A custom React hook to manage a D3.js visualization within a React component.
 *
 * @param {function} renderFn - The function that contains the D3.js rendering logic. It receives a d3.select() object for the container.
 * @param {Array} dependencies - A list of dependencies that, when changed, will trigger a re-render of the visualization.
 * @returns {React.RefObject} A React ref object to be attached to the SVG container element.
 */
export const useD3 = (renderFn, dependencies) => {
  const ref = useRef();

  useEffect(() => {
    // Call the D3 render function with the selection of the current ref
    renderFn(d3.select(ref.current));

    // Cleanup function (optional)
    return () => {};
  }, dependencies); // Rerun the effect if dependencies change

  return ref;
};
