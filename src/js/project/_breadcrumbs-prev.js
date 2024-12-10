(function () {
    const prevButton = document.querySelector('.breadcrumbs__prev button')

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            window.history.length > 1 ? window.history.back() : indow.location.href = '/';
        })
    }
})()