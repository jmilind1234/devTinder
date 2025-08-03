const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: {
        type:String,
        required: true
    },
    lastName: String,
    emailId: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    age: Number,
    gender: String,
    photoUrl: String,
    about: {type:String, default: "I'm a developer!!!"},
    skills: [String]
});

module.exports = {userSchema};