const express = require('express')
const router = express.Router()

const userdetails = require('../controller/Users.controller')

router.post('/createuser',userdetails.createuser)
router.post('/loginuesr',userdetails.loginuser)

module.exports = router;