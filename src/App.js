import { useRoutes } from 'hookrouter';
import React, { Component } from 'react';
import NotFoundPage from './pages/NotFoundPage';

// import TestsPage from './pages/TestsPages';
import routes from './routes';

const App = () => {
  const match = useRoutes(routes)

  return match || <NotFoundPage />
}

export default App;
