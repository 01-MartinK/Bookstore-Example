const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser')
const pug = require('pug')
const PORT = 3001

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('template')
})

const server = app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`);
})