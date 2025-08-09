const mongoose = require("mongoose");

const connectToCluster  = async ()=>{
    await mongoose.connect("mongodb+srv://jpurnash:O9JrwQqngvNKFOf2@devtinder.bpx4bne.mongodb.net/devTinder");
}

module.exports = {connectToCluster};