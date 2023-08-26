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
  }
  if (video.likedBy.some(person => person.id === user.id)) {
    return next({ status: 404, message: 'You already liked this video' })
  }
  await user.likeVideo(video)
  res.send(video)
})
/* peter dislike mitchs video */
router.patch('/:id/likes', async function (req, res, next) {
  const video = await Video.findById(req.params.id)
  const user = await User.findById(req.body.user)
  if (video.likedBy.some(person => person.id === user.id)) {
    await user.dislikeVideo(video)
    res.send(video)
  } else {
    res.send('You have not liked this video yet')
  }
})

module.exports = router
