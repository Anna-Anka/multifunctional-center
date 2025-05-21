const ymaps3 = window.ymaps3;

import styles from './_styles.json';
import { getGeolocation } from './utils/_geolocation.js'
import { createPin } from './utils/_create-pin.js'
import { filterButtonClickHandler, balloonCloseButtonClickHandler, markerButtonClickHandler } from './utils/_handlers.js';


function loadYmaps3(apiKey, lang = 'ru_RU') {
    return new Promise((resolve, reject) => {
        if (window.ymaps3) {
            resolve(window.ymaps3); // уже загружен
            return;
        }

        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=${lang}`;
        script.async = true;
        script.onload = () => {
            if (window.ymaps3) {
                resolve(window.ymaps3);
            } else {
                reject(new Error('ymaps3 не инициализировался после загрузки скрипта'));
            }
        };
        script.onerror = () => reject(new Error('Не удалось загрузить ymaps3'));

        document.head.appendChild(script);
    });
}


async function initMap(mapElement, isBaseMap, pins, settings) {
    const apiKey = document.getElementById('ymaps3-loader')?.dataset?.apiKey;

    if (!apiKey) {
        throw new Error('API ключ для Yandex Maps не найден. Убедись, что он передан в HTML.');
    }

    const ymaps3 = await loadYmaps3(apiKey);

    await ymaps3.ready;
    await ymaps3.import.registerCdn(
        'https://cdn.jsdelivr.net/npm/{package}',
        '@yandex/ymaps3-default-ui-theme@0.0.2',
        '@yandex/ymaps3-controls@0.0.1',
    );

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker } = ymaps3;
    const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

    // создание карты
    const map = new YMap(mapElement, settings);

    map.addChild(new YMapDefaultFeaturesLayer({}))

    if (!isBaseMap) {
        const controls = new YMapControls({ position: 'right' });
        //Добавление кнопок + и 
        controls.addChild(new YMapZoomControl({}));
        // Добавление кнопки геолокации
        controls.addChild(new YMapGeolocationControl({}));
        map.addChild(controls);
    }

    pins.forEach((pin) => {
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
    nearButton && nearButton.addEventListener('click', () => getGeolocation(pins))

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

async function getData(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Network Error');
        }

        const data = await response.json()
        const pins = data.pins
        const settings = data.mapSettings

        return { pins, settings }
    }

    catch (error) {
        console.error('Ошибка:', error);
        return { pins: [], settings: {} }
    }
}

(function () {

    const mapElement = document.querySelector('[data-map]')

    if (mapElement) {
        const isBaseMap = mapElement.getAttribute('data-map') === 'base'
        const urlFile = mapElement.getAttribute('data-url-file')

        const init = async () => {
            try {
                const data = await getData(urlFile)
                initMap(mapElement, isBaseMap, data.pins, data.settings);
            } catch (error) {
                console.log('Ошибка:', error)
            }
        }

        init()
    }
})()
