const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/book')
const cors = require('cors')

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://0.0.0.0:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("database connected")
        app.listen(5000, () => {
            console.log("ready to server on 5000")
        })
    }).catch(err => {
        console.log(err)
    })

app.get('/', (req, res) => {
    res.send('Application route')
})

app.use('/book', bookRouter)

app.get((req, res) => {
    res.status(404).send("Not Found")
})