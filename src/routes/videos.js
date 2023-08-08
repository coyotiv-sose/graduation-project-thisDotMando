var express = require('express')
const { register } = require('tsconfig-paths')
const Video = require('../video')
const User = require('../user')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(Video.list)
})
/* Create a new User */

router.post('/', function (req, res, next) {
  const user = User.list.find(user => user.name === req.body.user)
  const video = user.createVideo(req.body.title, req.body.description)
  res.send(video)
})

module.exports = router
