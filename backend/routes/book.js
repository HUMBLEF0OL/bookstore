const express = require('express')
const { getAllBooks, getBookById } = require('../controllers/book')
const router = express.Router();


router.get('/', getAllBooks)

router.get('/:id', getBookById)


module.exports = router;