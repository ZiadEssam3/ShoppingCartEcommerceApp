let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noproduct");
function drawFavouritesProductsUI(allproducts = []) {
    if (JSON.parse(localStorage.getItem('productsFavourite')).length === 0)
        console.log(noProductsDom);
    noProductsDom.innerHTML = "There Is No Items!";

    let products = JSON.parse(localStorage.getItem('productsFavourite')) || allproducts;
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
                        <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">Remove From Favourite</button>
                        <i class="favourite far fa-heart"></i>
                    </div>
                </div>            
        `;
    });
    productsDom.innerHTML = productsUI.join("");
}
drawFavouritesProductsUI();

// 1 
function removeItemFromCart(id) {
    console.log(id);
    let productsFavourite = localStorage.getItem('productsFavourite');
    if (productsFavourite) {
        // convert string to object 
        let items = JSON.parse(productsFavourite);
        let filteredItems = items.filter((item) => item.id !== id);  
        localStorage.setItem('productsFavourite', JSON.stringify(filteredItems));
        console.log(filteredItems);
        drawFavouritesProductsUI(filteredItems);
    }
}
