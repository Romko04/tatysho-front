const headerContent = document.querySelector('.header__content')
const counters = document.querySelectorAll('.adbantages__list-item strong');
const section = document.querySelector('.advantages');
const body = document.querySelector('body');
const main = document.querySelector('main');

const timeout = 300
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


let unlockPopup = true


const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => {
                console.log(counter.textContent);
                const target = +counter.textContent;
                counter.value = 0
                let count = 0;
                let increment;
                let delay;

                if (target > 100000) {
                    increment = 2500;
                    delay = 20;
                } else if (target > 50000) {
                    increment = 500;
                    delay = 10;
                } else if (target > 10000) {
                    increment = 500;
                    delay = 15;
                } else if (target > 5000) {
                    increment = 50;
                    delay = 20;
                } else if (target > 1000) {
                    increment = 10;
                    delay = 30;
                } else {
                    increment = 1;
                    delay = 50;
                }

                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = formatNumber(count);
                        setTimeout(updateCounter, delay);
                    } else {
                        counter.textContent = formatNumber(target);
                    }
                };

                updateCounter();
            });

            observer.unobserve(entry.target);
        }
    });
};


function toggleMenu() {
    const btn = document.querySelector('.header__burger');
    headerContent.classList.toggle('active');
    btn.classList.toggle('active');
    btn.classList.contains('active') ? document.body.classList.add('body-block') : document.body.classList.remove('body-block')
}

function updateSidebarPosition() {
    const currentScroll = window.pageYOffset;
    const sidebar = document.querySelector('.sidebar__catalog');
    const catalogContent = document.querySelector('.catalog__content');

    const catalogContentTopHeight = catalogContent.getBoundingClientRect().top + window.pageYOffset;
    const catalogContentBottomHeight = catalogContentTopHeight + catalogContent.offsetHeight;
    const sidebarHeight = sidebar.offsetHeight;
    const catalogContentBottomHeightMargin = catalogContentBottomHeight - sidebarHeight - 50


    if (currentScroll >= catalogContentTopHeight - 50 && currentScroll < catalogContentBottomHeightMargin) {
        sidebar.classList.add('fixed');
        sidebar.classList.remove('bottom');
    } else if (currentScroll >= catalogContentBottomHeightMargin) {
        sidebar.classList.remove('fixed');
        sidebar.classList.add('bottom');
    } else {
        sidebar.classList.remove('fixed');
        sidebar.classList.remove('bottom');
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
    body.classList.add('body--lock')
    body.style.paddingRight = lockPaddingValue
    // header.style.paddingRight = lockPaddingValue

    unlockPopup = false

    setTimeout(() => {
        unlockPopup = true
    }, timeout);
}

function bodyUnLock() {
    setTimeout(() => {
        body.style.paddingRight = '0px'
        // header.style.paddingRight = '0px'
        body.classList.remove('body--lock')

    }, timeout);

    unlockPopup = false

    setTimeout(() => {
        unlockPopup = true
    }, timeout);
}

function toggleAccordeon(el, isActive) {
    if (isActive) {
        el.style.maxHeight = null;
        el.classList.remove('active')
        return
    }
    if (el.style.maxHeight) {
        el.style.maxHeight = null;
        el.style.marginTop = null;
    } else {
        el.style.maxHeight = el.scrollHeight + 'px';
        el.style.marginTop = '1.5rem';
    }
}


document.querySelector('.custom-select-wrapper').addEventListener('click', function () {
    this.querySelector('.custom-select').classList.toggle('open');
});


for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected') && !this.classList.contains('disabled')) {
            const selectedOption = this.parentNode.querySelector('.custom-option.selected');
            selectedOption.classList.remove('selected', 'disabled');
            this.classList.add('selected', 'disabled');
            this.closest('.custom-select').querySelector('.custom-select-trigger').textContent = this.textContent;
        }
    });
}





window.addEventListener('click', function (e) {
    const select = document.querySelector('.custom-select');
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
    if (e.target.closest('.header__burger-wrapper')) {
        toggleMenu()
    }

    if (e.target.closest('.accordeon')) {
        let wrapper = e.target.closest('.accordeon')
        let info = wrapper.querySelector('.accordeon__info');
        let isActive = info.classList.contains('active');
        toggleAccordeon(info, isActive)
    }

    const filterBtn = e.target.closest('.filter__drop')

    if (filterBtn) {
        filterBtn.classList.toggle('active')
        const content = filterBtn.nextElementSibling
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    }





    if ((e.target.closest('.header__menu-items > li > a') || e.target.closest('.sub__menu li')) && isMobile) {

        e.target.closest('.header__menu-items > li > a') && e.preventDefault();

        const li = e.target.closest('li');
        const menu = li.querySelector('.sub__menu');

        li.classList.toggle('active');

        if (menu.style.maxHeight) {
            menu.style.maxHeight = null;
        } else {
            let totalSubMenuHeight = 0;

            const calculateHeight = (element) => {
                totalSubMenuHeight += element.scrollHeight;
                const nestedMenus = element.querySelectorAll('.sub__menu');
                nestedMenus.forEach(nestedMenu => {
                    calculateHeight(nestedMenu);
                });
            };

            calculateHeight(menu);

            menu.style.maxHeight = totalSubMenuHeight + 'px';
        }
    }

    const product__list = document.querySelector('.catalog__content')

    if (e.target.closest('.settings__button-show button') || e.target.closest('.sidebar__mobile-top--filters')) {

        if (isMobile) {
            body.classList.contains('body--lock') && isMobile ? bodyUnLock() : bodyLock()
            main.classList.toggle('main-index')
        }

        sidebar.classList.toggle('hide')
        if (product__list) {
            product__list.classList.toggle('catalog__content--full')
        }
    }


    if (e.target.closest('.tabs__tab')) {
        const tab = e.target.closest('.tabs__tab');
        document.querySelectorAll('.tabs__tab').forEach(item => item.classList.remove('tabs__tab--active'));
        document.querySelectorAll('.tabs__content').forEach(content => {
            content.classList.remove('tabs__content--active');
            content.style.height = '0'; // Set height to 0 before removing active class
        });

        tab.classList.add('tabs__tab--active');
        const contentToShow = document.getElementById(tab.getAttribute('data-tab'));
        contentToShow.classList.add('tabs__content--active');
        contentToShow.style.height = contentToShow.scrollHeight + 'px'; // Set height to auto to trigger transition
    }


    //Прослушка для попапа
    if (e.target.classList.contains('btn__popup')) {

        const popupClass = e.target.getAttribute('data-popup');
        const popup = document.querySelector(popupClass)



        if (unlockPopup) {
            bodyLock()
            popup.classList.add('active')
            popup.addEventListener('click', (e) => {
                if (!e.target.closest('.popup__content') || e.target.closest('.popup__close')) {
                    e.preventDefault()
                    popup.classList.remove('active')
                    bodyUnLock()
                }
            })
        }

    }

    //Слайдер для продукта

    const mainPhoto = document.querySelector('.product-slider .main-image img');
    let activeSlide = document.querySelector('.thumbnail-container .active');

    if (e.target.closest('.thumbnail')) {
        const thumbnailWrapper = e.target.closest('.thumbnail');
        const img = thumbnailWrapper.querySelector('img')
        const thumbnailSrc = img.getAttribute('src');

        if (activeSlide) {
            activeSlide.classList.remove('active');
        }

        thumbnailWrapper.classList.add('active');
        activeSlide = thumbnailWrapper;

        mainPhoto.classList.add('fade-out');

        setTimeout(() => {
            mainPhoto.setAttribute('src', thumbnailSrc);
            mainPhoto.classList.remove('fade-out');
        }, 300); // Затримка відповідно до тривалості transition
    }

});








/*COUNTER*/

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(callback, options);
if (section) {
    observer.observe(section);
}

/*SUB MENU */

document.querySelectorAll('.header__menu-items li').forEach(item => {
    let closeMenuTimeout;

    item.addEventListener('mouseenter', () => {
        const submenu = item.querySelector('.sub__menu');
        if (submenu) {
            if (closeMenuTimeout) {
                clearTimeout(closeMenuTimeout);
            }
            submenu.classList.add('active');
        }
    });

    item.addEventListener('mouseleave', () => {
        const submenu = item.querySelector('.sub__menu');
        if (submenu) {
            // Встановлюємо таймаут на закриття підменю
            closeMenuTimeout = setTimeout(() => {
                submenu.classList.remove('active');
            }, 500);
        }
    });

});


/*FIXED SIDEBAR */

const sidebar = document.querySelector('.sidebar__catalog');
const catalogContent = document.querySelector('.catalog__content');

if (sidebar && catalogContent) {

    updateSidebarPosition()

    // Слухач подій для прокрутки сторінки
    window.addEventListener('scroll', updateSidebarPosition);
}





/*FILTER PRICE */


const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);

        if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);
        if ((maxVal - minVal) < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});


var sortWrapper = document.querySelector('.settings__button-sort');

if (sortWrapper) {
    sortWrapper.addEventListener('mouseover', function () {
        sortWrapper.classList.add('active');
    });

    sortWrapper.addEventListener('mouseout', function () {
        sortWrapper.classList.remove('active');
    });
}


const countdownElements = document.querySelectorAll('.countdown');




if (countdownElements) {
  countdownElements.forEach(function (element) {
    const DateTime = element.getAttribute('data-time');
    var endDate = new Date(DateTime);
    updateCountdown(endDate, element);
  });
}



function updateCountdown(endDate, countdownElement) {
  var now = new Date();
  var difference = endDate - now;

  var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);

//   var lang = my_ajax_object.lang;
//   var daysText, hoursText, minutesText, secondsText;

//   // Визначення тексту залежно від мови
//   if (lang === 'uk') {
    
//   } else if (lang === 'ru') {
//     daysText = 'дней';
//     hoursText = 'часов';
//     minutesText = 'минут';
//     secondsText = 'секунд';
//   } else {
//     // Задайте значення за замовчуванням або обробіть інші мови
//     daysText = 'days';
//     hoursText = 'hours';
//     minutesText = 'minutes';
//     secondsText = 'seconds';
//   }

  countdownElement.innerHTML =
    '<div class="time__wrapper"><span class="countdown-value">' + days + '</span> ' + daysText + ' </div>' +
    '<div class="time__wrapper"><span class="countdown-value">' + hours + '</span> ' + hoursText + ' </div>' +
    '<div class="time__wrapper"><span class="countdown-value">' + minutes + '</span> ' + minutesText + ' </div>' +
    '<div class="time__wrapper"><span class="countdown-value">' + seconds + '</span> ' + secondsText + ' </div>';

  // Оновлення кожної секунди
  setTimeout(function () {
    updateCountdown(endDate, countdownElement);
  }, 1000);
}

