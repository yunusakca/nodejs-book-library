const express = require('express')
const Sequelize = require('sequelize');
const path = require('path')
const bodyParser = require('body-parser')
const { Op, literal, fn, where, col } = require('sequelize');

// local imports

const sequelize = require('./db/database')
const PORT = process.env.PORT || 3030


// DB Variables

const Tables = require('./db/tables')
const Book = Tables.Book
const User = Tables.User

function fileSystem(dirName) {
    return path.join(__dirname, dirName)
}

// App

const app = express()


app.use(express.static(fileSystem('public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', './templates')




app.get('/add-book', (req, res) => {
    res.render('add-book')
})

app.post('/add-book', (req, res) => {
    var bookName = req.body.bName
    var bookPrice = req.body.bPrice
    var bookDescription = req.body.bDescription
    var bookImg = req.body.bImg
    var bookAuthor = req.body.bAuthor
    Book.create({ 
        bookName: bookName, 
        bookPrice: bookPrice, 
        bookDescription: bookDescription,
        bookImg: bookImg,
        bookAuthor: bookAuthor
     })
     .then(result => {
        res.redirect('/')
     })
     .catch(err => {
        console.log(err)
     });
})

app.get('/details/:pk', (req, res) => {
    Book.findByPk(req.params.pk)
    .then(results => {
        res.render('details', {
            data: results
        })
    })
    .catch()
})

app.get('/book/delete/:pk', (req, res) => {
    Book.destroy({
        where: {
            id: req.params.pk
          }
    }).then(() => {
        res.redirect("/")
    }).catch(err => {
        console.log(err)
    });
})

app.get('/book/edit/:pk', (req, res) => {
        Book.findByPk(req.params.pk)
        .then(results => {
            res.render('edit-book', {
                data: results
            })
        })
        .catch()

    }
)

app.post('/book/edit/:pk', (req, res) => {
    var bookName = req.body.bName
    var bookPrice = req.body.bPrice
    var bookDescription = req.body.bDescription
    var bookID = req.body.bookID
    var bookAuthor = req.body.bAuthor
    Book.update({
        bookName: bookName, 
        bookPrice: bookPrice, 
        bookDescription: bookDescription,
        bookAuthor: bookAuthor,
    }, {
        where: {
            id: bookID
        }
    })
    .then(() => {
        res.redirect("/")
    })
}
)

app.post('/search/:name', (req, res) => {
    Book.findAll({
        where: {
            [Op.or]: [{bookName: {[Op.substring]: `${req.params.name}`}}, {bookAuthor: {[Op.substring]: `${req.params.name}`}}]
        }
    })
    .then(data => { 
            res.render('search', {
                data: data
        })

       
    })
    
})


app.get('/', (req, res) => {
    Book.findAll().then(data => {
        res.render('index', { data: data })
    }).catch()
})


sequelize.sync()

app.listen(PORT)