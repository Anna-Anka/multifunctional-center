(function() {
    const profileButton = document.querySelector('.header .menu__name')
    const buttonCloseProfileMenu = document.querySelector('.header .menu__return')
    const profileMenu = document.querySelector('.profile-menu')
    const baseMenu = document.querySelector('.header .menu__base')

    if (!profileButton || !profileMenu || !baseMenu || !buttonCloseProfileMenu) {
        return
    }

    profileButton.addEventListener('click', () => {
        baseMenu.classList.add('menu__base--hidden')
        profileMenu.classList.add('profile-menu--visible')
        profileButton.setAttribute('aria-expanded', 'true')
        profileButton.setAttribute('aria-label', 'Закрыть меню профиля')
    })

    buttonCloseProfileMenu.addEventListener('click', () => {
        baseMenu.classList.remove('menu__base--hidden')
        profileMenu.classList.remove('profile-menu--visible')
        profileButton.setAttribute('aria-expanded', 'false')
        profileButton.setAttribute('aria-label', 'Открыть меню профиля')
    })
})()