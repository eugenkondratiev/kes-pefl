import React from 'react';
import { Layout } from 'antd';
import stl from './MainFooter.module.scss';

const { Footer } = Layout;

function MainFooter(props) {


    return (
        <Footer className={stl["main-footer"]}>
            <h4>
                version 0.6  2022    
                eugenkondratiev aka Sullen
            </h4>
            <h4>big thanks to <a alt="antdisign" href="https://ant.design/" >antdisign</a> and <a href="https://www.svgrepo.com/" alt="svgrepo">svgrepo</a></h4>

        </Footer>
    );
}

export default MainFooter;