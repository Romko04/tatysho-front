const headerContent = document.querySelector('.header__content')


document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
    this.querySelector('.custom-select').classList.toggle('open');
});


for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected') && !this.classList.contains('disabled')) {
            const selectedOption = this.parentNode.querySelector('.custom-option.selected');
            selectedOption.classList.remove('selected', 'disabled');
            this.classList.add('selected', 'disabled');
            this.closest('.custom-select').querySelector('.custom-select-trigger').textContent = this.textContent;
        }
    });
}

window.addEventListener('click', function(e) {
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
  
  
