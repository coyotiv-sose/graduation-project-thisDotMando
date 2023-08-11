var express = require('express')
const User = require('../models/user')
const Channel = require('../models/channel')
var router = express.Router()

/* Create a channel*/
router.post('/', function (req, res, next) {
  const user = User.list.find(user => user.name === req.body.user)
  const channel = user.createChannel(req.body.name)
  res.send(channel)
})

/* GET channels listing. */
router.get('/', function (req, res, next) {
  res.send(Channel.list)
})

/*subscribe to a channel*/
router.post('/:name/subscribedBy', function (req, res, next) {
  const channel = Channel.list.find(channel => channel.name === req.params.name)
  const user = User.list.find(user => user.name === req.body.user)
  user.subscribe(channel)
  res.send(user)
})
module.exports = router
