var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users', {
    user: { name: 'John Doe' },
    users: [{ name: 'John Doe' }, { name: 'Jane Doe' }, { name: 'Jim Doe' }, { name: 'Joe Doe' }, { name: 'Jill Doe' }],
  })
})

module.exports = router
