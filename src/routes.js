import React from 'react';
import CupsPage from './pages/CupsPage';
import PlayersPage from './pages/PlayersPage';
import EmptyPage from './pages/EmptyPage';
import LayerPage from './pages/LayerPage';
import TestsPage from './pages/TestsPage';

export const LinkEnum = {
    HOME: '/',
    TESTS : '/tests',
    EMPTY : '/empty',
    LAYOUT: '/layout',
    PLAYERS : '/players',
    CUPS : '/cups',
    INTERNATIONAL : '/intercups',
    CUPID : 'cup/:id',
    ONECUP: 'cups/:season/:ff/:type'

}  


const routes = {
    [LinkEnum.HOME]: () => <TestsPage />,
    [LinkEnum.TESTS]: () => <TestsPage />,
    [LinkEnum.EMPTY]: () => <EmptyPage />,
    [LinkEnum.LAYOUT]: () => <LayerPage> XXX 2021 XXX</LayerPage>,
    // '/cups': navigate('/cups'),
    [LinkEnum.CUPS]:() =><CupsPage />,
    [LinkEnum.INTERNATIONAL]:() =><CupsPage />,
    [LinkEnum.PLAYERS]:() =><PlayersPage />
}

export default routes;
