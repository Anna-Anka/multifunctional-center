import { throttle } from '../../utils/index.js';

(function () {
    const showPasswordWrapper = (e) => {
        const targetElement = e.target;
        if (targetElement.closest('[data-show-password]')) {
            const inputType = targetElement.classList.contains('form__show--active') ? 'password' : 'text';
            targetElement.parentElement.querySelector('input').setAttribute('type', inputType);
            targetElement.classList.toggle('form__show--active');
        }
    };

    const showPasswordTrottle = throttle(showPasswordWrapper);
    document.addEventListener('click', showPasswordTrottle);
})
