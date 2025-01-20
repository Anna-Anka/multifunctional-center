import * as ymaps3 from 'ymaps3';
import styles from './_styles.json';
import { getGeolocation } from './utils/_geolocation.js'
import { markerButtonNowCloseA11y, filterButtonClickHandler, balloonCloseButtonClickHandler, markerButtonClickHandler } from './utils/_handlers.js';

import data from '../../../assets/map-data.json'

let env = 'production'

fetch(env === 'production' ? 'assets/map-data.json' : "")
    .then(response => {
        if (!response.ok) {
            throw new Error('Сет не в порядке');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Здесь вы можете использовать загруженные данные
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });

const pins = data.advancePins;
const defaultPins = data.defaultPins;
const advanceMapSettings = data.advanceMapSettings;
const baseMapSettings = data.baseMapSettings;

const getArrayPins = (isBaseMap) => {
    return isBaseMap ? defaultPins : pins
}

function createPin(pin) {
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

    pin.types.forEach((type) => {
        wrapper.setAttribute(`data-${type}`, 'true')
    })

    return wrapper
}

(function () {

    const mapElement = document.querySelector('[data-map]')

    if (mapElement) {
        const isBaseMap = mapElement.getAttribute('data-map') === 'base'

        async function initMap() {
            await ymaps3.ready;
            await ymaps3.import.registerCdn(
                'https://cdn.jsdelivr.net/npm/{package}',
                '@yandex/ymaps3-default-ui-theme@0.0.2',
                '@yandex/ymaps3-controls@0.0.1',
            );

            const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker } = ymaps3;
            const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

            // создание карты
            const map = new YMap(
                mapElement, isBaseMap ? baseMapSettings : advanceMapSettings
            );

            map.addChild(new YMapDefaultFeaturesLayer({}))

            if (!isBaseMap) {
                const controls = new YMapControls({ position: 'right' });
                //Добавление кнопок + и 
                controls.addChild(new YMapZoomControl({}));
                // Добавление кнопки геолокации
                controls.addChild(new YMapGeolocationControl({}));
                map.addChild(controls);
            }

            getArrayPins(isBaseMap).forEach((pin) => {
                const wrapper = createPin(pin)

                // Настройка маркера
                const marker = new YMapMarker(
                    {
                        coordinates: pin.coordinates,
                        mapFollowsOnDrag: true
                    },
                    wrapper
                );

                map.addChild(marker);
            })

            const filterButtons = document.querySelectorAll('[data-filter-pins]')
            filterButtons && filterButtons.forEach((button) => {
                button.addEventListener('click', () => filterButtonClickHandler(button))
            })

            const nearButton = document.querySelector('[data-near]')
            nearButton && nearButton.addEventListener('click', getGeolocation)

            const allCloseButtons = document.querySelectorAll('.map-balloon__close')
            // обрабатываем клик на крестик в баллуне
            allCloseButtons && allCloseButtons.forEach((button) => {
                button.addEventListener('click', () => balloonCloseButtonClickHandler(button))
            })

            const allMarkerButtons = document.querySelectorAll('.marker__button')
            // обрабатываем клик на маркер, открываем баллун
            allMarkerButtons && allMarkerButtons.forEach((button) => {
                button.addEventListener('click', () => markerButtonClickHandler(button))
            })

            // подключаем стили
            map.addChild(new YMapDefaultSchemeLayer({
                customization: styles
            }));
        };

        initMap();
    }
})()
