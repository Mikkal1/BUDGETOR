let users = JSON.parse(localStorage.getItem("budgetor-userList"));
if (!users) {
    users = []
}
else {
    for (let u of users) {
        console.log(u)
    }
}

const regForm = document.querySelector('#registerForm');
const regUsername = document.querySelector('#reg-username');
const regPassword = document.querySelector('#reg-password');
const regEmail = document.querySelector('#reg-email');

const loginForm = document.querySelector('#loginForm');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

function isRegFormValid() {
    return regUsername.value && regPassword.value && regEmail.value;
}

function registerUser() {
    const newUser = {
        username: regUsername.value,
        password: regPassword.value,
        email: regEmail.value
    };
    if (Array.isArray(users))
        users.push(newUser);
    else 
        console.log("not an array");
    localStorage.setItem("budgetor-userList", JSON.stringify(users));
    alert("New user registered successfully.");
}

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('register form submitted');
    if (isRegFormValid()) {
        registerUser();
        regUsername.value = '';
        regPassword.value = '';
        regEmail.value = '';
    }
    else {      
        alert('Please complete all fields.');
    }
});


function isLoginFormValid() {
    return username.value && password.value;
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isLoginFormValid()) {
        
        for (let user of users) {
            if (user.username === username.value && user.password === password.value) {
                alert("Login successfull.");
                return;
            }
        }
        alert("Login failed. Try again.");
        username.value = '';
        password.value = '';
    }
    else {
        alert('Please complete all fields.');
    }
});

let buttonNav = document.getElementById("registerButton");
buttonNav.addEventListener("click", function(){
    window.location.href= "budgetor_finances.html"
});