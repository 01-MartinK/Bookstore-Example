// random shit
let signInBtn = document.querySelector('#signInBtn');
signInBtn.addEventListener('click', showLoginBox);
let registerShowBtn = document.querySelector('#signUpButtonLink');
registerShowBtn.addEventListener('click', showRegisterBox)
document.querySelector('#signInButtonLink').addEventListener('click', showLoginBox)
document.querySelector('.loginBox').children[1].addEventListener('submit', submitLogin)
document.querySelector('.registerBox').children[1].addEventListener('submit', submitRegister)
document.querySelector('#logoutBtn').addEventListener('click', submitLogout)

let user_id_for_profile = 0;

document.querySelector('#profileBtn').addEventListener('click', () => {
    console.log(user_id_for_profile)
    window.location = `/profile/${user_id_for_profile}`
})

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
                user_id_for_profile = res.data.user.user
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
    let form = document.querySelector('.registerBox').children[1]
    let name = form.children[0].value;
    let email = form.children[4].value;
    let telefon = form.children[6].value;
    let isikukood = form.children[10].value;
    let password = form.children[2].value;
    let aadress = form.children[8].value;

    registration(name, isikukood, password, email, aadress, telefon)
}

// hide div when outside click
document.addEventListener('mouseup', function(e) {
    var container = document.getElementById('divToHide');
    if (!container.contains(e.target)) {
        container.style.display = 'none';
    }
});