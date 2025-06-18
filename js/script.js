// Define Products 
let productsDom = document.querySelector(".products");
let products = productsDB;
console.log(products);
let drawProductsUI;
(drawProductsUI = function (products = []) {
    let productsUI = products.map((item) => {
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
                        ${item.isMe === 'Y' ? "<button class='edit-product' onclick='editProduct(" + item.id + ")'>Edit Product</button>" : ""}
                       <!-- ${item.isMe === 'Y' && "<button>Edit Product</button>"} -->
                    </div>
                    <div class="product-item-actions">
                        <button class="add-to-cart" onclick="addedToCart(${item.id})">Add To Cart</button>
                        <i class="favourite far fa-heart" style="color:${item.liked == true ? "red" : ""}" onclick="addToFavourite(${item.id})"></i>
                    </div>
                </div>            
        `;
    });
    productsDom.innerHTML = productsUI.join(""); // delete , 
})(JSON.parse(localStorage.getItem("products")) || products); 

// add to cart
function addedToCart(id) {
    if (localStorage.getItem('username')) {                         // 4-data in the data file 
        let products = JSON.parse(localStorage.getItem('products')) || products;
        let product = products.find((item) => item.id === id); // item we add 
        let isProductInCart = addedItem.some((i) => i.id === product.id);
        // console.log("items", isProductInCart);

        if (isProductInCart) {
            addedItem = addedItem.map((p => {
                if (p.id === product.id) p.qty += 1;
                return p;
            }))
        } else {
            addedItem.push(product);
            
        }
        // UI 
        cartProductDivDom.innerHTML = "";
        addedItem.forEach(item => {
            cartProductDivDom.innerHTML += `<p>${item.title} <span class="item-qty">x${item.qty}</span></p>`;
        });
        // Save data 
        localStorage.setItem('productsInCart', JSON.stringify(addedItem));
        // Add Counter Of Items 
        let cartProductItems = document.querySelectorAll(".carts-products div p");
        badgeDom.style.display = "block";
        badgeDom.innerHTML = cartProductItems.length;

    } else {
        window.location = "login.html";
    }
}

function getUniqeArr(arr, filterType) {
    let unique = arr
        .map((item) => item[filterType])
        .map((item, i, finalarr) => finalarr.indexOf(item) === i && i)
        .filter((item) => arr[item])
        .map((item) => arr[item]);
    // console.log(unique);
    return unique;
}

function saveItemData(id) {
    localStorage.setItem('productId', id);
    window.location = 'cartDetails.html';
}
// search 
let input = document.getElementById('search');
input.addEventListener('keyup', function (e) {
    search(e.target.value, JSON.parse(localStorage.getItem('products')));
    if (e.target.value.trim() === "") {
        drawProductsUI(JSON.parse(localStorage.getItem('products')));
    }
})
function search(title, myArray) {
    let arr = myArray.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
    drawProductsUI(arr)
    console.log(arr);

}

// add to Favourite
let favouritesItems = localStorage.getItem('productsFavourite')
    ? JSON.parse(localStorage.getItem('productsFavourite'))
    : [];
// let favouritesItems = [];
function addToFavourite(id) {
    if (localStorage.getItem('username')) {
        let choosenitem = products.find((item) => item.id === id); // item we add 
        choosenitem.liked = true;
        favouritesItems = [...favouritesItems, choosenitem];
        let uniqueProducts = getUniqeArr(favouritesItems, "id");
        localStorage.setItem('productsFavourite', JSON.stringify(uniqueProducts));
        products.map((item) => {
            if (item.id === choosenitem.id) {
                item.liked = true;
            }

        })

        localStorage.setItem('products', JSON.stringify(products));

        drawProductsUI(products);
    } else {
        window.location = "login.html";
    }
}

// Filter Products By Size (you can do that by name or any thing you need)
let sizeFilter = document.getElementById('size-filter');

sizeFilter.addEventListener('change', getProductsFilteredBySize);
function getProductsFilteredBySize(e) {
    // save the value 
    let val = e.target.value;
    let products = JSON.parse(localStorage.getItem('products')) || products;
    if (val == 'all') {
        drawProductsUI(products);
    } else {
        products = products.filter(i => i.size === val);
        drawProductsUI(products);
    }

}
// Edit Product 
function editProduct(id) {
    // console.log("id", id);
    localStorage.setItem("editProduct", id);
    window.location = "editProduct.html";
}