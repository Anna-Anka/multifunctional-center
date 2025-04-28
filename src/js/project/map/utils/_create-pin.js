import { markerButtonNowCloseA11y } from './_handlers.js';

export function createPin(pin) {
    const wrapper = document.createElement('div')
    wrapper.className = 'marker';
    wrapper.setAttribute('data-custom-marker', 'true')

    let markerButton;
    let balloonWrapper;

    if (pin.htmlContent) {
        markerButton = document.createElement('button')
        markerButton.setAttribute('aria-haspopup', 'true')
        markerButtonNowCloseA11y(markerButton)
        markerButton.setAttribute('aria-controls', pin.id)

        balloonWrapper = document.createElement('div')
        balloonWrapper.innerHTML = `<div class="map-balloon map-balloon--hidden" role="tooltip" id="${pin.id}">
    <div class="map-balloon__header">
        <span class="map-balloon__title">
            ${pin.htmlContent.title}
        </span>
        <button class="map-balloon__close" type="button" aria-label="Закрыть"></button>
    </div>
    <div class="map-balloon__body">
        ${pin.htmlContent.body}
    </div>
    <a class="map-balloon__button button button--fill" href="${pin.htmlContent.hrefValue}">
        Записаться
    </a>
</div>`;
    } else {
        markerButton = document.createElement('span')
        markerButton.setAttribute('aria-label', 'Пункт')
    }

    markerButton.className = 'marker__button';
    wrapper.append(markerButton)
    balloonWrapper && wrapper.append(balloonWrapper)

    pin.types?.forEach((type) => {
        wrapper.setAttribute(`data-${type}`, 'true')
    })

    return wrapper
}