const express = require('express')
const { getAllBooks, getBookById, getBookByIsbn } = require('../controllers/book')
const router = express.Router();


router.get('/', getAllBooks)

router.get('/:id', getBookById)

router.get('/isbn/:isbn', getBookByIsbn)


module.exports = router;