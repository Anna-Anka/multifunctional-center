import Swiper from 'swiper';
import { Navigation, Grid } from "swiper/modules";
Swiper.use([Navigation, Grid]);

if (document.querySelector('.partners__swiper')) {
    new Swiper('.partners__swiper', {
        breakpoints: {
            992: {
                spaceBetween: 32,
                slidesPerView: 'auto',
                grid: {
                    fill: 'row',
                    rows: 2,
                },
                navigation: {
                    nextEl: '.partners__button--next',
                    prevEl: '.partners__button--prev',
                },
            },

            0: {
                spaceBetween: 16,
                slidesPerView: 'auto',
            },
        },
    });
}
