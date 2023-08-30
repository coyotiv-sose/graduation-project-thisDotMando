var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('dotenv').config()
require('./database-connection')
console.log(process.env.MONGODB_CONNECTION_STRING)

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var videosRouter = require('./routes/videos')
var channelsRouter = require('./routes/channels')
var videoListsRouter = require('./routes/videoLists')
var cors = require('cors')

var app = express()

// uncomment this line while implementing the authentication
// app.set('trust proxy', 1)

// CORS
app.use(
  cors({
    origin: true,
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

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/videos', videosRouter)
app.use('/channels', channelsRouter)
app.use('/videoLists', videoListsRouter)
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
