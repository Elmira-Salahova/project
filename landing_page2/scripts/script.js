document.addEventListener('DOMContentLoaded', () => {
'use strict';

const modalWindow = () => {
    const modal = document.querySelector('.modal');
    const buttonBuy = document.querySelectorAll('.items__button-buy');

    buttonBuy.forEach((e) => {
       e.addEventListener('click', () => {
           modal.classList.add('open');
        });
    });

    modal.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('modal__close') || target === modal) {
            modal.classList.remove('open');
        }
    });

};

const scrollButton = () => {
    const scroll = document.querySelectorAll('.present__btn');
    scroll.forEach((e) => {
        e.addEventListener('click', element => {
            element = document.getElementById('product'),
            element.scrollIntoView(true);
        });
    });
};

modalWindow();
scrollButton();

});