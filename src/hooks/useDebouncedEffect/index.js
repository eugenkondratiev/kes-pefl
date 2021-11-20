import { useEffect } from 'react';

export const useDebouncedEffect = (callback, dependencies, delay) => {
    useEffect(() => {
        const timeoutHandler = setTimeout(() => callback(), delay)
        return clearTimeout(timeoutHandler)

    }, [...dependencies || [], delay])
}