import React from 'react';
import {Layout} from 'antd';
import stl from './MainFooter.module.scss';

const {Footer} = Layout;

function MainFooter(props) {
    return (
        <Footer className={stl["main-footer"]}>
          ololo 2021
        </Footer>
    );
}

export default MainFooter;