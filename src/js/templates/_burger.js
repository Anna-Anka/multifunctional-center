import { disableScroll, enableScroll } from '../utils/index.js';

(function() {
    const burgerButton = document.querySelector('[data-burger-button]');
    const menu = document.querySelector('[data-menu]');
    const menuLinks = document.querySelectorAll('[data-menu-link]');

    const checkClass = () => {
        if (burgerButton.classList.contains('burger-button--active')) {
            document.addEventListener('keydown', keyHandler);
            burgerButton.setAttribute('aria-expanded', 'true');
            burgerButton.setAttribute('aria-label', 'закрыть меню');
            burgerButton.focus();
            disableScroll();
        } else {
            document.removeEventListener('keydown', keyHandler);
            burgerButton.setAttribute('aria-expanded', 'false');
            burgerButton.setAttribute('aria-label', 'открыть меню');
            enableScroll();
        }
    };

    const hideBurger = () => {
        burgerButton.classList.remove('burger-button--active');
        menu.classList.remove('menu--active');
    }

    burgerButton.addEventListener('click', () => {
        burgerButton.classList.toggle('burger-button--active');
        menu.classList.toggle('menu--active');
        checkClass();
    });

    menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hideBurger();
            enableScroll();
        });
    });

    const focusCatch = (e) => {
        const nodes = menu.querySelectorAll(globalVars.focusEl);
        const nodesArray = Array.prototype.slice.call(nodes);
        const focusedItemIndex = nodesArray.indexOf(document.activeElement)
        if (e.shiftKey && focusedItemIndex === 0) {
            nodesArray[nodesArray.length - 1].focus();
            e.preventDefault();
        }
        if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
            nodesArray[0].focus();
            e.preventDefault();
        }
    }

    const keyHandler = (event) => {
        if (menu.classList.contains('menu--active')) {
            if (event.key === 'Escape') {
                hideBurger();
                checkClass();
            }

            if (event.which) {
                focusCatch(event);
            }
        }
    }
})();
