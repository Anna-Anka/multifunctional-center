export const gotoBlock = (targetBlock, noHeader = false, speed = 500, offset = 0) => {
    const targetBlockElement = typeof (targetBlock) === 'string' ? document.querySelector(targetBlock) : targetBlock;
    if (targetBlockElement) {
        let headerItem = '';
        let headerItemHeight = 0;
        if (noHeader) {
            headerItem = 'header.header';
            headerItemHeight = document.querySelector(headerItem).offsetHeight;
        }
        const options = {
            speedAsDuration: true,
            speed,
            header: headerItem,
            offset,
            easing: 'easeOutQuad',
        };

        if (typeof SmoothScroll !== 'undefined') {
            new SmoothScroll().animateScroll(targetBlockElement, '', options);
        } else {
            const targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
            window.scrollTo({
                top: headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition,
                behavior: 'smooth',
            });
        }
    }
};
