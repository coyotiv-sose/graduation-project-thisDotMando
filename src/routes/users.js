var express = require('express')
const User = require('../models/user')
const Video = require('../models/video')
const VideoList = require('../models/videoList')
var router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await User.find())
})

/* Create a new User */

router.post('/', async function (req, res, next) {
  const user = await User.create({ name: req.body.name, email: req.body.email, age: req.body.age })
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

module.exports = router
