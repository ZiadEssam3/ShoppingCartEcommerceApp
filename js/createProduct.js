// Variables 
let productName = document.getElementById('product-name');
let productDesc = document.getElementById('product-desc');
let productSizeSelect = document.getElementById('product-size');
let CreateForm = document.getElementById('create-form');
let inputFile = document.getElementById('upload-image-file');
let productSizeValue;
let productImage;

// Events 
productSizeSelect.addEventListener("change", getProductSizeValue);
CreateForm.addEventListener("submit", createProductFunc);
inputFile.addEventListener("change", uploadImage);
// Functions 
function getProductSizeValue(e) {
    productSizeValue = e.target.value;
}
function createProductFunc(e) {
    e.preventDefault();
    let allProducts = JSON.parse(localStorage.getItem("products")) || productsDB;
    let nameValue = productName.value;
    let descValue = productDesc.value;
    // validation 
    if (nameValue && descValue) {
        let obj = {
            id: allProducts ? allProducts.length + 1 : 1,
            qty: 1,
            imageURL: productImage,
            size: productSizeValue,
            title: nameValue,
            desc: descValue,
            isMe: "Y"
        };
        let newProducts = allProducts ? [...allProducts, obj] : [obj];
        console.log(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));


        productName.value = "";
        productDesc.value = "";
        productSizeSelect.value = "";

        setTimeout(() => {
            window.location = "index.html";
        }, 500)
    } else {
        alert("Enter Data... ");
    }

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