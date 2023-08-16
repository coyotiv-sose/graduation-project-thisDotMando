var express = require('express')

const VideoList = require('../models/videoList')
const User = require('../models/user')

var router = express.Router()

/* create a  new video-list */

router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const videoList = await user.createVideoList(req.body.name)
  res.send(videoList)
})

router.get('/', async function (req, res, next) {
  res.send(await VideoList.find())
})

module.exports = router
