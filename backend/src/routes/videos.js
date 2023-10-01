var express = require('express')
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid') // Um eindeutige Dateinamen zu generieren
const mongoose = require('mongoose') // MongoDB
const fs = require('fs')

const Video = require('../models/video')
const User = require('../models/user')

var router = express.Router()

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const user = await User.findById(req.user.id)
      if (!user) {
        throw new Error('User not found')
      }

      // Hier wird das Verzeichnis für jedes Video unter dem Benutzernamen erstellt
      const destination = path.join(__dirname, `../public/videos/${user.id}`)

      // Stelle sicher, dass das Verzeichnis für den Benutzer existiert, oder erstelle es
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true })
      }

      cb(null, destination)
    } catch (error) {
      cb(error)
    }
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4() // Generiere einen eindeutigen Dateinamen
    cb(null, uniqueFilename)
  },
})

const upload = multer({ storage: storage })

router.post('/', upload.single('file'), async function (req, res, next) {
  try {
    const { title, description } = req.body
    const user = req.user

    if (!req.file) {
      return res.status(400).send('No files were uploaded.')
    }
    const video = await Video.create({
      title,
      description,
      creator: user.id,
      url: `/videos/${user.id}/${req.file.filename}`,
    })

    user.videos.push(video)
    await user.save()

    res.send(video)
  } catch (error) {
    console.error('Fehler beim Hochladen und Speichern des Videos:', error)
    res.status(500).send('Internal Server Error')
  }
})

// GET-Route zum Abrufen aller Videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find()
    res.send(videos)
  } catch (error) {
    console.error('Fehler beim Abrufen der Videos:', error)
    res.status(500).send('Internal Server Error')
  }
})

// GET-Route zum Abrufen eines einzelnen Videos anhand seiner ID
router.get('/:videoId/stream', async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId)

    if (!video) {
      return res.status(404).json({ message: 'Video nicht gefunden' })
    }

    const videoPath = path.join(__dirname, `../public${video.url}`)
    res.sendFile(videoPath)
  } catch (error) {
    console.error('Fehler beim Abrufen des Videos:', error)
    res.status(500).send('Internal Server Error')
  }
})

/*User like a video*/

router.post('/:id/likes', async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)

    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).send('User not found')
    }
    if (user.id === video.creator) {
      return res.status(400).send('You can not like your own video')
    }
    if (video.likedBy.some(person => person.id === user.id)) {
      return res.status(400).send('You already liked this video')
    }

    await user.likeVideo(video)
    if (typeof video.likes !== 'number') {
      video.likes = 0
    }
    video.likes++
    await video.save()
    res.send(video)
  } catch (error) {
    console.error('Fehler beim Liken des Videos:', error)
    next(error)
  }
})

/* peter dislike mitchs video */
router.patch('/:id/likes', async function (req, res, next) {
  const video = await Video.findById(req.params.id)
  const user = await User.findById(req.user.id)
  if (user.id === video.creator) {
    return res.status(400).send('You can not dislike your own video')
  }

  if (video.likedBy.some(person => person.id === user.id)) {
    await user.dislikeVideo(video)
    video.likes--
    await video.save()
    res.send(video)
  } else {
    res.send('You have not liked this video yet')
  }
})

module.exports = router
