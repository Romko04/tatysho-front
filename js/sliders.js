const hero__slider = document.querySelector('.hero__slider')
const services__slider = document.querySelector('.services__slider')
const utp__slider = document.querySelector('.utp__slider')





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
            nextEl: '.swiper-button-next--hero',
            prevEl: '.swiper-button-prev--hero',
        },

        scrollbar: {
            el: '.swiper-scrollbar--services',
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
            el: '.swiper-pagination--utp',
            clickable: true,
        },
    });
}