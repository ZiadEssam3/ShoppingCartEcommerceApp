let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noproduct");

let drawProductsUI;
(drawProductsUI = function (products = []) {
    let myproducts = products.filter(item => item.isMe === "Y");
    if (myproducts.length != 0) {
        console.log("yes");
        let productsUI = myproducts.map((item) => {
            console.log(item);
            return `
                <div class="product-item" style="border:${item.isMe === 'Y' ? '2px solid green' : ''}">
                    <img src=${item.imageURL} 
                        class="product-item-img" 
                        alt="image" 
                    />
                    <div class="product-item-desc">
                        <a onclick="saveItemData(${item.id})">${item.title}</a>
                        <p>${item.desc}</p>
                        <span>Size: ${item.size}</span>
                        <button class='edit-product' onclick='editProduct(${item.id})'>Edit Product</button>
                        <br/>
                        <button class='edit-product' onclick='deleteProduct(${item.id})'>Delete Product</button>
                    </div>

                </div>            
        `;
        });
        productsDom.innerHTML = productsUI.join("");
    } else {
        noProductsDom.innerHTML = "No Products !!";
    }
})(JSON.parse(localStorage.getItem("products")) || productsDB);


// Edit Product 
function editProduct(id) {
    localStorage.setItem("editProduct", id);
    window.location = "editProduct.html";
}

// Delete Product 
function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem('products')) || productsDB;
    let myproducts = products.filter((item) => item.isMe === "Y");
    console.log("my", myproducts)
    let filtered = myproducts.filter((i) => i.id !== id);
    console.log("filtered", filtered);
    let clickedItem = myproducts.find((i) => i.id === id);
    products = products.filter((i) => i.id !== clickedItem.id);
    console.log(products);
    localStorage.setItem('products', JSON.stringify(products));
    drawProductsUI(filtered);

}