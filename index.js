const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');
const sequelize = require('./database');
const bodyParser = require('body-parser')
const pug = require('pug')
const PORT = 3001

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'))

app.get('/', async (req, res) => {
    try {
        const raamat = await sequelize.query('SELECT * FROM raamat', { type: sequelize.QueryTypes.SELECT });
        res.render('_main', {raamat})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to select * from hotell' });
    }
})

app.get('/book/:id', async (req, res) => {
    const andmed = await sequelize.query('SELECT * FROM raamat where raamatu_id = :id', { replacements: {id: req.params.id},type: sequelize.QueryTypes.SELECT });
    console.log(andmed)
    const sendable = andmed[0]
    res.render('_info', {sendable});
})

app.get('/filter', (req, res) => {
    res.render('_booksearch')
})

app.get('/book/:bookname/read', (req, res) => {
    res.render('_book_read')
app.get('/book/:id/read', async (req, res) => {
    const andmed = await sequelize.query('SELECT * FROM raamat where raamatu_id = :id', { replacements: {id: req.params.id},type: sequelize.QueryTypes.SELECT });
    //lisada check kas inimesel on see raamat ostetud
    const sendable = andmed[0]
    res.render('_book_read', {sendable})
})

app.get('/bookshelf', (req, res) => {
    res.render('_bookshelf')
})

app.get('/administrator', (req, res) => {
    res.render('_admin_panel')
})

const server = app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`);
});