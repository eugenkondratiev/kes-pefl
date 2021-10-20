import { useCallback, useEffect, useRef } from "react";

export default function useTimeout(callback, delay) {

    const callBackRef = useRef();
    const timeoutRef = useRef()

    useEffect(() => {
        callBackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callBackRef.current(), delay)
    }, [delay])

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }, [])

    useEffect(() => {
        set();
        return clear
    }, [delay, set, clear])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set]
    )

    return { clear, reset }
}