import React from 'react';
import { ClubsProvider } from './context/clubs-context';
import { CupsProvider } from './context/cups-context';
import { NationsProvider } from './context/nation-context';

import MainLayerPage from './pages/MainLayerPage';


const App = () => {

  return (
    <NationsProvider>
      <ClubsProvider>
        <CupsProvider>
          <MainLayerPage />

        </CupsProvider>

      </ClubsProvider>
    </NationsProvider>

  )
}

export default App;
