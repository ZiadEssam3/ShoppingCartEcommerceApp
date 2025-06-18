let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noproduct");

function drawCartProductsUI(allproducts = []) {
    if (JSON.parse(localStorage.getItem('productsInCart')).length === 0)
        console.log(noProductsDom);
    noProductsDom.innerHTML = "There Is No Items!";

    let products = JSON.parse(localStorage.getItem('productsInCart')) || allproducts;
    let productsUI = products.map((item) => {
        return `
                <div class="product-item">
                    <img src=${item.imageURL} 
                        class="product-item-img" 
                        alt="image" 
                    />
                    <div class="product-item-desc">
                        <h2>${item.title}</h2>
                        <p>${item.desc}</p>
                        <span>Size: ${item.size}</span> <br/>
                        <span>Quantatiy  X${item.qty}</span>
                    </div>
                    <div class="product-item-actions">
                        <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">Remove From Cart</button>
                        <i class="favourite far fa-heart"></i>
                    </div>
                </div>            
        `;
    });
    productsDom.innerHTML = productsUI.join("");
}
drawCartProductsUI();

function removeItemFromCart(id) {
    console.log(id);
    let productsInCart = localStorage.getItem('productsInCart');
    if (productsInCart) {
        let items = JSON.parse(productsInCart);
        let filteredItems = items.filter((item) => item.id !== id); 
        localStorage.setItem('productsInCart', JSON.stringify(filteredItems));
        console.log(filteredItems);
        drawCartProductsUI(filteredItems);
    }
}
