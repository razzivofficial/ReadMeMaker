const express = require('express');
const router = express.Router();

const geminiController = require('../controller/gemini.controller');

router.post('/generate-readme', geminiController.generateReadme);

module.exports = router;