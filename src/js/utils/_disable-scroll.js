import { globalVars } from './index.js';

export const disableScroll = () => {
    const pagePosition = window.scrollY;
    const paddingOffset = `${(window.innerWidth - globalVars.bodyEl.offsetWidth)}px`;
    const fixBlocks = document.querySelectorAll('.fix-block');
    if (fixBlocks) {
        fixBlocks.forEach((el) => {
            const fixBlock = el;
            fixBlock.style.paddingRight = paddingOffset;
        });
    }
    globalVars.htmlEl.style.scrollBehavior = 'none';
    globalVars.bodyEl.style.paddingRight = paddingOffset;
    globalVars.bodyEl.classList.add('disable-scroll');
    globalVars.bodyEl.dataset.position = pagePosition;
    globalVars.bodyEl.style.top = `-${pagePosition}px`;
};
