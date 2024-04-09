let cartIcon = document.querySelector('#basket');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart')


document.addEventListener('DOMContentLoaded', function() {
    cartIcon.onclick = (event) => {
        cart.classList.toggle('active');
        event.stopPropagation();
    };


    let addCartButtons = document.querySelectorAll('.add-cart');
    addCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {

            event.stopPropagation();
        });
    });

    document.addEventListener('click', (event) => {
        if(cart.classList.contains('active') && !cart.contains(event.target) && !event.target.matches('.add-cart')) {
            cart.classList.remove('active');
        }
    });
});

closeCart.onclick=()=>{
    cart.classList.remove('active');
}


$(document).ready(function() {
    
    
    document.querySelectorAll('.cart-remove').forEach(button=>{
        button.addEventListener('click',removeCartItem)
    })

    document.querySelectorAll('.cart-quantity').forEach(button =>{
        button.addEventListener('change',quantityChanged)
    })

    // let quantityInputs = document.getElementsByClassName('cart-quantity');
    // for (let i = 0; i < quantityInputs.length; i++) {
    //     let input = quantityInputs[i];
    //     input.addEventListener('change', quantityChanged);
    // }
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', addCartClicked);
    });

    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyBtnClicked)


    document.addEventListener('click', function(event) {
        var cart = document.querySelector('.cart');
        
        // Check if the clicked area is not the cart and not a descendant of the cart
        if (!cart.contains(event.target) && cart.classList.contains('active')) {
            cart.classList.remove('active');
        }
    });
    
    // Prevents the event from closing the cart when clicking inside the cart
    document.querySelector('.cart').addEventListener('click', function(event) {
        event.stopPropagation();
    });

    console.log("Document is ready!");
    updateTotal()
});

function buyBtnClicked(){
    alert(`Your Order of ${updateTotal()} is placed`)
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.innerHTML = '';
    }
    updateTotal()
}


function addCartClicked(event){
    let buttonClicked = event.target;
    let shopItems = buttonClicked.parentElement;
    let title = shopItems.getElementsByClassName('product-title')[0].innerText;
    let itemsImg = shopItems.getElementsByClassName('product-image')[0].src;

    let price = shopItems.getElementsByClassName('price')[0].innerText;
    let floatPrice = parseFloat(price.replace('$',''));
    let formattedPrice = floatPrice.toFixed(2);

    console.log(title,formattedPrice,itemsImg)
    addProductToCart(title,formattedPrice,itemsImg);
    updateTotal()
}

function addProductToCart(title,formattedPrice,itemsImg){

    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsName = cartItems.getElementsByClassName('cart-product-title');

    for (let i = 0; i < cartItemsName.length; i++){
        if(cartItemsName[i].innerText == title){
        alert('You have already add this item to cart');
        return;
        }
    }
    
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    let cartBoxContent = `
        <img src="${itemsImg}" alt="" class="cart-img">
        <div class="cart-details">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${formattedPrice}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bx-trash cart-remove' ></i>`;

    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)

    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
}


function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}


function quantityChanged(event){
    let input = event.target;
    if (isNaN(input.value)||input.value<=0){
        input.value = 1
    }
    updateTotal()
}

function updateTotal(){
    let cartContent = document.getElementsByClassName('cart-content')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0
    for (let i=0; i < cartBoxes.length ; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let quantity =quantityElement.value;
        let price= parseFloat(priceElement.innerText.replace('$',''));
        total+= (price * quantity);
    }

    return document.getElementsByClassName('total-price')[0].innerText='$'+ total.toFixed(2);
    
}