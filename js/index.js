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

});

function toggleMenu() {
    const btn = document.querySelector('.header__burger');
    headerContent.classList.toggle('active');
    btn.classList.toggle('active');
    btn.classList.contains('active') ? document.body.classList.add('body-block') : document.body.classList.remove('body-block')
}



/*Лічильник*/

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

observer.observe(section);




