(function() {
    const categoryButtons = document.querySelectorAll('.office-link');

    if (!categoryButtons) {
        return
    }

    categoryButtons.forEach((button) => {
        button.setAttribute('aria-pressed', 'false');

        button.addEventListener('click', () => {
            categoryButtons.forEach((btn) => {
                btn.classList.remove('office-link--active');
                btn.setAttribute('aria-pressed', 'false');
            })

            button.classList.add('office-link--active');
            button.setAttribute('aria-pressed', 'true');
        })
    })
})()