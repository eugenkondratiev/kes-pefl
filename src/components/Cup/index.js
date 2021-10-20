import React, { useEffect, useRef } from 'react';
import stl from './Cup.module.scss';

function Cup({ _cupId, children, ...restprops }) {
    const cupIdRef = useRef()
    const cupDataRef = useRef();

console.log(" -!!! Cup component rendered ", _cupId);
    useEffect(() => {
        console.log("useEffect cupId -  ", _cupId);
        // cupIdRef.current = _cupId;
    }, [_cupId])

    // useEffect(() => {
    //     console.log("useEffect  olollolo");
    //     cupIdRef.current = "ololo";
    // }, [])

    return (
        <div className={stl.root}>
            <h1 style={{ textAlign: 'center', width:"100%" }}>{_cupId && _cupId}</h1>
            {/* <h2 style={{ textAlign: 'center', width:"100%" }}>{cupIdRef && cupIdRef.current}</h2> */}
        </div>
    );
}

export default Cup;