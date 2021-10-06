import React from 'react';

import { LinkEnum } from "../../routes";

// import { ReactComponent as PlayerIcon } from '../../assets/svg/football-player-running-behind-the-ball-26792.svg'
import { SvgPlayerIcon, SvgIntercupsIcon, SvgCupsIcon } from '../../assets/svg/icons';


import { VideoCameraOutlined, HomeOutlined }  from '@ant-design/icons';

// import Icon from '@ant-design/icons';
// const { UploadOutlined, UserOutlined, VideoCameraOutlined, HomeOutlined } = Icon;

export default [
    {
        _id: 1,
        title: "Начало",
        link: LinkEnum.HOME,
        icon: <HomeOutlined />
        // icon: <Icon component={PlayerIcon} />
    },
    {
        _id: 2,
        title: "Игроки",
        link: LinkEnum.PLAYERS,
        icon: <SvgPlayerIcon/>
    },
    {
        _id: 3,
        title: "Кубки",
        link: LinkEnum.CUPS,
        icon: <SvgCupsIcon />
    },
    {
        _id: 4,
        title: "Международные",
        link: LinkEnum.INTERNATIONAL,
        icon: <SvgIntercupsIcon />
    },
    {
        _id: 5,
        title: "Тесты",
        link: LinkEnum.TESTS,
        icon: <VideoCameraOutlined />
    }
]