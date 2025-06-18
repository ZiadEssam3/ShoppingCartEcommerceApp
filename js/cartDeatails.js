let products = JSON.parse(localStorage.getItem('products'));
console.log(products);
let productId = localStorage.getItem('productId');
let productDetails = products.find((item) => item.id == productId);
console.log(productDetails);
let itemDom = document.querySelector('.item-details');

itemDom.innerHTML = `
<img src="${productDetails.imageURL}" alt="" />
<h2>${productDetails.title}</h2>
<p>${productDetails.desc}</p>
<span>Size: ${productDetails.size}</span> <br/>
<span>Quantity: X${productDetails.qty}</span> <br/>
<button onclick="editProduct(${productId})">Edit Product</button>
`

// Edit Product 
function editProduct(id) {
    localStorage.setItem("editProduct", id);
    window.location = "editProduct.html";
}
