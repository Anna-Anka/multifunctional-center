import GraphModal from 'graph-modal';

new GraphModal();

(function () {

    const graphModal = new GraphModal();
    graphModal.init();
    window.graphModal = graphModal

    const buttons = document.querySelectorAll('.btn-thanks [data-graph-path]')

    if (buttons) {
        buttons.forEach((button) => {
            const value = button.getAttribute('data-graph-path')

            button.addEventListener('click', () => {
                new GraphModal('modal').open(value);
            });
        })
    }

    // Открыть модальное окно. Первый способ
    // new GraphModal().open('modal-feedback-success')
    // в open передаем значение атрибута data-graph-target, нужной модалки

    // Второй способ
    // Я создала скрытые кнопки, по клику на которые будет открываться соответствующее модальное окно со спасибо (спасибо за отклик, за вопрос и т.д) 
    const feedbackButton = document.querySelector('[data-graph-path="modal-feedback-success"]')
    const vacancyButton = document.querySelector('[data-graph-path="modal-vacancy-success"]')
    const questionButton = document.querySelector('[data-graph-path="modal-question-success"]')

    // И в нужный момент мы просто вызываем событие клик на этой кнопке
    // feedbackButton?.click() // Открыть модальное окно "спасибо за отзыв"
    // vacancyButton?.click() // Открыть модальное окно "спасибо за вопрос"
    // questionButton?.click() // Открыть модальное окно "спасибо за резюме"
})()



