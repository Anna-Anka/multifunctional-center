import styles from './_styles.json';

(function () {

    const baloonInfo = {
        balloonContentHeader: "Балун метки",
        balloonContentBody: "Содержимое <em>балуна</em> метки",
        balloonContentFooter: "Подвал",
        hintContent: "Хинт метки"
    }

    const buttonNear = document.querySelector('.offices-page__button--near')
    const buttonWork = document.querySelector('.offices-page__button--work')

    const placemarks = [
        {
            coordinates: [54.83, 37.11],
            type: 'near'
        },
        {
            coordinates: [53.83, 36.11],
            type: 'near'
        },
        {
            coordinates: [56.83, 38.11],
            type: 'near'
        },
        {
            coordinates: [57.83, 39.11],
            type: 'work'
        },
        {
            coordinates: [52.83, 35.11],
            type: 'work'
        }
    ]

    ymaps.ready(init);
    function init() {

        // Базовая настрйка
        const map = document.querySelector('[data-map]')

        if (map) {
                    const myMap = new ymaps.Map(map, {
            center: [54.83, 37.11],
            zoom: 5
        });

        const myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/pin.svg',
            // Размеры метки.
            iconImageSize: [40, 40],
            // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        })

        // myMap.geoObjects
        //     .add(myPlacemark)

        // Добавление баллунов
        placemarks.forEach((placemark) => {
            const item = new ymaps.Placemark(placemark.coordinates, baloonInfo);
            myMap.geoObjects.add(item);
        })

        // Добавление баллунов по документации

        // const myPlacemark = new ymaps.Placemark([54.83, 37.11], baloonInfo);
        // myMap.geoObjects.add(myPlacemark);

        // Попытка фильтровать баллуны по клику на соответсвующую кнопку 

        // buttonNear.addEventListener('click', () => {
        //     placemarks.forEach((placemark) => {
        //         if (placemark.type === 'near') {
        //             const item = new ymaps.Placemark(placemark.coordinates, baloonInfo);
        //             myMap.geoObjects.add(item);
        //         }
        //     })
        // })

        // buttonWork.addEventListener('click', () => {
        //     if (placemark.type === 'work') {
        //         const item = new ymaps.Placemark(placemark.coordinates, baloonInfo);
        //         myMap.geoObjects.add(item);
        //     }
        // })
        }
    }
})()