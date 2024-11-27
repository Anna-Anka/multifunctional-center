(function () {
    const counts = document.querySelectorAll('.time-count');

    if (counts) {
        counts.forEach((count) => {
            const dateValue = new Date(count.getAttribute('data-timer'));

            const daysVal = count.querySelector('.time-count--days .time-count__value');
            const hoursVal = count.querySelector('.time-count--hours .time-count__value');
            const minutesVal = count.querySelector('.time-count--minutes .time-count__value');
            const secondsVal = count.querySelector('.time-count--seconds .time-count__value');

            const daysText = count.querySelector('.time-count--days .time-count__text');
            const hoursText = count.querySelector('.time-count--hours .time-count__text');
            const minutesText = count.querySelector('.time-count--minutes .time-count__text');
            const secondsText = count.querySelector('.time-count--seconds .time-count__text');

            function declOfNum(number, titles) {
                const cases = [2, 0, 1, 1, 1, 2];
                return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
            }

            const timeCount = () => {
                const now = new Date();
                const leftUntil = dateValue - now;

                const days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
                const hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
                const minutes = Math.floor(leftUntil / 1000 / 60) % 60;
                const seconds = Math.floor(leftUntil / 1000) % 60;

                daysVal.textContent = days;
                hoursVal.textContent = hours;
                minutesVal.textContent = minutes;
                secondsVal.textContent = seconds;

                daysText.textContent = declOfNum(days, ['день', 'дня', 'дней']);
                hoursText.textContent = declOfNum(hours, ['час', 'часа', 'часов']);
                minutesText.textContent = declOfNum(minutes, ['минута', 'минуты', 'минут']);
                secondsText.textContent = declOfNum(seconds, ['секунда', 'секунды', 'секунд']);
            };

            timeCount();
            setInterval(timeCount, 1000);
        });
    }
})
