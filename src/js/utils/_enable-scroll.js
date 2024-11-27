import { globalVars } from './index.js';

export const enableScroll = () => {
    const fixBlocks = document.querySelectorAll('.fix-block');
    if (fixBlocks) {
        fixBlocks.forEach((el) => {
            const fixBlock = el;
            fixBlock.style.paddingRight = '0';
        });
    }
    const pagePosition = parseInt(globalVars.bodyEl.dataset.position, 10);
    globalVars.bodyEl.style.paddingRight = '0';

    globalVars.bodyEl.style.top = 'auto';
    globalVars.bodyEl.classList.remove('disable-scroll');
    window.scroll({
        top: pagePosition,
        left: 0,
    });
    globalVars.bodyEl.removeAttribute('data-position');
};
