(function () {
    const blocks = document.querySelectorAll('.select-mobile');

    if (blocks) {
        const documentHandler = (button, list) => {
            document.addEventListener('click', (event) => {
                if (!button.contains(event.target) && !list.contains(event.target)) {
                    button.setAttribute('aria-expanded', 'false');
                    list.classList.remove('select-mobile__list--active')
                }
            });
        }

        const changeHandler = (parent, array) => {
            array.forEach((item) => {
                item.classList.remove('select-mobile__item--active')
            })
            parent.classList.add('select-mobile__item--active')
            //list.classList.remove('select-mobile__list--active')
        }

        blocks.forEach((block) => {
            const button = block.querySelector('.select-mobile__button');
            const list = block.querySelector('.select-mobile__list');
            const items = block.querySelectorAll('.select-mobile__item');

            items.forEach((item, key, array) => {
                console.log(key, parent)
                const input = item.querySelector('.select-mobile__hidden');
                if (input.hasAttribute('checked')) {
                    const parent = input.closest('.select-mobile__item')
                    parent.classList.add('select-mobile__item--active')
                }
                input.addEventListener('change', () => {
                    changeHandler(item, array)
                })
            })

            button.addEventListener('click', () => {
                list.classList.toggle('select-mobile__list--active')

                if (list.classList.contains('select-mobile__list--active')) {
                    button.setAttribute('aria-expanded', true)
                } else {
                    button.setAttribute('aria-expanded', false)
                }
            })

            documentHandler(button, list);
        })
    }
})();