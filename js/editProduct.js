// Variables
let products = JSON.parse(localStorage.getItem('products')) || productsDB;
let productId = JSON.parse(localStorage.getItem('editProduct')) || products;
let getProduct = products.find(i => i.id === productId);
console.log("Before Update", getProduct);

let productName = document.getElementById('product-name');
let productDesc = document.getElementById('product-desc');
let productSizeSelect = document.getElementById('product-size');
let updateForm = document.getElementById('update-form');
let inputFile = document.getElementById('upload-image-file');
let productSizeValue;
let productImage;

productName.value = getProduct.title;
productDesc.value = getProduct.desc;
productSizeSelect.value = getProduct.size;
productImage = getProduct.imageURL;

// Events
productSizeSelect.addEventListener("change", getProductSizeValue);
updateForm.addEventListener("submit", updateProductFun);
inputFile.addEventListener("change", uploadImage);
// Functions
function getProductSizeValue(e) {
    productSizeValue = e.target.value;
}
function updateProductFun(e) {
    e.preventDefault();

    // console.log(productName.value);
    getProduct.title = productName.value;
    getProduct.desc = productDesc.value;
    getProduct.size = productSizeValue;
    getProduct.imageURL = productImage;
    console.log("After Update", getProduct);
    localStorage.setItem('products', JSON.stringify(products));
    setTimeout(() => {
        window.location = "index.html";
    }, 500);

}
function uploadImage() {
    // let preview;
    let file = this.files[0];
    console.log(file);
    // Validation on File
    // 1- type of file is jpeg or png
    let types = ["image/jpeg", "image/png"];
    if (types.indexOf(file.type) == -1) {
        alert("Type Not Supported");
        inputFile.value = "";
        return;
    }
    // 2- size of file
    if (file.size > 2 * 1024 * 1024) {
        alert("Image Not Exced 2MG");
        return;
    }

    getImageBase64(file);
}

// Convert from Blob to Base64
function getImageBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = function () {
        console.log(reader.result);
        productImage = reader.result;
    };
    reader.onerror = function () {
        alert("Error !!");
    }

}

