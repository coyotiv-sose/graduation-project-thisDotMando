var express = require('express')
const User = require('../models/user')
const Video = require('../models/video')
const VideoList = require('../models/videoList')
var router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await User.find())
})

router.get('/:id', async function (req, res, next) {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).send('The user with the given ID was not found.')
  res.send(user)
})

/* Create a new User */

router.post('/', async function (req, res, next) {
  const { name, email, password } = req.body

  const user = await User.register({ name, email }, password)

  res.send(user)
})

//add video to videolist
router.post('/:id/videoLists/:videoListsId/videos', async function (req, res, next) {
  const user = await User.findById(req.params.id)
  const video = await Video.findById(req.body.video)
  const videoList = await VideoList.findById(req.params.videoListsId)
  const updatedVideoList = await user.addVideoToVideoList(video, videoList)
  res.send(updatedVideoList)
})

router.get('/:id/channels', async function (req, res, next) {
  const user = await User.findById(req.params.id)
  const channels = user.channels
  res.send(channels)
})


module.exports = router
