"use strict";

const placetoRender = document.getElementById('catalog')


async function getData() {
    const response = await fetch ('/js/data.json')
    const products = await response.json();
       
        render(products);
       
}
getData();

function render(products) {
    products.forEach(el => {
         
         if (placetoRender) {
             const catalogBlock = document.createElement('div')
             catalogBlock.classList.add('catalog-descr')
             catalogBlock.classList.add('descr')
             catalogBlock.setAttribute('data-id', el.id)
             
         
             const catalogimage = document.createElement('div')
             catalogimage.classList.add('catalog-descr__img')
         
             const catalogPhoto = document.createElement('img')
             catalogPhoto.classList.add('catalog__img')  
             catalogPhoto.setAttribute('src', el.imgCatalog)
         
             const basketCart = document.createElement('a') 
             basketCart.classList.add('basket__cart')
             basketCart.setAttribute('href', '#.html')   
         
             const basketBtn = document.createElement('button')
             basketBtn.setAttribute('data-id','basket')
             basketBtn.classList.add('basket__btn') 
         
             const btnImage = document.createElement('div')
             btnImage.classList.add('basket__btn-img')
         
             const cartPhoto = document.createElement('img')
             cartPhoto.setAttribute('src', 'img/catalog/basket_cart.png')
         
             const basketText = document.createElement('p') 
             basketText.classList.add('basket__cart-text')
             basketText.innerHTML = "Add to Cart"
         
             catalogBlock.appendChild(catalogimage)
             catalogimage.appendChild(catalogPhoto)
             catalogimage.appendChild(basketCart)
             basketCart .appendChild(basketBtn)
             basketBtn.appendChild(btnImage)
             btnImage.appendChild(cartPhoto)
             basketBtn.appendChild(basketText)
         
             const productLink = document.createElement('a')  
             productLink.setAttribute('href', 'product.html')
         
             const catalogTitle = document.createElement('div')
             catalogTitle.classList.add('catalog-descr__title')
             catalogTitle.innerHTML = el.titleName
         
             const catalogSubtitle = document.createElement('div')
             catalogSubtitle.classList.add('catalog-descr__subtitle')
             catalogSubtitle.innerHTML = el.SubName
         
             const catalogPrice = document.createElement('div')
             catalogPrice.classList.add('catalog-descr__price')
             catalogPrice.innerHTML = (el.price)
             
             const catalogSpan = document.createElement('span')
             catalogSpan.innerHTML = (".00$")
         
             productLink.appendChild(catalogTitle)
             catalogPrice.appendChild(catalogSpan)
             catalogBlock.appendChild(productLink)
             catalogBlock.appendChild(catalogSubtitle)
             catalogBlock.appendChild(catalogPrice)
         
             placetoRender.appendChild(catalogBlock)
         
         }
     }
     )


let carts = document.querySelectorAll('.basket__btn');


for(let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    });
}


function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.nav__right span').textContent = productNumbers;
    }
}


function cartNumbers(product, action) {
   
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
   
    if( action== "decrease" ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.nav__right span').textContent = productNumbers - 1;
        
    }else if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.nav__right span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.nav__right span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.id;

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.id]: product
        };
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cartCost = localStorage.getItem("totalCost");

    if( action == "decrease") {
        cartCost = parseInt(cartCost    );

        localStorage.setItem("totalCost", cartCost - product.price);
    } else if(cartCost != null) {
        
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart () {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);

    let productContainer = document.querySelector(".cart__products");
    let productTotal = document.querySelector(".cart__form");
    
  
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item, index) => {
            productContainer.innerHTML += `
            <div class="cart__product" data-id-cart=${item.id}>
           
					<div class="cart__product-img">
						<img class="cart__img" src=${item.imgCatalog}>
					</div>
					<div class="cart__product-text">
						<div class="cart__product-title">
                           <span> ${item.titleName}</span>
                        
                        </div>
						<div class="cart__product-price">
							Price: $${item.price},00<br>
							Total price: $${item.inCart * item.price},00
						</div>
						<div class="cart__product-quantity">
							Quantity: 
                            <span>${item.inCart}</span>
						</div>
					</div>
                    <div class="cart__cross-img">
                    <img class="cross__img" src="img/product/cross.png">
                    </div>
				

				</div>`;
        });

        productTotal.innerHTML += `
          
                    
                <div class="cart__total">
                    <div class="cart__total-title">
                        SUB TOTAL<span class="cart__price">$${cartCost},00<span>
                    </div>

                    <div class="cart__total-img">
                        <img class="cart__total-line" src="img/product/line2.png">
                    </div>

                    <div class="cart__total-button">
                    <a href="#">
                        <button class="cart__total-send">PROCEED TO CHECKOUT</button>
                    </a>
                    </div>
                </div>
              `  
  
    }
   
}
 
onLoadCartNumbers();
displayCart();


}

