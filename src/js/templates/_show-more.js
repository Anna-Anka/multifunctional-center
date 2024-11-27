import { dataMediaQueries } from '../utils/_data-media-queries.js';
import { throttle } from '../utils/index.js';

(function() {
    window.addEventListener('load', () => {
        if (document.querySelector('[data-showmore]')) {
            const allShowMore = document.querySelectorAll('[data-showmore]');

            const showMoreBlocksRegular = Array.from(allShowMore).filter((item) => !item.hasAttribute('data-showmore-media'));

            showMoreBlocksRegular.length ? initAllShowMore(showMoreBlocksRegular) : null;

            function showMoreResize(e) {
                const targetType = e.type;
                if (targetType === 'resize') {
                    showMoreBlocksRegular && showMoreBlocksRegular.length ? initAllShowMore(showMoreBlocksRegular) : null;
                    mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
                }
            }

            const showMoreResizeThrottle = throttle(showMoreResize);

            function showMoreAction(e) {
                const targetEvent = e.target;
                const targetType = e.type;
                if (targetType === 'click') {
                    if (targetEvent.hasAttribute('data-showmore-button-show')) {
                        const buttonShow = targetEvent;
                        const showMoreBlock = buttonShow.closest('[data-showmore]');
                        const content = showMoreBlock.querySelector('[data-showmore-content]');
                        const buttonHide = showMoreBlock.querySelector('[data-showmore-button-hide]');
                        const startShowNumber = Number(content.getAttribute('data-showmore-start-show'));
                        const nextShow = content.getAttribute('data-showmore-next-show');
                        const nextShowNumber = Number(nextShow);
                        const contentChildrensArray = Array.from(content.children);
                        const contentChildrensLength = contentChildrensArray.length;

                        if (nextShow === 'all') {
                            if (items <= contentChildrensLength) {
                                items += contentChildrensLength;
                            }
                        } else if (items <= contentChildrensLength) {
                            items += nextShowNumber;
                        }

                        showMoreBlock.classList.add('is-show');
                        const shouldBeShow = contentChildrensArray.slice(startShowNumber, items);
                        shouldBeShow.forEach((item) => item.classList.remove('showmore__item--hide'));

                        if (shouldBeShow.length + startShowNumber === contentChildrensLength) {
                            buttonShow.classList.add('showmore__button--hide');
                            if (buttonHide) {
                                buttonHide.classList.remove('showmore__button--hide');
                            }
                        }
                    }
                }
            }
            const showMoreActionThrottle = throttle(showMoreAction);

            document.addEventListener('click', showMoreActionThrottle);
            window.addEventListener('resize', showMoreResizeThrottle);

            const mdQueriesArray = dataMediaQueries(allShowMore, 'showmoreMedia');

            if (mdQueriesArray && mdQueriesArray.length) {
                mdQueriesArray.forEach((mdQueriesItem) => {
                    // Событие
                    mdQueriesItem.matchMedia.addEventListener('change', () => {
                        initOneShowMore(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    });
                });
                initItemsMedia(mdQueriesArray);
            }

            let items;
            function initItemsMedia(mdQueriesArray) {
                mdQueriesArray.forEach((mdQueriesItem) => {
                    initAllShowMore(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
            }

            function initAllShowMore(showMoreBlocks, matchMedia) {
                showMoreBlocks.forEach((showMoreBlock) => {
                    initOneShowMore(showMoreBlock, matchMedia);
                });
            }

            function initOneShowMore(showMoreBlock, matchMedia = false) {
                showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;

                if (showMoreBlock) {
                    const buttonShow = showMoreBlock.querySelector('[data-showmore-button-show]');
                    const buttonHide = showMoreBlock.querySelector('[data-showmore-button-hide]');
                    const content = showMoreBlock.querySelector('[data-showmore-content]');
                    const startShowNumber = Number(content.getAttribute('data-showmore-start-show'));
                    const contentChildrensArray = Array.from(content.children);
                    const contentChildrensLength = contentChildrensArray.length;

                    if (!items) {
                        items = startShowNumber;
                    }

                    if (matchMedia.matches || !matchMedia) {
                        initItems(contentChildrensArray, items);
                        if (contentChildrensLength > items) {
                            buttonShow.classList.remove('showmore__button--hide');
                            if (buttonHide) {
                                buttonHide.classList.add('showmore__button--hide');
                            }
                        } else {
                            buttonShow.classList.add('showmore__button--hide');
                            if (buttonHide) {
                                buttonHide.classList.remove('showmore__button--hide');
                            }
                        }
                    } else {
                        contentChildrensArray.forEach((item) => item.classList.remove('showmore__item--hide'));
                        buttonShow.classList.add('showmore__button--hide');
                        buttonHide.classList.add('showmore__button--hide');
                    }

                    if (buttonHide) {
                        buttonHide.addEventListener('click', hideItems);
                    }

                    function hideItems() {
                        const shouldBeHide = contentChildrensArray.slice(startShowNumber);
                        shouldBeHide.forEach((item) => item.classList.add('showmore__item--hide'));

                        buttonShow.classList.remove('showmore__button--hide');
                        buttonHide.classList.add('showmore__button--hide');

                        items = startShowNumber;
                    }
                }

                function initItems(allItems, startShowNumber) {
                    if (allItems && startShowNumber) {
                        for (let i = startShowNumber; i < allItems.length; i++) {
                            allItems[i].classList.add('showmore__item--hide');
                        }
                    }
                }
            }
        }
    });
})