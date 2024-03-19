const { isValidObjectId } = require('mongoose');
const mongoose = require('mongoose')
const Book = require('../models/books');

const getAllBooks = async (req, res) => {
    console.log("fetching all books")
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 1;

    try {
        // count total number of pages
        const totalCount = await Book.countDocuments();
        const books = await Book.find().skip((offset - 1) * limit).limit(limit);
        res.json({ totalCount, books });
    } catch (err) {
        res.status(404).json(err);
    }
}

const getBookById = async (req, res) => {
    const id = req.params.id;
    console.log("finding book for id:", id, typeof id)
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
    console.log(("finding book for isbn:", parseInt(isbnNumber)))
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

const postBook = async (req, res) => {
    try {
        console.log("pushing the book data for: ", req.body)
        const newBook = new Book(req.body)
        const result = await newBook.save();
        if (!result) {
            res.status(404).send("Failed to the Book!")
        } else {
            res.send("Operation Successful!")
        }
    } catch (err) {
        res.status(404).json(err)
    }

}

const updateBook = async (req, res) => {
    try {
        console.log("updating document with isbn:", req.params.isbn);
        const result = await Book.findOneAndUpdate({ isbn: req.params.isbn }, req.body)
        if (!result) {
            res.status(404).send("Failed to Update the book!");
        } else {
            console.log("operation successful with result", result);
            res.json({ data: result })
        }
    } catch (err) {
        res.status(404).json(err)
    }
}

const deleteBook = async (req, res) => {
    try {
        console.log("deleting the document with isbn: ", req, params.isbn);
        const result = await Book.findByIdAndDelete({ isbn: req.params.isbn })
        if (!result) {
            res.status(404).send("Failed to Delete the book!");
        } else {
            res.json({
                data: result
            })
        }
    } catch (err) {
        res.status(404).json(err);
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    getBookByIsbn,
    postBook,
    updateBook,
    deleteBook
}