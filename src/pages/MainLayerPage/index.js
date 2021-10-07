import { Layout } from 'antd';
import React from 'react';
import NotFoundPage from '../NotFoundPage';


// import cn from 'classnames';


import { useRoutes, usePath } from 'hookrouter'
import SiderMenu from '../../components/SiderMenu';
import routes from '../../routes';
import {  NationsProvider } from '../../context/nation-context';

import './LayerPage.css'


function MainLayerPage(props) {
  const currentPath = usePath();
  console.log(currentPath);

  const match = useRoutes(routes)


  return (
    <Layout style={{ minHeight: "100vh" }}>

      <SiderMenu />
      <NationsProvider>
        {match || <NotFoundPage />}
      </NationsProvider>

    </Layout>
  );
}

export default MainLayerPage;