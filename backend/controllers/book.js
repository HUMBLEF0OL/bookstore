const { isValidObjectId } = require('mongoose');
const Book = require('../models/books');

const getAllBooks = (req, res) => {
    console.log("request received")
    Book.find().sort({ publishedDate: -1 })
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
}

const getBookById = async (req, res) => {
    const id = req.params.id;
    console.log("id is sssssssssss", id, typeof id)
    if (!isValidObjectId(id)) {
        res.status(404).send("Invalid ID")
    } else {
        const result = await Book.findById(id);
        if (!result) {
            res.status(404).send("Book Not Found");
        } else {
            res.send(result);
        }
    }
}

module.exports = {
    getAllBooks,
    getBookById
}