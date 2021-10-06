import React from 'react';

import { LinkEnum } from "../../routes";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';


export default [
    {
        _id: 1,
        title: "Начало",
        link: LinkEnum.HOME,
        icon:<UserOutlined/>
    }   ,
    {
        _id: 2,
        title: "Игроки",
        link: LinkEnum.PLAYERS,
        icon:<UserOutlined/>
    } ,
    {
        _id: 3,
        title: "Кубки",
        link: LinkEnum.CUPS,
        icon:<VideoCameraOutlined/>
    } ,
    {
        _id: 4,
        title: "Международные",
        link: LinkEnum.INTERNATIONAL,
        icon:<UserOutlined/>
    } ,
    {
        _id: 5,
        title: "Тесты",
        link: LinkEnum.TESTS,
        icon:<UploadOutlined/>
    } 
]