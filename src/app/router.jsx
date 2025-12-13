import React, { lazy } from 'react';
import {
  createHashRouter,
  Navigate,
} from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Home = lazy(() => import('../pages/Home'));
const ChapterPage = lazy(() => import('../pages/ChapterPage'));
const Glossary = lazy(() => import('../pages/Glossary'));
const Resources = lazy(() => import('../pages/Resources'));
const NotFound = lazy(() => import('../pages/NotFound'));

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'chapters/:slug', element: <ChapterPage /> },
      { path: 'glossary', element: <Glossary /> },
      { path: 'resources', element: <Resources /> },
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
