const { isValidObjectId } = require('mongoose');
const mongoose = require('mongoose')
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
        const result = await Book.findById(new mongoose.Types.ObjectId(id));
        if (!result) {
            res.status(404).send("Book Not Found");
        } else {
            res.send(result);
        }
    }
}

const getBookByIsbn = async (req, res) => {
    const isbnNumber = req.params.isbn;
    console.log(("parsed result", parseInt(isbnNumber)))
    if (isNaN(isbnNumber)) {
        res.status(404).send("Please Enter a valid ISBN number")
    }
    else {
        const result = await Book.find({ isbn: isbnNumber });
        if (!result) {
            res.status(404).send("Book Not Found!");
        } else {
            res.send(result);
        }
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    getBookByIsbn
}