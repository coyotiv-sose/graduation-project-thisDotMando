var express = require('express')

const Video = require('../models/video')
const User = require('../models/user')

var router = express.Router()

/* GET videos listing. */
router.get('/', async function (req, res, next) {
  res.send(await Video.find())
})

/* Create a new Video */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const video = await user.createVideo(req.body.title, req.body.description)
  res.send(video)
})
/*User like a video*/
router.post('/:id/likes', async function (req, res, next) {
  const video = await Video.findById(req.params.id)
  const user = await User.findById(req.body.user)
  if (user.name === video.creator) {
    res.send('You can not like your own video')
  } else {
    user.likeVideo(video)
    res.send(video)
  }
})
/*User delete his like on mitchs video*/
router.delete('/:id/likes', async function (req, res, next) {
  const video = await Video.findById(req.params.id)
  const user = await User.findById(req.body.user)
  if (!video || !user) {
    return res.status(404).send('Video or user not found')
  } else {
    user.dislikeVideo(video)
    res.send(video)
  }
})

module.exports = router
