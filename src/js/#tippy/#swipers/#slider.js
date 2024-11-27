import Swiper, {
    Pagination, Navigation, Scrollbar, Autoplay,
} from 'swiper';

Swiper.use([Pagination, Navigation, Scrollbar, Autoplay]);

if (document.querySelector('.__swiper')) {
    new Swiper('.__swiper', {
        loop: true,
        speed: 800,
        slidesPerGroup: 1,
        slidesPerView: 1,
        centeredSlides: true,

        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            stopOnlastSlide: false,
        },

        navigation: {
            nextEl: '.__button--next',
            prevEl: '.__button--prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        scrollbar: {
            el: '.__scrollbar',
            draggable: true,
        },

        breakpoints: {
            1400: {
                spaceBetween: 35,
                slidesPerView: 1.5,
            },

            1200: {
                spaceBetween: 25,
                slidesPerView: 1.5,
            },
        },
    });
}
