var express = require('express')
const User = require('../models/user')
const Channel = require('../models/channel')
var router = express.Router()

/* Create a channel */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const channel = await user.createChannel(req.body.name)
  res.send(channel.id)
})

/* GET channels listing. */
router.get('/', async function (req, res, next) {
  res.send(await Channel.find())
})

/*subscribe to a channel*/
router.post('/:id/subscribedBy', async function (req, res, next) {
  const channel = await Channel.findById(req.params.id)
  const user = await User.findById(req.body.id)
  user.subscribe(channel.id)
  res.send(user)
})
module.exports = router
