function counter() {
  const counters = document.querySelectorAll('.stepper');

  counters.forEach((counter) => {
    const counterMin = parseInt(counter.getAttribute('data-stepper-min'), 10);
    const counterMax = parseInt(counter.getAttribute('data-stepper-max'), 10);
    const counterMinus = counter.querySelector('.stepper__btn--down');
    const counterPlus = counter.querySelector('.stepper__btn--up');
    const counterInput = counter.querySelector('input');

    counterInput.addEventListener('input', () => {
      const counterInput = counter.querySelector('input');
      let counterInputValue = parseInt(`${counterInput.value}`, 10);

      if (counterInputValue > counterMax) {
        counterInputValue = counterMax;
        counterInput.value = counterMax;
      }

      if (counterInputValue === counterMin) {
        counterMinus.disabled = true;
      } else {
        counterMinus.disabled = false;
      }

      if (counterInputValue === counterMax) {
        counterPlus.disabled = true;
      } else {
        counterPlus.disabled = false;
      }
    });

    counterMinus.addEventListener('click', () => {
      const counterInput = counter.querySelector('input');
      let counterInputValue = parseInt(`${counterInput.value}`, 10);

      counterInput.value = --counterInputValue;

      if (counterInputValue === counterMin) {
        counterMinus.disabled = true;
      } else {
        counterMinus.disabled = false;
      }

      if (counterInputValue === counterMax) {
        counterPlus.disabled = true;
      } else {
        counterPlus.disabled = false;
      }
    });

    counterPlus.addEventListener('click', () => {
      const counterInput = counter.querySelector('input');
      let counterInputValue = parseInt(`${counterInput.value}`, 10);

      counterInput.value = ++counterInputValue;

      if (counterInputValue === counterMin) {
        counterMinus.disabled = true;
      } else {
        counterMinus.disabled = false;
      }

      if (counterInputValue === counterMax) {
        counterPlus.disabled = true;
      } else {
        counterPlus.disabled = false;
      }
    });
  });
}

counter();


window.counter = counter;