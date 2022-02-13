const renderProduct = () => {
    const productWrapper = document.querySelector('.product-wrapper');

    const shuffle = arr => arr.sort(() => Math.random() - 0.5); 

        const createCrossSellItem = (good) => {

            const {photo, name, price} = good;

            const liItem = document.createElement('li');
            liItem.innerHTML = `
            <div class="catalog-descr-3 descr">
            <div class="catalog-descr__img">
                <img class="catalog__img" src="img/catalog/image-3.png" alt="Каталог">
                
                <a class="basket__cart" href="cart.html">
                        <button class="basket__btn">
                        <div class="basket__btn-img">	
                            <img src="img/catalog/basket_cart.png" alt="Каталог">
                        </div>
                        
                        <div class="basket__cart-text">
                            Add to Cart
                        </button>
                </a>
            </div><!-- /catalog-descr__img -->

            <a href="product.html">		
                <div class="catalog-descr__title">
                    Толстовка
                </div><!-- /catalog-block__title -->
            </a>

            <div class="catalog-descr__subtitle">
                Худи графический на термальной подкладке
            </div><!-- /catalog-block__subtitle -->

            <div class="catalog-descr__price">30$</div><!-- /catalog-block__price -->
        </div><!-- /catalog-desc -->
            `;
            return liItem;
        };

        const render = arr => {
            arr.forEach(item => { 
                productWrapper.append(createCrossSellItem(item));
            });
        };
};