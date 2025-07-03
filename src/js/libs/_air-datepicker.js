import AirDatepicker from 'air-datepicker';

function airDatepickerInit() {
    const datepickers = document.querySelectorAll('[data-air-datepicker]');

    datepickers.forEach(input => {
        const options = {
            minDate: input.hasAttribute('data-days')? new Date() : false, // Опционально: запретить даты раньше текущей
            autoClose: true
        };

        // Если есть атрибут data-days, добавляем обработчик для блокировки дат
        if (input.hasAttribute('data-days')) {
            const allowedDaysStr = input.dataset.days || '';
            const allowedDays = allowedDaysStr.split(',').filter(Boolean); // Убираем пустые строки
            
            // Преобразуем даты в формат Date
            const parsedAllowedDays = allowedDays.map(dayStr => {
                const [day, month, year] = dayStr.split('.');
                return new Date(year, month - 1, day);
            });
            
            // Добавляем обработчик рендеринга ячеек
            options.onRenderCell = ({ date, cellType }) => {
                if (cellType === 'day') {
                    // Проверяем, разрешена ли дата
                    const isAllowed = parsedAllowedDays.some(allowedDate => 
                        date.getDate() === allowedDate.getDate() &&
                        date.getMonth() === allowedDate.getMonth() &&
                        date.getFullYear() === allowedDate.getFullYear()
                    );

                    return {
                        disabled: !isAllowed, // Блокируем все, кроме разрешенных
                        classes: isAllowed ? 'allowed-day' : '' // Добавляем класс для стилизации
                    };
                }
            };
        }

        // Инициализируем Air Datepicker для текущего инпута
        new AirDatepicker(input, options);
    });
}

airDatepickerInit();
window.airDatepickerInit = airDatepickerInit;