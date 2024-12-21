import GraphModal from 'graph-modal';

new GraphModal();

(function() {
    const buttons = document.querySelectorAll('.btn-thanks [data-graph-path]')

    if (buttons) {
        buttons.forEach((button) => {
            const value = button.getAttribute('data-graph-path')

            button.addEventListener('click', () => {
                new GraphModal('modal').open(value);
            });
        })
    }

    const feedbackButton = document.querySelector('[data-graph-path="modal-feedback-success"]')
    const vacancyButton = document.querySelector('[data-graph-path="modal-vacancy-success"]')
    const questionButton = document.querySelector('[data-graph-path="modal-question-success"]')

   // feedbackButton?.click() // Открыть модальное окно "спасибо за отзыв"
    // vacancyButton?.click() // Открыть модальное окно "спасибо за вопрос"
    // questionButton?.click() // Открыть модальное окно "спасибо за резюме"
})()



