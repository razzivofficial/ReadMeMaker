const express = require('express')
const router = express.Router()

const editordetails = require('../controller/Editor.controller')

router.post('/addeditor',editordetails.addEditor)
router.get('/getalleditor',editordetails.fetcheditors)
router.get('/geteditorbyemail/:email',editordetails.fetchbyemail)
router.patch('/upvoteplus/:id',editordetails.upvoteEditorplus)
router.patch('/upvoteminus/:id',editordetails.upvoteEditorminus)
router.patch('/downvoteplus/:id',editordetails.downvoteEditorplus)
router.patch('/downvoteminus/:id',editordetails.downvoteEditorminus)

module.exports = router;