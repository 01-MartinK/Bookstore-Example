let signInBtn = document.querySelector('#signInBtn');
signInBtn.addEventListener('click', showLoginBox);
let registerShowBtn = document.querySelector('#signUpButtonLink');
registerShowBtn.addEventListener('click', showRegisterBox)
document.querySelector('#signInButtonLink').addEventListener('click', showLoginBox)

document.querySelector('.loginBox').children[1].addEventListener('submit', submitLogin)

document.querySelector('.registerBox').children[1].addEventListener('submit', submitRegister)

function showLoginBox() {
    let registerBox = document.querySelector('.registerBox')
    registerBox.style.display = 'none';
    let loginBox = document.querySelector('.loginBox')
    loginBox.style.display = 'flex';
    setTimeout(() => { hideOnClickOutside(loginBox) }, 500)
}

function showRegisterBox() {
    let loginBox = document.querySelector('.loginBox')
    loginBox.style.display = 'none'
    let registerBox = document.querySelector('.registerBox')
    registerBox.style.display = 'flex';
    setTimeout(() => { hideOnClickOutside(registerBox) }, 500)
}

function hideOnClickOutside(element) {
    const outsideClickListener = event => {
        if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
          element.style.display = 'none';
          removeClickListener();
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
    }

    document.addEventListener('click', outsideClickListener);
}

// submit login
function submitLogin(e) {
    e.preventDefault()
    let name = e.target.children[0].lastChild.value
    let password = e.target.children[3].lastChild.value
    
    login(name, password)
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

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );