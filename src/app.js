const express = require("express");
const {connectToCluster} = require("./config/database");
const UserModel = require("./Models/userModel");
const app = express();

app.post("/signup", async (req, res, next) => {
    const userObj = {
        firstName : "Milind",
        lastName: "Jain",
        emailId: "jmilind1234@gmail.com",
        password: "Mjilind@1999",
        age: 25,
        gender: "male"
    }
    
    try {
        const response = await UserModel.create({...userObj});
        res.send(response);
    } catch (error) {
        console.log("Error while saving user in the collection ", error);
        res.status(400).send("Error saving the user", error.message);
    }

    
})


connectToCluster().then(()=> {
    console.log("Connection to cluster was successfull");
    app.listen(7777, ()=>{
        console.log("Server listening up at port 7777");
    })
}).catch(err => console.log("Connection to cluster was not established", err))
