const express = require('express')
const BookController = require('../controllers/book')
const router = express.Router();


router.get('/', BookController.getAllBooks)

router.get('/:id', BookController.getBookById)

router.get('/isbn/:isbn', BookController.getBookByIsbn)

router.post('/create', BookController.postBook)

router.patch('/updatebook/:isbn', BookController.updateBook)

router.delete('/:isbn', BookController.deleteBook)

module.exports = router;