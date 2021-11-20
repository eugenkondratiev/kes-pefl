import React from 'react';
import CupsPage from './pages/CupsPage';
import PlayersPage from './pages/PlayersPage';
import EmptyPage from './pages/EmptyPage';
import LayerPage from './pages/LayerPage';
import TestsPage from './pages/TestsPage';
import HomePage from './pages/HomePage';
import InterCupsPage from './pages/IntercupsPage';

export const LinkEnum = {
    HOME: '/',
    TESTS : '/tests',
    EMPTY : '/empty',
    LAYOUT: '/layout',
    PLAYERS : '/players',
    CUPS : '/cups',
    INTERNATIONAL : '/intercups',
    INTERCUP : '/intercup/:id',
    CUPID : '/cup/:id',
    ONECUP: '/cups/:season/:ff/:type'

}  


const routes = {
    [LinkEnum.TESTS]: () => <TestsPage />,
    [LinkEnum.EMPTY]: () => <EmptyPage />,
    [LinkEnum.LAYOUT]: () => <LayerPage> XXX 2021 XXX</LayerPage>,
    [LinkEnum.CUPS]:() =><CupsPage />,
    [LinkEnum.CUPID]:({id}) =><CupsPage _cupid={id}/>,
    [LinkEnum.INTERNATIONAL]:() =><InterCupsPage/>,
    [LinkEnum.INTERCUP]:({id}) =><InterCupsPage _cupid={id}/>,
    [LinkEnum.PLAYERS]:() =><PlayersPage />,
    [LinkEnum.HOME]: () => <HomePage/>
}

export default routes;
