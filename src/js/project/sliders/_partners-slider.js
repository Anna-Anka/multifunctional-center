import {sliderA11y} from './_a11y-data.js'
import Swiper from 'swiper';
import { Navigation, Grid, A11y } from "swiper/modules";
Swiper.use([Navigation, Grid, A11y]);

if (document.querySelector('.partners__swiper')) {
    new Swiper('.partners__swiper', {

        a11y: sliderA11y,

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
