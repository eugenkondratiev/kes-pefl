import React, { useState } from 'react';
import { Layout, Menu } from 'antd';

import stl from './SiderMenu.module.scss';
import { A } from 'hookrouter';
import mainMenu from './menu-structure';
// import cn from 'classnames';

import './style.css';

const { Sider } = Layout;

function SiderMenu(props) {

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isOnBreakpoint, setIsOnBreakpoint] = useState(false)

    return (
        <Sider className={stl["menu-sider"]}
            collapsed={isCollapsed}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                // console.log("### onBreakpoint - ", broken);
                setIsOnBreakpoint(broken)
            }}
            onCollapse={(collapsed, type) => {
                // console.log("### collapsed - ", collapsed, type);
                setIsCollapsed(collapsed)
            }}
        >
            <div className={stl["main-logo"]} />

            <Menu
                onClick={(e) => {
                    // console.log("#####onClick - ", e)
                    isOnBreakpoint && setIsCollapsed(true)
                }
                }
                // onSelected={(e) => {
                //     console.log("#####onSelected - ", e);
                // }}
                theme="dark" mode="inline" defaultSelectedKeys={['1']} className={stl["menu-children"]}
            >
                {mainMenu.map(({ _id, title, link, icon }) => {
                    return <Menu.Item key={_id} icon={icon} className={stl["main-menu-item"]}>
                        <A key={_id} href={link} >
                            {title}
                        </A>
                    </Menu.Item>
                })}
            </Menu>

        </Sider>
    );
}

export default SiderMenu;