const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
        auto: true,
        index: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    }
})

// a middleware for performing something before saving data
userSchema.pre("save", async function (next) {
    // generate salt
    const salt = await bcrypt.genSalt();
    // encrypt password
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return auth;
        } else {
            throw Error("Incorrect password");
        }
    } else {
        throw Error("Email Not Found")
    }
}

const User = mongoose.model('User', userSchema);


module.exports = User;