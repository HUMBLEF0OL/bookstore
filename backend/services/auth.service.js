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

module.exports = {
    generateToken
}