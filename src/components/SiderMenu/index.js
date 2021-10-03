import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import stl from './SiderMenu.module.scss';
import { A } from 'hookrouter';

const {Sider} = Layout;

function SiderMenu(props) {
    return (
        <Sider className={stl["menu-sider"]}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                // console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                // console.log(collapsed, type);
            }}
        >
            <div className={stl["main-logo"]} />
            {/* export declare type MenuMode = 'horizontal' | 'vertical' | 'vertical-left' | 'vertical-right' | 'inline'; */}

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <A key="1" href='/players' >
                        Игроки
                    </A>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <A key="2" href='/cups' >
                        Кубки
                    </A>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    <A key="3" href='/tests' >
                        Тесты
                    </A>

                </Menu.Item>
                <Menu.Item key="4" icon={<UploadOutlined />}>
                    Помощь
                </Menu.Item>
            </Menu>

        </Sider>
    );
}

export default SiderMenu;