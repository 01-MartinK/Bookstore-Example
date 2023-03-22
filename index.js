const express = require('express')
const app = express()
const path = require('path');
const sequelize = require('./database');
const bodyParser = require('body-parser')
const pug = require('pug')
const PORT = 3001

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    try {
        const raamatList = await sequelize.query('SELECT * FROM raamat LIMIT 6', { type: sequelize.QueryTypes.SELECT });
        const extraRaamatud = await sequelize.query('SELECT * FROM raamat LIMIT 10', { type: sequelize.QueryTypes.SELECT });
        res.render('_main', { raamatList, extraRaamatud });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to select * from hotell' });
    }
});


app.get('/profile/:id', async (req, res) => {
    res.render('_account');
})

app.get('/book/:raamatu_id', async (req, res) => {
    console.log(req.params);
    try {
        const andmed = await sequelize.query('SELECT * FROM raamat WHERE raamatu_id = :id', { replacements: {id: req.params.raamatu_id}, type: sequelize.QueryTypes.SELECT });
        const sendable = andmed[0]
        console.log('Retrieved book data:', sendable)
        res.render('_info', {sendable});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to retrieve book data' });
    }
})

app.get('/filter', (req, res) => {
    let tag = req.query.tag
    let price = req.query.price
    let stock = req.query.stock
    let name = req.query.name
    res.render('_filter')
})

app.get('/events', (req, res) => {
    res.render('_events')
})

app.get('/ebooks', async (req, res) => {
    try {
        const raamatList = await sequelize.query('SELECT * FROM raamat LIMIT 3', { type: sequelize.QueryTypes.SELECT });
        res.render('_ebooks', { raamatList })
    }catch(err) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to select * from hotell' });
    }
})

app.get('/book/:id/read', async (req, res) => {
    const andmed = await sequelize.query('SELECT * FROM raamat where raamatu_id = :id', { replacements: {id: req.params.id},type: sequelize.QueryTypes.SELECT });
    //lisada check kas inimesel on see raamat ostetud
    const sendable = andmed[0]
    res.render('_book_read', {sendable})
})

app.get('/bookshelf', async (req, res) => {
    try {
        const raamatList = await sequelize.query('SELECT * FROM raamat LIMIT 6', { type: sequelize.QueryTypes.SELECT });
        res.render('_bookshelf', { raamatList })
    }catch(err) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to select * from hotell' });
    }
})

app.get('/administrator', async (req, res) => {
    try {
        const raamatList = await sequelize.query('SELECT * FROM raamat', { type: sequelize.QueryTypes.SELECT });
        res.render('_admin_panel', { raamatList })
    }catch(err) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to select * from hotell' });
    }
    
})

app.post('/admin/books/add_book', (req, res) => {

})

app.delete('/admin/books/:id', (req, res) => {

})

const jwt = require("jsonwebtoken");

app.put('/login', async (req, res) => {

    try {
        const users = await sequelize.query('SELECT * FROM kasutaja WHERE nimi = :nimi && password = :password', { replacements: {nimi: req.body.name, password: req.body.password}, type: sequelize.QueryTypes.SELECT})
        if (users.length == 1) {
            const token = jwt.sign(
                {user: users[0].nimi},
                "Big Boob Goth",
                {
                    expiresIn: "2h",
                }
            )
    
            console.log(req.body);
            let data = {token, valid: true}
            res.status(200).send(data)    
        } else {
            res.status(200).send({err: "Error"})
        }    
        
    } catch(err) {
        res.status(500).send({err})
    }

        
})

app.patch('/login/check', (req, res) => {
    console.log(req.body);
    let user = jwt.decode(req.body.token, {secret: "Big Boob Goth"})
    if (user) {
        let data = {valid: true, logged: true}
        res.status(200).send(data)
    } else {
        let data = {valid: true, logged: false}
        res.status(200).send(data)
    }
})

app.post('/register', async (req, res) => {
    console.log(req.body);

    try {
        const users = await sequelize.query('SELECT * FROM kasutaja WHERE nimi = :nimi && password = :password && isikukood = :isikukood', { replacements: {nimi: req.body.name, password: req.body.password, isikukood: req.body.isikukood}, type: sequelize.QueryTypes.SELECT})
        if (users.length == 0) {
            const new_user = await sequelize.query('INSERT INTO kasutaja (nimi, email, telefon, aadress, password, image) VALUES (:nimi, :email, :telefon, :aadress, :password, :image)', { replacements: {nimi: req.body.name, email: req.body.email, telefon: req.body.telefon, aadress: req.body.aadress, password: req.body.password, image: req.body.image}, type: sequelize.QueryTypes.INSERT})
            console.log(new_user);
            
            const token = jwt.sign(
                {user: "kevin"},
                "Big Boob Goth",
                {
                    expiresIn: "2h",
                }
            )

            let data = {token, valid: true}
            res.status(200).send(data)
        }else {
            let data = {err: "Account already exists"}
            res.status(200).send(ˇdata)
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while trying to retrieve book data' });
    }
})

const server = app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`);
})