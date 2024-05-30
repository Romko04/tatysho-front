const hero__slider = document.querySelector('.hero__slider')
const services__slider = document.querySelector('.services__slider')
const utp__slider = document.querySelector('.utp__slider--mobile')
const services__popular__slider = document.querySelector('.services__popular__slider')
const services__type__slider = document.querySelector('.services__type__slider')
const services__new__slider = document.querySelector('.services__new__slider')








if (hero__slider) {
    new Swiper(hero__slider, {
        pagination: {
            el: '.swiper-pagination--hero',
            clickable: true,
        },
    
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next--hero',
            prevEl: '.swiper-button-prev--hero',
        },
    });
}

if (services__slider) {
    new Swiper(services__slider, {
        slidesPerView: 1.1,
        spaceBetween: 8,
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next--services',
            prevEl: '.swiper-button-prev--services',
        },

        scrollbar: {
            el: '.swiper-scrollbar--services',
            draggable: true,
          },
    });
}

if (utp__slider) {
    new Swiper(utp__slider, {
        slidesPerView: 0.9,
        spaceBetween: 8,
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next--utp',
            prevEl: '.swiper-button-prev--utp',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

if (services__popular__slider) {
    new Swiper(services__popular__slider, {
        slidesPerView: 1.1,
        spaceBetween: 8,
        // Navigation arrows
        scrollbar: {
            el: '.swiper-scrollbar--services-popular',
            draggable: true,
          },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });
}

if (services__type__slider) {
    new Swiper(services__type__slider, {
        slidesPerView: 1.1,
        spaceBetween: 8,
        // Navigation arrows
        scrollbar: {
            el: '.swiper-scrollbar--services-type',
            draggable: true,
          },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });
}

if (services__new__slider) {
    new Swiper(services__new__slider, {
        slidesPerView: 1.1,
        spaceBetween: 8,
        // Navigation arrows
        scrollbar: {
            el: '.swiper-scrollbar--services-new',
            draggable: true,
          },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });
}