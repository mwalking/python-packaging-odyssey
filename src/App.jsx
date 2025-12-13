import React from 'react';
import ScrollyLayout from './components/layout/ScrollyLayout';

// Visualizations
import GlobalSoupViz from './visualizations/GlobalSoupViz';
import VenvViz from './visualizations/VenvViz';
import UvWorkflowViz from './visualizations/UvWorkflowViz';

// Content
import { globalSoupSteps, venvSteps, uvSteps } from './data/story.jsx';

function App() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center bg-slate-900 text-white">
        <h1 className="text-6xl font-bold mb-4">The Python Packaging Odyssey</h1>
        <p className="text-xl max-w-2xl text-center text-slate-300">
          Why environments break, how venv fixes them, and why uv is the future.
        </p>
        <p className="mt-8 animate-bounce">↓ Scroll to Begin</p>
      </div>

      {/* Chapter 1: The Problem */}
      <ScrollyLayout 
        id="chapter-soup"
        steps={globalSoupSteps} 
        visualization={GlobalSoupViz} 
      />

      {/* Chapter 2: The Fix */}
      <ScrollyLayout 
        id="chapter-venv"
        steps={venvSteps} 
        visualization={VenvViz} 
      />

      {/* Chapter 3: The Future */}
      <ScrollyLayout 
        id="chapter-uv"
        steps={uvSteps} 
        visualization={UvWorkflowViz} 
      />
      
      {/* Footer */}
      <div className="h-96 flex justify-center items-center bg-slate-100">
        <p>Built with React + D3.js</p>
      </div>
    </div>
  );
}

export default App;
