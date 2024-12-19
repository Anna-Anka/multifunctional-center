(function() {
    if (document.querySelector('.stepper')) {
        const stepper = document.querySelector('.stepper');
        const stepperInput = stepper.querySelector('.stepper__input');
        const stepperBtnUp = stepper.querySelector('.stepper__btn--up');
        const stepperBtnDown = stepper.querySelector('.stepper__btn--down');

        let count = stepperInput.value;

        stepperInput.addEventListener('change', (e) => {
            const self = e.currentTarget;

            if (!self.value) {
                self.value = 1;
            }

            count = stepperInput.value;
        });

        stepperBtnUp.addEventListener('click', (e) => {
            e.preventDefault();

            count++;

            stepperInput.value = count;
        });

        stepperBtnDown.addEventListener('click', (e) => {
            e.preventDefault();

            count--;

            stepperInput.value = count;
        });
    }
})()