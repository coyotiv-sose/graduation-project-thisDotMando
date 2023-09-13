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

    // Erstellen Sie ein neues Video-Dokument in der Datenbank
    const video = await Video.create({
      title,
      description,
      creator: user.id,
      url: `/videos/${user.id}/${req.file.filename}`,
      // Speichern Sie den Dateipfad
    })

    // Fügen Sie das Video zur Benutzerliste hinzu
    user.videos.push(video)
    await user.save()

    res.send(video)
  } catch (error) {
    console.error('Fehler beim Hochladen und Speichern des Videos:', error)
    res.status(500).send('Internal Server Error')
  }
})

/*
router.get('/', async function (req, res, next) {
  res.send(await Video.find())
}) */

/* router.get('/:id', async function (req, res, next) {
  const video = await Video.findById(req.params.id)
  if (!video) return res.status(404).send('The video with the given ID was not found.')
  res.send(video)
}) */

router.get('/:id', async function (req, res, next) {
  const video = await Video.findById(req.params.id)
  /* if (!video) {
    return res.status(404).send('The video with the given ID was not found.')
  } */
  const videoPath = path.join(__dirname, `../public/videos/${video.url}`)
  const videoStat = fs.statSync(videoPath)
  const fileSize = videoStat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
    const chunkSize = end - start + 1
    const file = fs.createReadStream(videoPath, { start, end })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(videoPath).pipe(res)
  }
})
/*

router.post('/', async function (req, res, next) {
  const { title, description } = req.body
  const user = req.user


  const video = await Video.create({ title, description, user: user._id })
  user.videos.push(video)
  await user.save()

  res.send(video)
}) */

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
