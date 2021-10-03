import { Layout, Menu } from 'antd';
import React from 'react';
import NotFoundPage from '../NotFoundPage';

// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import stl from './LayerPage.module.scss';

import './LayerPage.css'
import cn from 'classnames';


import { A, useRoutes, usePath } from 'hookrouter'
import SiderMenu from '../../components/SiderMenu';
import routes from '../../routes';


const { Header, Content, Footer, Sider } = Layout;

function MainLayerPage(props) {
  console.log(stl.root);
  const currentPath = usePath();
  console.log(currentPath);
  const match = useRoutes(routes)


  return (
    <Layout style={{ minHeight: "100vh" }}>

      <SiderMenu />

        {match || <NotFoundPage />}

    </Layout>
  );
}

export default MainLayerPage;