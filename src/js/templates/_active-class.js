(function() {
    window.addEventListener('scroll', () => {
        const scrollDistance = window.scrollY;

        if (window.innerWidth > 768) {
            document.querySelectorAll('[data-active-class]').forEach((section, i) => {
                if (section.offsetTop - document.querySelector('.header').clientHeight <= scrollDistance) {
                    document.querySelectorAll('.menu__link').forEach((link) => {
                        if (link.classList.contains('menu__link--active')) {
                            link.classList.remove('menu__link--active');
                        }
                    });

                    document.querySelectorAll('.menu__item')[i].querySelector('.menu__link').classList.add('menu__link--active');
                }
            });
        }
    });
})
