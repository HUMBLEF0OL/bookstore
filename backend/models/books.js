const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
        auto: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    pageCount: Number,
    publishedDate: Date,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: String,
    authors: [String],
    categories: [String],

})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;