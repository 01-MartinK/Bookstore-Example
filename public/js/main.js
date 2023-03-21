const checklogin = async (cookie) => {
    if (cookie) {
        axios.patch('/login/check', {
            token: cookie
        })
        .then((response) => {
            console.log(response.data)
        })
    }
}

const login = async (isikukood, password) => {
    axios.put('/login', {
        isikukood: isikukood,
        password: password
    })
    .then((res) => {
        console.log(res.data)
        if(res.data.valid)    
            setCookie(res.data.token)
    })
}


login(55533535, "taetaetat")

//checklogin(getCookie("token"))