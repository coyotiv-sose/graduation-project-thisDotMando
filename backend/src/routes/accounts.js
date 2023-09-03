const express = require('express')
const User = require('../models/user')
const app = require('../app')
const passport = require('passport')

const router = express.Router()

router.get('/session', async function (req, res, next) {
  res.send(req.session)
})

router.post('/session', passport.authenticate('local', { failWithError: true }), function (req, res) {
  res.send(req.user)
})
module.exports = router
