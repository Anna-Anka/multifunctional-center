(function () {
    if (document.querySelector('.rating')) {
        const ratings = document.querySelectorAll('.rating');

        ratings.forEach((rating) => {
            const radioButtons = rating.querySelectorAll('input[type="radio"]');
            const ratingValue = rating.querySelector('.rating__value');
            radioButtons.forEach((radioButton) => {
                radioButton.addEventListener('change', () => {
                    if (radioButton.checked) {
                        ratingValue.textContent = radioButton.value;
                    }
                });
            });
        });
    }
})
