const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');
const sequelize = require('./database');
const PORT = 3001

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('_main')
})

app.get('/book/:bookname', (req, res) => {
    res.render('_info')
})

app.get('/bookshelf', (req, res) => {
    res.render('_bookshelf')
})

const jwt = require("jsonwebtoken");

app.put('/login', (req, res) => {

    const isikukood = 50402212726;
    const password = "qwerty";
    if(req.body.isikukood===isikukood && req.body.password===password){
        const token = jwt.sign(
            {user: "kevin"},
            "Big Boob Goth",
            {
                expiresIn: "2h",
            }
        )

        console.log(req.body);
        let data = {token, valid: true}
        res.status(200).send(data)    
    } else {
        res.status(500).send({err: "fuck u"})
    }
})

app.patch('/login/check', (req, res) => {
    console.log(req.body);
    let data = {test: "template shit"}
    res.status(200).send(data)
})

const server = app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`);
})