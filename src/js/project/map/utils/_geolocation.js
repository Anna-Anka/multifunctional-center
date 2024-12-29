import {getArrayPins} from '../_data.js'
import { checkMarkerA11yByWrapperClass } from './_handlers.js'

function haversineDistance(coord1, coord2) {
    const R = 6371; // Радиус Земли в километрах
    const dLat = (coord2[1] - coord1[1]) * Math.PI / 180; // Разница в широте
    const dLon = (coord2[0] - coord1[0]) * Math.PI / 180; // Разница в долготе

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coord1[1] * Math.PI / 180) * Math.cos(coord2[1] * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Возвращаем расстояние в километрах
}

export function getGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userCoords = [position.coords.latitude, position.coords.longitude];

            let closestPin = null;
            let closestDistance = Infinity;

            // Ищем ближайший объект
            getArrayPins(false).forEach(pin => {
                const distance = haversineDistance(userCoords, pin.coordinates);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestPin = pin;
                }
            });

            const wrappers = document.querySelectorAll('.marker')
            wrappers.forEach((wrapper) => {
                wrapper.classList.add('marker--hidden')
                checkMarkerA11yByWrapperClass(wrapper)
            })

            const balloon = document.getElementById(closestPin.id)
            const wrapper = balloon.closest('.marker')
            wrapper.classList.remove('marker--hidden')
            checkMarkerA11yByWrapperClass(wrapper)

        }, function (error) {
            console.error("Ошибка получения местоположения: " + error.message);
        });
    } else {
        console.log("Геолокация не поддерживается вашим браузером.");
    }
}