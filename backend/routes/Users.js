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
router.get('/getdetailbyemail/:email', userdetails.getUserDetailsByEmail);
router.post('/updateavatar',userdetails.updateAvatar)
router.post('/getavatar',userdetails.getavatarbyemail)
router.delete('/deleteaccount/:email',userdetails.deleteAccount)

router.put('/follow/:userId/:followedUserId',userdetails.followUser)
router.put('/removefollow/:userId/:followedUserId',userdetails.removeFollowedUser)
router.get('/getfollowed/:userId',userdetails.getFollowedUsers)

module.exports = router;