import Choices from 'choices.js';

const choicesInstances = new Map();

function initChoices(selector = '[data-choice]') {
    const selects = document.querySelectorAll(selector);

    selects.forEach((select) => {
        if (choicesInstances.has(select)) {
            choicesInstances.get(select).destroy();
            choicesInstances.delete(select);
        }

        const instance = new Choices(select, {
            searchEnabled: false,
            searchChoices: false,
            shouldSort: false,
            placeholder: true,
        });
        
        choicesInstances.set(select, instance);
    });
}

initChoices();

function reinitSelect(selectElement) {
    if (!selectElement) return;
    
    if (typeof selectElement === 'string') {
        const elements = document.querySelectorAll(selectElement);
        elements.forEach(el => initChoices(`#${el.id}`));
        return;
    }
    
    if (selectElement instanceof Node) {
        initChoices(`#${selectElement.id}`);
    } else if (selectElement.length) {
        const selector = Array.from(selectElement).map(el => `#${el.id}`).join(',');
        initChoices(selector);
    }
}

window.reinitSelect = reinitSelect;