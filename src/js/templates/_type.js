(function () {
    const text = ['text'];
    let line = 0;
    let count = 0;
    let out = '';
    const htmlTitle = document.querySelector('.hero__text');

    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

    const typeLine = () => {
        if (htmlTitle) {
            const interval = setTimeout(() => {
                out += text[line][count];
                htmlTitle.innerHTML = `${out} | `;
                count++;

                if (count >= text[line].length) {
                    count = 0;
                    line++;

                    if (line === text.length) {
                        clearTimeout(interval);
                        htmlTitle.innerHTML = out;
                        return true;
                    }
                }

                typeLine();
            }, getRandomInt(250));
        }
    };

    typeLine();
})

