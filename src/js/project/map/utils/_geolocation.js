import { checkMarkerA11yByWrapperClass } from "./_handlers.js";

function haversineDistance(coord1, coord2) {
  const R = 6371; // Радиус Земли в километрах
  const dLat = ((coord2[1] - coord1[1]) * Math.PI) / 180; // разница широты
  const dLon = ((coord2[0] - coord1[0]) * Math.PI) / 180; // разница долготы

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((coord1[1] * Math.PI) / 180) *
      Math.cos((coord2[1] * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // расстояние в км
}

export function getGeolocation(pins) {
  if (!("geolocation" in navigator)) {
    console.log("Геолокация не поддерживается вашим браузером.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      // Для Яндекс.Карт порядок [долгота, широта]
      const userCoords = [position.coords.longitude, position.coords.latitude];

      let closestPin = null;
      let closestDistance = Infinity;

      pins.forEach((pin) => {
        const distance = haversineDistance(userCoords, pin.coordinates);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPin = pin;
        }
      });

      if (!closestPin) {
        console.log("Ближайшая точка не найдена.");
        return;
      }

      // Скрываем все маркеры
      const wrappers = document.querySelectorAll(".marker");
      wrappers.forEach((wrapper) => {
        wrapper.classList.add("marker--hidden");
        checkMarkerA11yByWrapperClass(wrapper);
      });

      // Показываем ближайший маркер
      const balloon = document.getElementById(closestPin.id);
      if (!balloon) {
        console.warn(`Элемент с id="${closestPin.id}" не найден`);
        return;
      }

      const wrapper = balloon.closest(".marker");
      if (wrapper) {
        wrapper.classList.remove("marker--hidden");
        checkMarkerA11yByWrapperClass(wrapper);
      }

      // Опционально: центрируем карту на ближайшей точке и открываем баллун
      if (window.ymaps3 && window.mapInstance) {
        window.mapInstance.setCenter(closestPin.coordinates);
        balloon.style.display = "block"; // если баллун скрыт
      }
    },
    (error) => {
      console.error("Ошибка получения местоположения: " + error.message);
    },
    { enableHighAccuracy: true },
  );
}
