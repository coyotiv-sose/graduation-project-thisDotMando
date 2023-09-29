var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var helmet = require('helmet')
var morgan = require('morgan')

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

app.use(morgan('combined'))

// Konfigurieren Sie CORS, um die Herkunfts-URL aus dem Anfrage-Header zu verwenden
/* const allowedOrigins = [
  'https://frontend1mitch-emdybvxr6q-ew.a.run.app', // Cloud Run-URL
  'http://localhost:3000', // Lokale Entwicklung
]

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions)) */

/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend3-emdybvxr6q-ew.a.run.app')
  next()
}) */

/* // CORS
const allowedOrigins = [
  'https://frontend3-emdybvxr6q-ew.a.run.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://backend1-emdybvxr6q-ew.a.run.app/',
]

const corsOptions = {
  origin: function (origin, callback) {
    // Überprüfe, ob der Ursprung der Anfrage in der Liste der erlaubten Ursprünge ist
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Wenn ja, erlaube diesen Ursprung
      callback(null, true)
    } else {
      // Wenn nicht, lehne die Anfrage ab
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

const corsOptions = {
  origin: 'https://frontend-emdybvxr6q-ew.a.run.app', // Hier sollte die URL deines Frontends stehen
  credentials: true, // Erlaube Cookies und Authentifizierung
};

app.use(cors(corsOptions));

app.use(cors(corsOptions))
 */
/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend3-emdybvxr6q-ew.a.run.app')
  next()
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  next()
}) */

app.use(
  cors({
    // enables requests from any domain, not safe, further add only the domain you want
    origin: true,
    // allows cookies
    credentials: true,
  })
)

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
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    },
    store: MongoStore.create({
      clientPromise: connectionPromise,
      stringify: false,
    }),
  })
)

app.use(passport.initialize())
app.use(passport.session())

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
  console.error(err.stack)
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
