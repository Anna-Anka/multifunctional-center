import Swiper from 'swiper';
import { Navigation, Thumbs } from "swiper/modules";

Swiper.use([Navigation, Thumbs]);

const sliderMain = document.querySelector('.gallery-page .slider-main');
const sliderNav = document.querySelector('.gallery-page .slider-nav');
const wrapperSliderNav = document.querySelector('.gallery-page__thumbs')

if (sliderNav && sliderMain && wrapperSliderNav) {
    const swiperSmall = new Swiper(sliderNav, {
        
        loopedSlides: 4,
        freeMode: true,

        navigation: {
            nextEl: wrapperSliderNav.querySelector('.swiper-container__button--prev'),
            prevEl: wrapperSliderNav.querySelector('.swiper-container__button--next'),
        },
        
        breakpoints: {
            769: {
                direction: 'vertical',
                slidesPerView: 4,
                spaceBetween: 16,
                slidesPerGroup: 4,
            },

            0: {
                direction: 'horizontal',
                slidesPerView: 'auto',
                spaceBetween: 8,
            }
        }
    });

    new Swiper(sliderMain, {
        spaceBetween: 10,
        loopedSlides: 4,

        thumbs: {
            swiper: swiperSmall,
        },

        navigation: {
            nextEl: sliderMain.querySelector('.swiper-container__button--prev'),
            prevEl: sliderMain.querySelector('.swiper-container__button--next'),
        },
    });
}