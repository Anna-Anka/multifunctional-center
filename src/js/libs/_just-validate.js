import JustValidate from "just-validate";

(function () {
    const forms = document.querySelectorAll("[data-form-validate]")

    if (forms) {
        forms.forEach(form => {
            const buttonSubmit = form.querySelector('.form__button');

            const validation = new JustValidate(form, {
                validateBeforeSubmitting: true,
                errorFieldCssClass: 'form__field--error',
            });

            if (form.querySelector('input[type="email"]')) {
                const allEmailFields = form.querySelectorAll('input[type="email"]')

                allEmailFields.forEach((item) => {
                    const errorElement = item.nextElementSibling

                    validation.addField(item, [
                        {
                            rule: 'email',
                            errorMessage: 'Введите корректный email',
                        },
                        {
                            rule: 'required',
                            errorMessage: 'Поле обязательно для заполнения',
                        },
                    ], {
                        errorsContainer: errorElement,
                    });
                })
            }

            validation.onValidate(({
                isValid,
                isSubmitted,
                fields,
            }) => {


                if (buttonSubmit) {
                    if (isValid) {
                        buttonSubmit.removeAttribute('disabled');
                    } else {
                        buttonSubmit.setAttribute('disabled', 'true');
                    }
                }

                for (let key in fields) {
                    const element = fields[key].elem
                    if (fields[key].isValid) {
                        element.removeAttribute('aria-invalid');
                    } else {
                        if (!element.hasAttribute('aria-invalid')) {
                            element.setAttribute('aria-invalid', 'true');
                        }
                    }
                }
            });
        });
    }
})