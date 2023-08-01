var express = require('express')
const { register } = require('tsconfig-paths')
const User = require('../user')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list)
})
/* Create a new User */

router.post('/', function (req, res, next) {
  const user = User.create(req.body)
  res.send(user)
})

module.exports = router
