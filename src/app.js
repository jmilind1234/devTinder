const express = require("express");
const {connectToCluster} = require("./config/database");
const app = express();

connectToCluster().then(()=> {
    console.log("Connection to cluster was successfull");
    app.listen(7777, ()=>{
        console.log("Server listening up at port 7777");
    })
}).catch(err => console.log("Connection to cluster was not established", err))
