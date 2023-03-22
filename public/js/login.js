// random shit
let signInBtn = document.querySelector('#signInBtn');
signInBtn.addEventListener('click', showLoginBox);
let registerShowBtn = document.querySelector('#signUpButtonLink');
registerShowBtn.addEventListener('click', showRegisterBox)
document.querySelector('#signInButtonLink').addEventListener('click', showLoginBox)
document.querySelector('.loginBox').children[1].addEventListener('submit', submitLogin)
document.querySelector('.registerBox').children[1].addEventListener('submit', submitRegister)
document.querySelector('#logoutBtn').addEventListener('click', submitLogout)

// check if logged in or not
const loginStatus = async () => {
    let signInBtn = document.querySelector('#signInBtn');
    let profileBtn = document.querySelector('#profileBtn');
    let logoutBtn = document.querySelector('#logoutBtn');

    let token = getCookie("token")

    if (token)
        axios.patch('/login/check', {
            token: token
        })
        .then((res) => {
            console.log(res.data)
            if (res.data.logged) {
                signInBtn.style.display = 'none'
                profileBtn.style.display = 'inline'
                logoutBtn.style.display = 'inline'
            }
        })
    else {
        profileBtn.style.display = 'none'
        logoutBtn.style.display = 'none'
    }
}

loginStatus()

// show login box
function showLoginBox() {
    let registerBox = document.querySelector('.registerBox')
    registerBox.style.display = 'none';
    registerBox.id = ""
    let loginBox = document.querySelector('.loginBox')
    loginBox.style.display = 'flex';
    loginBox.id = "divToHide"
    //setTimeout(() => { hideSelectorsConfigure() }, 10)
}

// show register box
function showRegisterBox() {
    let loginBox = document.querySelector('.loginBox')
    loginBox.style.display = 'none'
    loginBox.id = ""
    let registerBox = document.querySelector('.registerBox')
    registerBox.style.display = 'flex';
    registerBox.id = "divToHide"
    //setTimeout(() => { hideOnClickOutside(registerBox) }, 500)
}

// submit login
function submitLogin(e) {
    e.preventDefault()
    let name = e.target.children[0].lastChild.value
    let password = e.target.children[3].lastChild.value

    login(name, password)
}

// submit logout
function submitLogout(e) {
    removeItem("token")
    window.location.reload();
}

// submit register
function submitRegister(e) {
    e.preventDefault()
    let name;
    let email;
    let telefon;
    let isikukood;
    let password;
    let aadress;

    registration(name, isikukood, password, email, aadress, telefon)
}

// hide div when outside click
document.addEventListener('mouseup', function(e) {
    var container = document.getElementById('divToHide');
    if (!container.contains(e.target)) {
        container.style.display = 'none';
    }
});