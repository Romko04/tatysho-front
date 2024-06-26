const headerContent = document.querySelector('.header__content')
const counters = document.querySelectorAll('.adbantages__list-item strong');
const section = document.querySelector('.advantages');


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

    if (e.target.closest('.seo__block')) {
        let wrapper = e.target.closest('.seo__block')
        let text = wrapper.querySelector('.seo__text');
        let isActive = text.classList.contains('active');
        if (isActive) {
            text.style.maxHeight = null;
            text.classList.remove('active')
            return
        }
        if (text.style.maxHeight) {
            text.style.maxHeight = null;
            text.style.marginTop = null;
        } else {
            text.style.maxHeight = text.scrollHeight + 'px';
            text.style.marginTop = '1.5rem';

        }
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

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (e.target.closest('.header__menu-items li') && isMobile) {
        const li = e.target.closest('.header__menu-items li')
        const menu = li.querySelector('.sub__menu')

        if (menu.style.maxHeight) {
            menu.style.maxHeight = null;
            menu.style.marginTop = null;
        } else {
            menu.style.maxHeight = menu.scrollHeight + 'px';
            menu.style.marginTop = '1.5rem';
        }

    }

    const product__list = document.querySelector('.catalog__content')

    if (e.target.closest('.settings__button-show button')) {
        sidebar.classList.toggle('hide')
        if (product__list) {
            product__list.classList.toggle('catalog__content--full')
        }
    }

});

function toggleMenu() {
    const btn = document.querySelector('.header__burger');
    headerContent.classList.toggle('active');
    btn.classList.toggle('active');
    btn.classList.contains('active') ? document.body.classList.add('body-block') : document.body.classList.remove('body-block')
}



/*COUNTER*/

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
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


/*XFIXED SIDEBAR */

const sidebar = document.querySelector('.sidebar__catalog');
const catalogContent = document.querySelector('.catalog__content');

const sidebarHeight = sidebar.offsetHeight;
const catalogContentTopHeight = catalogContent.getBoundingClientRect().top
const catalogContentBottomHeight = catalogContent.getBoundingClientRect().bottom

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

updateSidebarPosition()

// Слухач подій для прокрутки сторінки
window.addEventListener('scroll', updateSidebarPosition);





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

sortWrapper.addEventListener('mouseover', function () {
    sortWrapper.classList.add('active');
});

sortWrapper.addEventListener('mouseout', function () {
        sortWrapper.classList.remove('active');
});