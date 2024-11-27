import { throttle } from '../utils/index.js';

(function() {
    const items = document.querySelectorAll('[data-numbers]');
    const isDoneItems = Array.from(items).map(() => false);

    if (items && items.length) {
        const animateNumber = (item, startValue, endValue, step, time) => {
            const iterationTime = Math.round(time / ((endValue - startValue) / step));

            let currentValue = startValue;
            const interval = setInterval(() => {
                if (currentValue < endValue) {
                    currentValue += step;
                    if (currentValue > endValue) {
                        currentValue = endValue;
                    }
                } else {
                    clearInterval(interval);
                }
                item.innerHTML = currentValue;
            }, iterationTime);
        };

        const increase = () => {
            const positionUser = window.scrollY; // где мы сейчас
            const heightScreen = window.innerHeight; // высота экрана

            items.forEach((item, index) => {
                const offsetTopItem = item.offsetTop; // расположение каждого айтема
                const heightItem = item.offsetHeight
                const isDoneCurrentItem = isDoneItems[index];

                if ((offsetTopItem < positionUser + heightScreen - (heightItem * 1.5) && offsetTopItem + heightItem > positionUser + (heightItem * 2) && !isDoneCurrentItem)) {
                    isDoneItems[index] = true;

                    const startValue = Number(item.getAttribute('data-start-value'));
                    const endValue = Number(item.getAttribute('data-end-value'));
                    const step = Number(item.getAttribute('data-step'));
                    const time = Number(item.getAttribute('data-time'));

                    animateNumber(item, startValue, endValue, step, time);
                }
            });
        };

        increase();

        const increaseThrottle = throttle(increase);
        window.addEventListener('scroll', increaseThrottle);
    }
})