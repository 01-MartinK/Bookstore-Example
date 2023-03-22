let signInBtn = document.querySelector('#signInBtn');
signInBtn.addEventListener('click', showLoginBox);

document.querySelector('.loginBox').children[1].addEventListener('submit', submitLogin)

function showLoginBox() {
    let loginBox = document.querySelector('.loginBox')
    loginBox.style.display = 'flex';
    setTimeout(() => { hideOnClickOutside(document.querySelector('.loginBox')) }, 100)
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

function submitLogin(e) {
    e.preventDefault()
    let name = e.target.children[0].lastChild.value
    let password = e.target.children[3].lastChild.value
    
    login(name, password)
}

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );