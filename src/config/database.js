const mongoose = require("mongoose");

const connectToCluster  = async ()=>{
    await mongoose.connect("mongodb+srv://DevTinder:Mjilind1999@devtinder.dzwxefe.mongodb.net/");
}

module.exports = {connectToCluster};