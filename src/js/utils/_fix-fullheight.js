import { throttle } from './_throttle.js';

export const fixFullheight = () => {
    const fullScreens = document.querySelectorAll('[data-fullscreen]');

    if (fullScreens.length) {
        const fixHeight = () => {
            let vh = window.innerHeight;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        const fixHeightThrottle = throttle(fixHeight);
        fixHeightThrottle();
        window.addEventListener('resize', fixHeightThrottle);
    }
};