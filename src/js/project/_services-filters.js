(function () {
    const filters = document.querySelectorAll('.services-filters')

    const changeA11yByClass = (wrapper, openButton, closeButton) => {
        if (wrapper.classList.contains('services-filters__wrapper--visible')) {
            openButton.setAttribute('aria-expanded', 'true')
            closeButton.setAttribute('aria-expanded', 'true')
            openButton.setAttribute('aria-label', 'Закрыть параметры')
        } else {
            openButton.setAttribute('aria-expanded', 'false')
            closeButton.setAttribute('aria-expanded', 'false')
            openButton.setAttribute('aria-label', 'Открыть параметры')
        }
    }

    if (!filters) {
        return
    }

    filters.forEach((filter) => {
        const wrapper = filter.querySelector('.services-filters__wrapper')
        const openButton = filter.querySelector('.services-filters__show')
        const closeButton = filter.querySelector('.services-filters__close')

        if (!wrapper || !openButton || !closeButton) {
            return
        }

        openButton.addEventListener('click', () => {
            closeButton.classList.toggle('services-filters__close--visible')
            wrapper.classList.toggle('services-filters__wrapper--visible')
            changeA11yByClass(wrapper, openButton, closeButton)
        })

        closeButton.addEventListener('click', () => {
            closeButton.classList.remove('services-filters__close--visible')
            wrapper.classList.remove('services-filters__wrapper--visible')
            changeA11yByClass(wrapper, openButton, closeButton)
        })
    })
})()