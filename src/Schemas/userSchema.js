const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: {
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type : String,
        trim: true, 
        lowercase : true
    },
    emailId: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        immutable: true,
    },
    password: {
        type:String,
        trim: true,
        required: true
    },
    age: {type: Number, min: 12,required: true},
    gender: {
        type: String,
        enum: ['male',' female', 'other'],
        lowercase: true,
    },
    photoUrl: {type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s"},
    about: {type:String, default: "I'm a developer!!!"},
    skills: [String]
},{
    timestamps: true
});

module.exports = {userSchema};