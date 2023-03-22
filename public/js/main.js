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

const login = async (name, password) => {
    axios.put('/login', {
        name: name,
        password: password
    })
    .then((res) => {
        console.log(res.data)
        if (!res.data.err) {
            if(res.data.valid)    
                setCookie(res.data.token)
        } else {
            alert('wrong credentials')
        }
    })
}