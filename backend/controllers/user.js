const User = require('../models/user');


const userSignUp = async (req, res) => {
    const { email, password } = req.body;
    console.log("user sign up", email, password, req.body)
    try {
        const result = await User.create({ email, password })
        if (result) {
            res.json(result);
        } else {
            res.status(400).json({ result: "Failed to create User" })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await User.login(email, password)
        res.json(result);
    } catch (err) {
        res.status(400).json({
            result: err.message,
            status: 400
        });
    }

}

const userLogOut = (req, res) => {
    console.log("trying to logout")
}

module.exports = {
    userSignUp,
    userLogin,
    userLogOut
}