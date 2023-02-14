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
        console.log(raamat)
        res.render('_main')

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to select * from hotell' });
    }
})

const server = app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`);
})