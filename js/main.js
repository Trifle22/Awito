'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const modalItem = document.querySelector('.modal__item');
const elementsModalSubmit = [...modalSubmit.elements].filter(elem => elem.tagName !== 'BUTTON');
const modalBtnWarning = document.querySelector('.modal__btn-warning');


const closeModal = function(event) {
    const target = event.target;

    if (target.closest('.modal__close') || target === this) {
        this.classList.add('hide');
        modalSubmit.reset();
        if (this === modalAdd) {
            modalSubmit.reset();
        }
    }
};

const closeModalEsc = event => {
    if (event.code === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalSubmit.reset();
        document.removeEventListenerI('keydown', closeModalEsc);
    };
};

modalSubmit.addEventListener('input', () => {
    const validForm = elementsModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }
    dataBase.push(itemObj);
    modalSubmit.reset();

});

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModalEsc);
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

catalog.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.card')) {
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModalEsc);
    };
});