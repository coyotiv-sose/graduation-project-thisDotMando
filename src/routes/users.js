var express = require('express')
const { register } = require('tsconfig-paths')
const User = require('../user')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send([{ name: 'John Doe' }, { name: 'Jane Doe' }, { name: 'Jim Doe' }])
})

/* Create a new User */

router.post('/', function (req, res, next) {
  const user = new User(req.body.name, req.body.email, req.body.age)
  res.send(user)
})

module.exports = router
