(function() {
    if (document.querySelector('.marquee')) {
        const marquee = document.querySelectorAll('.marquee');
        const speed = 2;
        marquee.forEach((el) => {
            const container = el.querySelector('.marquee__wrapper');
            const content = el.querySelector('.marquee__wrapper > *');
            const elWidth = content.offsetWidth;
            const clone = content.cloneNode(true);
            container.appendChild(clone);
            let progress = 8;
            function loop() {
                progress -= speed;
                if (progress <= elWidth * -1) {
                    progress = 0;
                }
                container.style.transform = `translateX(${progress}px)`;
                container.style.transform += `skewX(${speed * 0}deg)`;
                window.requestAnimationFrame(loop);
            }
            loop();
        });
    }
})
