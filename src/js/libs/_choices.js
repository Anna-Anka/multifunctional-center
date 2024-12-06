import Choices from 'choices.js'

(function () {
    const selects = document.querySelectorAll('[data-choice]');

    if (selects) {
        selects.forEach((select) => {
            new Choices(select, {
                searchEnabled: false,
                searchChoices: false,
                shouldSort: false,
                placeholder: true,
                // placeholderValue: 'text'
            });
        });
    }
})();
