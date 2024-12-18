import * as ymaps3 from 'ymaps3';
import styles from './_styles.json';

(function () {
    const COMMON_LOCATION_PARAMS = { easing: 'ease-in-out', duration: 2000, zoom: 15 };

    // work, near, office, road

    const pins = [
        {
            coordinates: [37.65, 55.75],
            types: ['work']
        },
        {
            coordinates: [36.65, 56.75],
            types: ['work']
        },
        {
            coordinates: [38.65, 54.75],
            types: ['near']
        },
        {
            coordinates: [40.65, 52.75],
            types: ['near']
        }
    ]

    const mapElement = document.querySelector('[data-map]')

    const workButton = document.querySelector('.offices-page__button--work')
    const nearButton = document.querySelector('.offices-page__button--near')

    if (mapElement) {
        let center = [37.65080999999997, 55.758412068983525];
        // let center = [53.095884, 158.349753];

        async function initMap() {
            await ymaps3.ready;
            await ymaps3.import.registerCdn(
                'https://cdn.jsdelivr.net/npm/{package}',
                '@yandex/ymaps3-default-ui-theme@0.0.2',
                '@yandex/ymaps3-controls@0.0.1',
            );

            // + YMapControls, YMapScaleControl
            const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker, Placemark } = ymaps3;
            const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

            // создание карты
            const map = new YMap(
                document.querySelector('[data-map]'),
                {
                    location: {
                        center,
                        zoom: 5
                        // zoom: 14
                    },
                }
            );

            map.addChild(new YMapDefaultFeaturesLayer({}))

            const controls = new YMapControls({ position: 'right' });
            //Добавление кнопок + и 
            controls.addChild(new YMapZoomControl({}));
            // Добавление кнопки геолокации
            controls.addChild(new YMapGeolocationControl({}));
            map.addChild(controls);


            workButton.addEventListener('click', () => {
                const pinElements = document.querySelectorAll('.marker')

                pinElements.forEach((pin) => {
                    if (pin.hasAttribute('data-work')) {
                        pin.classList.remove('marker--hidden')
                    } else {
                        pin.classList.add('marker--hidden')
                    }
                })
            })

            nearButton.addEventListener('click', () => {
                const pinElements = document.querySelectorAll('.marker')

                pinElements.forEach((pin) => {
                    if (pin.hasAttribute('data-near')) {
                        pin.classList.remove('marker--hidden')
                    } else {
                        pin.classList.add('marker--hidden')
                    }
                })
            })

            pins.forEach((pin) => {
                const markerElement = document.createElement('div');
                markerElement.className = 'marker';

                pin.types.forEach((type) => {
                    markerElement.setAttribute(`data-${type}`, 'true')
                })

                // Настройка маркера
                const marker = new YMapMarker(
                    {
                        coordinates: pin.coordinates,
                        mapFollowsOnDrag: true
                    },
                    markerElement
                );

                map.addChild(marker);
            })


            // Карта с кастомными стилями
            map.addChild(new YMapDefaultSchemeLayer({
                customization: styles
            }));
        };

        initMap();
    }
})()
