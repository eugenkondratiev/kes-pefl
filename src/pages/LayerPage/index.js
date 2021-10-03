import { Layout  } from 'antd';
import React from 'react';
import stl from './LayerPage.module.scss';
import './LayerPage.css'


import MainFooter from '../../components/MainFooter';


const { Header, Content } = Layout;

function LayerPage(props) {

  return (
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
  );
}

export default LayerPage;