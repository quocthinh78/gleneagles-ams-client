import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: widthApp, innerHeight: heightApp } = window;
    return {
        widthApp,
        heightApp,
    };
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}