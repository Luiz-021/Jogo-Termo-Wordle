const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

router.get('/', wordController.getWordOfTheDay);

router.post('/validate', wordController.checkWordExistence);

module.exports = router;