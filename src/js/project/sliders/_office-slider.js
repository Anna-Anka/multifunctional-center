import Swiper from 'swiper';
import { Navigation } from "swiper/modules";
Swiper.use([Navigation]);

if (document.querySelector('.office-department__swiper')) {
    new Swiper('.office-department__swiper', {
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
