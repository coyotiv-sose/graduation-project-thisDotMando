var express = require('express')
const User = require('../models/user')
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
//create a videolist
router.post('/:id/videoLists', async function (req, res, next) {
  const user = await User.findById(req.params.id)
  const videolist = await user.createVideoList(req.body.name)
  await user.createVideoList(videolist)
  res.send(videolist)
})

//add video to videolist
router.post('/:id/videoLists/', async function (req, res, next) {
  const user = await User.findById(req.params.id)
  const videolist = await user.createVideoList(req.body.name)
  await user.addVideoToVideoLists(videolist)
  res.send(videolist)
})

/* router.post('/:id/videoLists/', async function (req, res, next) {
  const user = await User.findById(req.params.id)
  const videolist = await Video.findById(req.body.id)
  await user.addVideoToVideoLists(videolist)
  res.send(videolist)
}) */
module.exports = router
