let userInfo = document.querySelector('#user_info');
let userDom = document.querySelector('#user');
let links = document.querySelector('#links');
let logout_btn = document.querySelector('#logout');

let username = localStorage.getItem("username")
if (username) {
    links.remove();
    userInfo.style.display = "flex";
    userDom.innerHTML = username;
}


logout_btn.addEventListener('click', function () {
    localStorage.clear();
    setTimeout(() => {
        window.location = "register.html";
    }, 1500);
})