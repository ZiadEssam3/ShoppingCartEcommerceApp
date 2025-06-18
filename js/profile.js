// Get Data From Local Storage 
let get_user = localStorage.getItem('username');
let get_email = localStorage.getItem('email');
let products = JSON.parse(localStorage.getItem('products')) || productsDB;
let myProducts = products.filter(i => i.isMe === "Y");
// Variables 
let userDom_ = document.getElementById('username');
let userEmailDom_ = document.getElementById('username');
let productsLength = document.querySelector("#productsLength span");
userDom_.innerHTML = get_user;
userEmailDom_.innerHTML = get_email;
if (myProducts.length == 0) {
    productsLength.innerHTML = "There Is No Products";
} else {
    productsLength.innerHTML = myProducts.length;
}
