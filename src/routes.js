import  React  from 'react';
import EmptyPage from './pages/EmptyPage';
import TestsPage from './pages/TestsPage';

const routes = {
    '/': () => <TestsPage />,
    '/tests': () => <TestsPage />,
    '/empty': () => <EmptyPage />
}

export default routes;
