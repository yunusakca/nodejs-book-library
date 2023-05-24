const express = require('express')
const Sequelize = require('sequelize');
const path = require('path')
const bodyParser = require('body-parser')
const { Op, literal, fn, where, col } = require('sequelize');
var session = require('express-session')

// local imports

const sequelize = require('./db/database')
const PORT = process.env.PORT || 3000


// DB Variables

const Tables = require('./db/tables');
const { log } = require('console');
const Book = Tables.Book
const User = Tables.User

function fileSystem(dirName) {
    return path.join(__dirname, dirName)
}

// App

const app = express()



// app.use
app.use(express.static(fileSystem('public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'bookland',
    resave: true,
    saveUninitialized: true,
}))

// app.set
app.set('view engine', 'ejs')
app.set('views', './templates')


app.get('/register', (req, res) => {

    if(req.session.user_id) {
        res.redirect("/")
    } else {
        res.render('register', {
            title: "Register",
            session : req.session
        })
    }


})

app.post('/register', (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email

    User.create({ 
        username: username, 
        password: password, 
        email: email,
     })
     .then(result => {
        req.session.destroy();
        res.redirect("/")
     })
     .catch(err => {
        req.session.registerError = err.errors[0].message
        res.redirect("/register")
     });

})


app.get('/login', (req, res) => {
    if(req.session.user_id) {
        res.redirect("/")
    } else {
        res.render('login', {
            title: "Login",
            session : req.session
        })
    }



})

app.post('/login', (req, res) => {
    var username = req.body.username
    var password = req.body.password

    User.findAll({
        where: {
            username: {
                [Op.eq]: username
            }
        }
    }).then(data => {
        if(data.length == 0) {
            console.log("Hata.")
        } else if (data[0].username == username && data[0].password == password) {
            req.session.user_id = data[0].id;
            req.session.username = data[0].username;
            res.redirect("/")
        } else {
            console.log("Hata.")
        }
    })

    
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect("/");
})


app.get('/add-book', (req, res) => {
    if(req.session.user_id) {
        res.render('add-book', {
            title: "Add Book",
            session : req.session
        })
    } else {
        res.redirect("/")
    }

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
            data: results,
            title: "Homepage",
            session : req.session
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
                data: results,
                title: "Homepage",
                session : req.session
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
                data: data,
                title: "Homepage",
                session : req.session
        })

       
    })
    
})


app.get('/', (req, res) => {

    Book.findAll().then(data => {
            res.render('index', {
                data: data,
                title: "Homepage",
                session : req.session
            })
    }).catch()
})


sequelize.sync()

app.listen(PORT)