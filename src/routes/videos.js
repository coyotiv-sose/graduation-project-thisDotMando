var express = require('express')

const Video = require('../models/video')
const User = require('../models/user')

var router = express.Router()

/* GET videos listing. */
router.get('/', function (req, res, next) {
  res.send(Video.list)
})

/* Create a new Video */
router.post('/', async function (req, res, next) {
  const user = await User.findOne({ name: req.body.user })
  const video = await user.createVideo(req.body.title, req.body.description)
  res.send(video)
})

router.post('/:title/likes', function (req, res, next) {
  try {
    const video = Video.list.find(video => video.title === req.params.title)
    const user = User.list.find(user => user.name === req.body.user)
    if (user.name === video.creator) {
      res.send('You can not like your own video')
    } else {
      user.likeVideo(video)
      res.send(video)
    }
  } catch (err) {
    res.send(err.message)
  }
})

module.exports = router
