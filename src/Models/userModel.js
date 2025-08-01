const mongoose = require("mongoose");
const { userSchema } = require("../Schemas/userSchema");

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;