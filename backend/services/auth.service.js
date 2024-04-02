const jwt = require('jsonwebtoken');

const tokenAge = 3600;
const generateToken = (value) => {
    return {
        token: jwt.sign({ value }, 'the secret key', {
            expiresIn: tokenAge
        }),
        expiresIn: tokenAge
    };
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    console.log("received token is ", token);
    jwt.verify(token, 'the secret key', (err, decoded) => {
        if (err) {
            res.status(401).json({ result: err, status: 401 })
        } else {
            console.log("decoded token is ", decoded);
            next();
        }
    })
}

module.exports = {
    generateToken,
    verifyToken
}