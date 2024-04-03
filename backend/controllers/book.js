const { isValidObjectId } = require('mongoose');
const mongoose = require('mongoose')
const Book = require('../models/books');
const redis = require('redis');


const connectRedis = async () => {
    const client = redis.createClient({ url: 'redis://localhost:6379' });

    client.on('error', err => {
        console.log("redis connection failed");
    }).on("ready", () => {
        console.log("redis is ready to server")
    })
    await client.connect();

    return client;
}

const findInCache = async (limit, offset, searchString, sort) => {
    try {
        const client = await connectRedis();
        console.log("fetching data from cache")
        const result = await client.get('books')
        console.log("-------------------------------", result);
        if (result) {
            console.log("restored data is ", result);
            return JSON.parse(result);
        } else {
            const totalCount = await Book.countDocuments();
            const books = await Book.find({ title: { $regex: searchString, $options: 'i' } }).sort({ publishedDate: sort }).skip((offset - 1) * limit).limit(limit);
            // res.cookie('jwt', 'test');
            // console.log("cookies received are: ", req?.cookie?.Cookie_1)
            const queryResult = { totalCount, books };
            await client.set('books', JSON.stringify(queryResult), (err, result) => {
                if (err) {
                    console.log("failed to save data in cache");
                } else {
                    console.log("faved data in cahce with message: ", result)
                }
            })
            return queryResult;
        }
    } catch (err) {
        throw err;
    }
}

const getAllBooks = async (req, res) => {
    console.log("fetching all books")
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 1;
    const searchString = req.query.searchString || '';
    const sort = req.query.sortBy === 'old' ? 1 : -1;

    // console.log("sort order is ", sort)
    // try {
    //     // count total number of pages
    //     const totalCount = await Book.countDocuments();
    //     const books = await Book.find({ title: { $regex: searchString, $options: 'i' } }).sort({ publishedDate: sort }).skip((offset - 1) * limit).limit(limit);
    //     // res.cookie('jwt', 'test');
    //     // console.log("cookies received are: ", req?.cookie?.Cookie_1)
    //     res.json({ totalCount, books });
    // } catch (err) {
    //     res.status(404).json(err);
    // }
    try {
        const result = await findInCache(limit, offset, searchString, sort);
        console.log("received result is -----", result);
        res.json(result);
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
            res.send({
                result: result[0],
                status: 200
            });
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
        console.log("updating document with isbn:", req.body);
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
    console.log("inside the deleteBook");
    try {
        console.log("deleting the document with isbn: ", req.params.isbn);
        const result = await Book.findOneAndDelete({ isbn: req.params.isbn })
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