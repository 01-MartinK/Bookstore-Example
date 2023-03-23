const login = async (name, password) => {
    axios.put('/login', {
        name: name,
        password: password
    })
    .then((res) => {
        console.log(res.data)
        if (!res.data.err) {
            if(res.data.valid) {
                setCookie(res.data.token)
                window.location.reload();
            }
        } else {
            alert('wrong credentials')
        }
    })
}

const registration = async ( name, isikukood, password, email, aadress, telefon) => {
    axios.post('/register', {
        name: name,
        isikukood: isikukood,
        password: password,
        email:email,
        aadress:aadress,
        telefon:telefon,
        image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    })
    .then((res) => {
        console.log(res.data)
        if(!res.data.err) {
            if(res.data.valid) {
                setCookie(res.data.token)
                window.location.reload();
            }
        } else {
            alert(res.data.err)
        }
    })
}