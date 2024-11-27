(function() {
    const parallax = document.querySelector('.parallax');
    const content = document.querySelector('.parallax__container');
    const mountains = document.querySelector('.images-parallax__mountains');

    const thresholdSets = [];
    for (let i = 0; i <= 1.0; i += 0.005) {
        thresholdSets.push(i);
    }

    const setParallaxItemsStyle = (scrollTopProcent) => {
        content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%);`;
        mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%);`;
    };

    const callback = () => {
        const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
        setParallaxItemsStyle(scrollTopProcent);
    };

    const observer = new IntersectionObserver(callback, {
        threshold: thresholdSets,
    });

    observer.observe(document.querySelector('.content'));
})
