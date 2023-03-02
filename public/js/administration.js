function openEditBook() {
    console.log("test");
    const editMenu = document.querySelector('.editMenu');
    const middleClass = document.querySelector('.middle_card')
    middleClass.classList.remove('none')
    editMenu.classList.remove('none')
}

const openNewBook = () => {
    const addMenu = document.querySelector(".addMenu");
    const middleClass = document.querySelector('.middle_card')
    middleClass.classList.remove('none')
    addMenu.classList.remove('none')
}

const hideBoth = () => {
    const editMenu = document.querySelector('.editMenu');
    const middleClass = document.querySelector('.middle_card')
    const addMenu = document.querySelector();
    middleClass.classList.remove('none')
    editMenu.classList.remove('none')
    addMenu.classList.remove('none')
}

const connectButtons = () => {
    const addButton = document.querySelector('.addBookBtn')
    addButton.addEventListener('click', openNewBook)

    const editButton = document.querySelector('.BookBtn')
    editButton.addEventListener('click', openEditBook)
}

connectButtons()