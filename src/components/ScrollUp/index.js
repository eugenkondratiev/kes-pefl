import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useRef, useState } from 'react';
import { SvgUpIcon } from '../../assets/svg/icons';
import useDebounce from '../../hooks/useDebounce';
import useTimeout from '../../hooks/useTimeout';
import stl from './ScrollUp.module.scss';

function ScrollUp({ setpoint, ...props }) {
    const [offset, setOffset] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    // const scrollposition = useRef(0);

    useDebounce(() => {
        setIsVisible(offset > setpoint)
    }, 500, [offset])

    useEffect(() => {
        const scrollHandler = () => {
            // scrollposition.current = window.pageYOffset;
            setOffset(window.pageYOffset)
        }
        window.addEventListener('scroll', scrollHandler);
        return () => { window.removeEventListener('scroll', scrollHandler) }

    }, []);

    return (
        <div className={stl.root}>
            {isVisible && <div className={stl['scroll-up-button']}
            title="Подняться вверх страницы"
                onClick={
                    () => {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }
                }>
                {/* {offset.toFixed(0)} */}
                <SvgUpIcon />
            </div>
            }
        </div>
    );
}

export default ScrollUp;