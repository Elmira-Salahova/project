document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const getData = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();
       
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const response = JSON.parse(request.response);
                callback(response);
            } else {
                console.error(new Error('Ошибка: ' + request.status));
            }
        });
    };

    const tabs = () => {
        const cardDetailChange = document.querySelectorAll('.card-detail__change');
        const cardDetailsTitle = document.querySelector('.card-details__title');
        const cardImageItem = document.querySelector('.card__image_item');
        const cardDetailsPrice = document.querySelector('.card-details__price');
        const descriptionMemory = document.querySelector('.description__memory');
        
        const data = [
            {
                name: 'Смартфон Apple iPhone 13 Pro 128GB Graphite',
                img:'img/iPhone-graphite.png',
                memory: 128,
                price: 70000
            },
            {
                name: 'Смартфон Apple iPhone 13 Pro 256GB Silver',
                img:'img/iPhone-silver.png',
                memory: 256,
                price: 66000
            },
            {
                name: 'Смартфон Apple iPhone 13 Pro 128GB Pacific Blue',
                img:'img/iPhone-blue.png',
                memory: 128,
                price: 99000
            }
        ];

        const deactive = () => {
            cardDetailChange.forEach(btn => btn.classList.remove('active'))
        }


        cardDetailChange.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if(!btn.classList.contains('active')) {
                    deactive();
                    btn.classList.add('active');

                    cardDetailsTitle.textContent = data[i].name;
                    cardImageItem.src = data[i].img; 
                    cardImageItem.alt = data[i].name; 
                    cardDetailsPrice.textContent = data[i].price + '₽';
                    descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memory} ГБ`;
                }
            });
        });

    };

    const accordion = () => {
        const characteristicsList = document.querySelector('.characteristics__list');
        const characteristicsItem = document.querySelectorAll('.characteristics__item');

        const open = (button, dropDown) => {
            closeAllDrops(button, dropDown);
            dropDown.style.height = `${dropDown.scrollHeight}px`
            button.classList.add('active');
            dropDown.classList.add('active');
        };

        const close = (button, dropDown) => {
            button.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height = '';
        };

        const closeAllDrops = (button, dropDown) => {
            characteristicsItem.forEach((elem) => {
                if (elem.children[0] !== button && elem.children[1] !==dropDown) {
                    close(elem.children[0], elem.children[1]);
                }
            })
        }

        characteristicsList.addEventListener('click', (event) => {
            const target = event.target;
            if(target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item');
                const description = parent.querySelector('.characteristics__description');
                description.classList.contains('active') ?
                 close(target, description) : 
                    open(target, description);
            }
        });
       
    };

    const modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
        const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
        const modal = document.querySelector('.modal');
        const cardDetailsTitle = document.querySelector('.card-details__title');
        const modalTitle = modal.querySelector('.modal__title');
        const modalSubtitle = modal.querySelector('.modal__subtitle');

    
        const openModal = (event) => {
            const target = event.target;
            modal.classList.add('open');
            document.body.style.overflow = "hidden"; 
            document.addEventListener('keydown', escapeHandler);
            modalTitle.textContent = cardDetailsTitle.textContent;
            modalSubtitle.textContent = target.dataset.buttonBuy;
        };

        const closeModal = () => {
            modal.classList.remove('open');
            document.removeEventListener('keydown', escapeHandler);
            document.body.style.overflow = ""; 
        };

        const escapeHandler = event => {
            if (event.code === "Escape") {
                closeModal();
            }
        };     
        
        modal.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('modal__close') || target === modal) {
                closeModal();
            }
        });

    

        cardDetailsButtonBuy.addEventListener('click', openModal);
   
        cardDetailsButtonDelivery.addEventListener('click', openModal);
    };

    const renderCrossSell = () => {
        const crossSellList = document.querySelector('.cross-sell__list');
        const crossSellAdd = document.querySelector('.cross-sell__add');
        const allGoods = [];

        const shuffle = arr => arr.sort(() => Math.random() - 0.5); 

        const createCrossSellItem = (good) => {

            const {photo, name, price} = good;

            const liItem = document.createElement('li');
            liItem.innerHTML = `
            <article class="cross-sell__item">
                <img class="cross-sell__image" src="${photo}" alt="${name}">
                <h3 class="cross-sell__title">${name}</h3>
                <p class="cross-sell__price">${price}₽</p>
                <button type="button" class="button button_buy cross-sell__button">Купить</button>
            </article>
            `;
            return liItem;
        };

        const render = arr => {
            arr.forEach(item => { 
                crossSellList.append(createCrossSellItem(item));
            });
        };

    
        const createCrossSellList = (goods = []) => {
            allGoods.push(...shuffle(goods));
            const fourItems = allGoods.splice(0, 4);
            render(fourItems);
        };
      
      
        crossSellAdd.addEventListener('click', () => {
            render(allGoods);
            crossSellAdd.remove();
        });

        getData('cross-sell-dbase/dbase.json', createCrossSellList);
    };

    tabs();
    accordion();
    modal();
    renderCrossSell();
});