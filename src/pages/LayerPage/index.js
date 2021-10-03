import { Layout, Menu } from 'antd';
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import stl from './LayerPage.module.scss';
import './LayerPage.css'
import cn from 'classnames';


import { A, useRoutes, usePath } from 'hookrouter'
import MainFooter from '../../components/MainFooter';
import SiderMenu from '../../components/SiderMenu';


const { Header, Content } = Layout;

function LayerPage(props) {
  console.log(stl.root);
  const currentPath = usePath();
  console.log(currentPath);
  return (
    // <Layout style={{ minHeight: "100vh" }}>

      <Layout>

        <Header className={stl["main-header"]}
          style={{
            padding: "12px 18px",
            color: "lightgray"
          }}
    >
          {props.mainCaption || null}
        </Header>
        <Content className={stl["layout-content-background"]}>
          <div>
            {props.children}
          </div>
        </Content>
        <MainFooter />
      </Layout>
  /* </Layout> */
  );
}

export default LayerPage;