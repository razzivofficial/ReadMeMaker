const express = require('express')
const router = express.Router()

const feedbacks = require('../controller/Feedback.controller')

router.post('/feedpost',feedbacks.addFeedback)
router.get('/feedget',feedbacks.fetchAllFeedback)
router.delete('/feeddelete/:id',feedbacks.deleteFeedbackById)

module.exports = router;