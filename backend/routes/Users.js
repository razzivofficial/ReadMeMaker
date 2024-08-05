const express = require('express')
const router = express.Router()

const userdetails = require('../controller/Users.controller')

router.post('/createuser',userdetails.createuser)
router.post('/loginuser',userdetails.loginuser)
router.get('/getNameByEmail/:email', userdetails.getNameByEmail);
router.put('/updatePassword', userdetails.updatePassword);
router.post('/updatename/:email',userdetails.updateName)
router.post('/updateusername/:email',userdetails.updateUsername)
router.post('/updatedescription/:email',userdetails.updateDescription)

module.exports = router;