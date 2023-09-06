var express = require('express')
const User = require('../models/user')
const Video = require('../models/video')
const VideoList = require('../models/videoList')
const { celebrate, Joi, errors, Segments } = require('celebrate')
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

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string(),
    }),
  }),
  async function (req, res, next) {
    const { name, email, password } = req.body

    const user = await User.register({ name, email }, password)

    res.send(user)
  }
)

//add video to videolist
router.post('/:id/videoLists/:videoListsId/videos', async function (req, res, next) {
  const user = await User.findById(req.params.id)
  const video = await Video.findById(req.body.video)
  const videoList = await VideoList.findById(req.params.videoListsId)
  const updatedVideoList = await user.addVideoToVideoList(video, videoList)
  res.send(updatedVideoList)
})

module.exports = router
