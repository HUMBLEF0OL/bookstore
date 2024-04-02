const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/book')
const userRouter = require('./routes/user')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { verifyToken } = require('./services/auth.service');


const app = express();

const allowedOrigin = 'http://localhost:3000';

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors({
    origin: allowedOrigin,
    credentials: true // Allow credentials (cookies) to be sent with requests
}));
app.use(cookieParser());


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

app.use('/book', verifyToken, bookRouter)

app.use(userRouter);

app.get((req, res) => {
    res.status(404).send("Not Found")
})