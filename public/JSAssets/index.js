let users = JSON.parse(localStorage.getItem("budgetor-userList"));
if (!users) {
    users = []
}
else {
    for (let u of users) {
        console.log(u)
    }
}

// declare constants that link to the forms and controls
const regForm = document.querySelector('#registerForm');
const regUsername = document.querySelector('#reg-username');
const regPassword = document.querySelector('#reg-password');
const regEmail = document.querySelector('#reg-email');

const loginForm = document.querySelector('#loginForm');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

// ==================== REGISTRATION ====================

// check if the registration form is valid
function isRegFormValid() {
    return regUsername.value && regPassword.value && regEmail.value;
}

// register a new user
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
    // // send a POST request to the server
    // fetch('/api/users', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         username: regUsername.value,
    //         password: regPassword.value,
    //         email: regEmail.value
    //     })
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //     alert('Registration successful!');
    // })
    // .catch((err) => {
    //     alert('Registration failed.');
    // });
}

// add event listeners to the forms
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


// ==================== LOGIN ====================

// check if the login form is valid
function isLoginFormValid() {
    return username.value && password.value;
}

// add event listeners to the forms
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isLoginFormValid()) {
        
        for (let user of users) {
            if (user.username === username.value && user.password === password.value) {
                // passwords match
                alert("Login successfull.");
                // navigate to the dashboard
                //...
                return;
            }
        }
        alert("Login failed. Try again.");

        // send a POST request to the server
        // fetch('/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: username.value,
        //         password: password.value
        //     })
        // })
        // .then((res) => {
        //     // check if the response is ok
        //     if (!res.ok) {
        //         throw new Error(res.status);
        //     }
        //     res.json()
        // })
        // .then((data) => {
        //     console.log(data);
        //     alert('Login successful!');
        //     // navigate to the dashboard
        //     // ...
        // })
        // .catch((err) => {
        //     console.log(err);
        //     alert('Login failed. Try again.');
        // });
        username.value = '';
        password.value = '';
    }
    else {
        alert('Please complete all fields.');
    }
});