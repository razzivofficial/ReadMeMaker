const express = require('express')
const router = express.Router()

const editordetails = require('../controller/Editor.controller')

router.post('/addeditor',editordetails.addEditor)
router.get('/getalleditor',editordetails.fetcheditors)
router.get('/geteditorbyemail/:email',editordetails.fetchbyemail)


router.patch('/upvoteeditor',editordetails.upvoteEditor)
router.patch('/downvoteeditor',editordetails.downvoteEditor)

router.get('/checkvotestatus', editordetails.checkVoteStatus);

module.exports = router;