import { globalVars } from './index.js';

export const mobileCheck = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        globalVars.htmlEl.classList.add('page--android');
        return 'Android';
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        globalVars.htmlEl.classList.add('page--ios');
        return 'iOS';
    }

    return 'unknown';
};
