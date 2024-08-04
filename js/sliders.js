const hero__slider = document.querySelector('.hero__slider')
const services__slider = document.querySelector('.services__slider')
const utp__slider = document.querySelector('.utp__slider--mobile')
const services__type__slider = document.querySelector('.services__type__slider')
const cases__slider = document.querySelector('.cases__slider')
const reviews__slider = document.querySelector('.reviews__slider')
const products__sliders = document.querySelectorAll('.swiper-product')
const product__single__swiper = document.querySelector('.product__single__swiper')
const product__colors__swiper = document.querySelector('.product__colors__swiper')





if (product__single__swiper) {
    new Swiper(product__single__swiper, {
        slidesPerView: 1,
        spaceBetween: 8,
        direction: 'horizontal',
        pagination: {
            el: '.swiper-pagination--product',
            clickable: true,
            renderBullet: function (index, className) {
                if (index < 6) { // Ліміт на 4 булети
                    return '<span class="' + className + '"></span>';
                }
                return '';
            },
        },
        breakpoints: {
            1024: {
                slidesPerView: 5,
                spaceBetween: 8,
                direction: 'vertical',
            },
        }
    });
}





if (product__colors__swiper) {


    new Swiper(product__colors__swiper, {
        slidesPerView: 5.8,
        spaceBetween: 24,
        scrollbar: {
            el: '.swiper-scrollbar--colors',
            draggable: true,
        },
        
    });

}




if (products__sliders.length > 0) {
    products__sliders.forEach(products__slider => {
        const nextButton = products__slider.getAttribute('data-next');
        const prevButton = products__slider.getAttribute('data-prev');
        const scrollButton = products__slider.getAttribute('data-scrollbar');

        new Swiper(products__slider, {
            slidesPerView: 1.1,
            spaceBetween: 8,
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
            scrollbar: {
                el: scrollButton,
                draggable: true,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                }
            }
        });
    });
}




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
        centeredSlides: true,
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
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
                centeredSlides: false,
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
                navigation: {
                    nextEl: '.swiper-button-next--type',
                    prevEl: '.swiper-button-prev--type',
                },
            }

        }
    });
}


if (cases__slider) {
    new Swiper(cases__slider, {
        slidesPerView: 1.1,
        spaceBetween: 8,
        // Navigation arrows
        scrollbar: {
            el: '.swiper-scrollbar-cases',
            draggable: true,
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.swiper-button-next--cases',
                    prevEl: '.swiper-button-prev--cases',
                },
            }
        }
    });
}

if (reviews__slider) {
    new Swiper(reviews__slider, {
        slidesPerView: 1.1,
        spaceBetween: 8,
        navigation: {
            nextEl: '.swiper-button-next--reviews',
            prevEl: '.swiper-button-prev--reviews',
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            }
        }
    });
}

