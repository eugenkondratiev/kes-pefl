import React from 'react';
import { ClubsProvider } from './context/clubs-context';
import { NationsProvider } from './context/nation-context';

import MainLayerPage from './pages/MainLayerPage';


const App = () => {

  return (
    <NationsProvider>
      <ClubsProvider>

      <MainLayerPage />
      
      </ClubsProvider>
    </NationsProvider>

  )
}

export default App;
