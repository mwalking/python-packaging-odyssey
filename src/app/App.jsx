import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const App = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-600">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
