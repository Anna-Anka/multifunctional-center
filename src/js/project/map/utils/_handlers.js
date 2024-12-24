import { ariaLabelMarkerButton } from '../_data.js';

export function markerButtonNowCloseA11y(marker) {
    marker.setAttribute('aria-expanded', 'false')
    marker.setAttribute('aria-label', ariaLabelMarkerButton.nowClose);
}

function markerButtonNowOpenA11y(marker) {
    marker.setAttribute('aria-expanded', 'true')
    marker.setAttribute('aria-label', ariaLabelMarkerButton.nowOpen);
}

function checkMarkerA11yByWrapperClass(wrapper) {
    const marker = wrapper.querySelector('.marker__button');
    wrapper.classList.contains('marker--hidden') ? markerButtonNowCloseA11y(marker) : markerButtonNowOpenA11y(marker)
}

export function filterButtonClickHandler(button) {
    const value = button.getAttribute('data-filter-pins')
    const wrappers = document.querySelectorAll('.marker')

    wrappers.forEach((wrapper) => {
        wrapper.hasAttribute(`data-${value}`) ? wrapper.classList.remove('marker--hidden') : wrapper.classList.add('marker--hidden')
        checkMarkerA11yByWrapperClass(wrapper)
    })
}

export function balloonCloseButtonClickHandler(button) {
    const wrapper = button.closest('.marker')
    const balloon = wrapper.querySelector('.map-balloon')
    const marker = wrapper.querySelector('.marker__button')
    markerButtonNowCloseA11y(marker)
    balloon && balloon.classList.add('map-balloon--hidden')
}

function changeParentZIndex(wrapper) {
    const balloon = wrapper.querySelector('.map-balloon')
    const parent = wrapper.parentNode

    if (!balloon) {
        return
    }

    if (balloon.classList.contains('map-balloon--hidden')) {
        parent.classList.remove('ymaps3x0--marker--active')
    } else {
        parent.classList.add('ymaps3x0--marker--active')
    }
}

export function markerButtonClickHandler(button) {
    const allBalloons = document.querySelectorAll('.map-balloon')
    allBalloons.forEach((balloon) => {
        balloon.classList.add('map-balloon--hidden')

        const wrapper = balloon.closest('.marker')
        const marker = wrapper.querySelector('.marker__button')
        changeParentZIndex(wrapper)
        markerButtonNowCloseA11y(marker)
    })
    const parent = button.closest('.marker')
    const balloon = parent.querySelector('.map-balloon')
    markerButtonNowOpenA11y(button)
    balloon && balloon.classList.remove('map-balloon--hidden')
    changeParentZIndex(parent)
}