var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var helmet = require('helmet')

require('dotenv').config()
require('./database-connection')
console.log(process.env.MONGODB_CONNECTION_STRING)

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var videosRouter = require('./routes/videos')
var channelsRouter = require('./routes/channels')
var videoListsRouter = require('./routes/videoLists')
var accountsRouter = require('./routes/accounts')

var cors = require('cors')
var session = require('express-session')
var MongoStore = require('connect-mongo')
var mongoose = require('mongoose')

var User = require('./models/user')
var passport = require('passport')
//var LocalStrategy = require('passport-local').Strategy

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

var app = express()

app.set('trust proxy', 1)
app.use(helmet())

// CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173') // Stelle sicher, dass dies auf die richtige Domäne verweist
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const connectionPromise = mongoose.connection.asPromise().then(connection => (connection = connection.getClient()))

app.use(
  session({
    secret: 'asdje2iowqj45doiqw!@7#',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: MongoStore.create({
      clientPromise: connectionPromise,
      stringify: false,
    }),
  })
)

app.use(passport.session())
app.use(passport.initialize())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/videos', videosRouter)
app.use('/channels', channelsRouter)
app.use('/videoLists', videoListsRouter)
app.use('/accounts', accountsRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})
//console.log('test')

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
