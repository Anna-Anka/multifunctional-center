import { sliderA11y } from './_a11y-data.js'
import Swiper from 'swiper';
import { Navigation, a11y } from "swiper/modules";
Swiper.use([Navigation, a11y]);

if (document.querySelector('.office-department__swiper')) {
    new Swiper('.office-department__swiper', {
        a11y: sliderA11y,
        spaceBetween: 16,
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: true,
        navigation: {
            nextEl: '.swiper-container__button--next',
            prevEl: '.swiper-container__button--prev',
        },
    });
}
