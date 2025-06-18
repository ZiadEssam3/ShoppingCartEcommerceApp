let username = document.querySelector("#username");
let password = document.querySelector("#password");
let login_btn = document.querySelector("#signin");

let getUser = localStorage.getItem('username');
let getPassword = localStorage.getItem('password');

login_btn.addEventListener("click", Login);


function Login(e) {
    e.preventDefault();

    if (username.value === "" || password.value === "") {
        alert("please fill data");
    } else {
        if (
            getUser &&
            getUser.trim() === username.value.trim() && 
            getPassword &&
            getPassword === password.value 
        ) {
            setTimeout(() => {
                window.location = "index.html";
            }, 1500)

        } else {
            console.log("username or password is wrong")
        }
    }
}
