const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required!"],
        unique: [true, "name already taken!"],
        minLength: [4, "name cannot be less than 4 characters!"],
        maxLength: [32, "name cannot be more than 32 chracters!"]
    },
    email : {
        type: String,
        required: [true, "email is required!"],
        unique: [true, "email already taken!"],
        validate: [validator.isEmail, "Please enter a valid email!"]
    },
    password: {
        type: String,
        required: [true, "password is required!"],
        minLength: [8, "password cannot be less than 8 characters!"],
        select: false
    },
    profileImage: {
        type: String,
        default: ""
    }, 
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema)