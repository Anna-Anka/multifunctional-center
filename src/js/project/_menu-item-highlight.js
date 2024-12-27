(function() {
    const mobileItems = document.querySelectorAll('.header .menu__item--mobile')

    if (mobileItems) {
        const lastItem = mobileItems[mobileItems.length - 1]
        lastItem && lastItem.classList.add('menu__item--highlight')
    }
})();