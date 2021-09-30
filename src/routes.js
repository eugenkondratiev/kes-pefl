import  React  from 'react';
import EmptyPage from './pages/EmptyPage';
import LayerPage from './pages/LayerPage';
import TestsPage from './pages/TestsPage';

const routes = {
    '/': () => <TestsPage />,
    '/tests': () => <TestsPage />,
    '/empty': () => <EmptyPage />,
    '/layout': ()=> <LayerPage> XXX 2021 XXX</LayerPage>

}

export default routes;
