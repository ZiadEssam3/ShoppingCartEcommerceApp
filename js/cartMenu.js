let cartProductDivDom = document.querySelector(".carts-products div");
let badgeDom = document.querySelector(".badge");
let shoppingCartIcon = document.querySelector('.shoppingCart')
let cartProductMenu = document.querySelector(".carts-products");

shoppingCartIcon.addEventListener('click', openCartMenu);

let addedItem = localStorage.getItem('productsInCart')
    ? JSON.parse(localStorage.getItem('productsInCart'))
    : [];

if (addedItem) {
    addedItem.map((item) => {
        cartProductDivDom.innerHTML += `<p>${item.title} X${item.qty}</p>`;
    });
    badgeDom.style.display = "block";
    console.log(addedItem.length);
    badgeDom.innerHTML += addedItem.length;
    if (addedItem.length == 0) {
        badgeDom.innerHTML = 0;
    }
}

// open card menu 
function openCartMenu() {
    if (cartProductDivDom != "") {
        if (cartProductMenu.style.display == "block") {
            cartProductMenu.style.display = "none";
        } else {
            cartProductMenu.style.display = "block";
        }
    }
}