import { Layout, Menu } from 'antd';
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function LayerPage({ children }) {
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    // console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    // console.log(collapsed, type);
                }}
            >
<div className="logo" />
{/* export declare type MenuMode = 'horizontal' | 'vertical' | 'vertical-left' | 'vertical-right' | 'inline'; */}

      <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          Игроки
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Кубки
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          Тесты
        </Menu.Item>
        <Menu.Item key="4" icon={<UploadOutlined />}>
          Помощь
        </Menu.Item>
      </Menu>
            </Sider>
            <Layout>

                <Header>

                </Header>
                <Content>
                    <div className="layout-content-background">
                        {children}
                    </div>
                </Content>
                <Footer>
                    ololo 2021
                </Footer>
            </Layout>
        </Layout>
    );
}

export default LayerPage;