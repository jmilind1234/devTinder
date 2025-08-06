const express = require("express");
const bcrypt = require("bcrypt");
const {connectToCluster} = require("./config/database");
const BadRequestError = require('./utils/BadRequestError');
const {validateSignUpData, validateUpdateViaEmail, validateLoginData} = require("./utils/validate");
const UserModel = require("./Models/userModel");
const app = express();

app.use(express.json());

//API for login user
app.post('/login', async (req, res, next)=>{
    try {
        validateLoginData(req.body);
        //find the user with email id 
        let user = await UserModel.find({emailId : req.body.emailId});
        console.log("user found were ", user );
        if(user.length === 0){
            res.status(404).send("Invalid Credentials!!! Try again");
        }else{
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user[0].password);
            if(isPasswordCorrect){
                res.send("Login successfull!!!");
            }else{      
                res.status(404).send("Invalid Credentials!!! Try again");
            }
        }
        
    } catch (error) {
        if(error instanceof BadRequestError){
            res.status(400).send({Message: error.message});
        }
        res.status(500).send("Problem while logging in a user "+ error.message);
    }
})

//Adding new user
app.post("/signup", async (req, res, next) => {
    try {
        validateSignUpData(req.body);
        const {password} = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const response = await UserModel.create({...req.body, password: encryptedPassword});
        res.send(response);
    } catch (error) {
        if(error instanceof BadRequestError){
            res.status(400).send({Message: error.message});
        }
        res.status(500).send("Error saving the user " +  error.message);
    }
});

//get user by email
app.get("/user", async(req, res, next)=>{
    try {
        const emailId = req.body.emailId;
        const user = await UserModel.find({emailId});
        console.log("user with required email id is ", user);

        res.send(user[0]);
    } catch (error) {
        console.log("error ", error);
        res.status(500).send("Problem while pulling out user by email  - ", error.message);
    }
})

//Get all users
app.get("/feed", async(req, res, next)=>{
    try {
        const users = await UserModel.find({});
        console.log("users in collections are ----", users);
        res.send(users);
    } catch (error) {
        res.status(500).send("Problem while fetching the users details ",error);
    }
})

//API to delete user from collection
app.delete("/user", async(req, res, next)=>{
    try {
        const userId = req.body.userId;
        const response = await UserModel.findByIdAndDelete(userId);
        res.send(`User with ${userId} deleted successfully`);
    } catch (error) {
        res.status(500).send(`Problem in deleteing the user - ${error.message}`);
    }
});

//updating the user data based on email address provided
app.patch("/user/email", async(req, res, next)=>{
    try {
        //need to add validation here as well
        validateUpdateViaEmail(req.body);
        const {emailId, ...data} = req.body;
        const response = await UserModel.findOneAndUpdate({emailId},{...data},{runValidators: true});
        res.send(response);

    } catch (error) {
        res.status(500).send("Problem in updating userId with provided emailId");
    }
})


//API to update the user in collection
app.patch("/user", async(req, res, next)=>{
    try {
        const {userId, ...data} = req.body;
        const response = await UserModel.findByIdAndUpdate(userId, data, {runValidators: true, returnDocument: 'after'});
        res.send("User was updated successfully" + response);
    } catch (error) {
        res.status(500).send(`Problem while updating the user - ${error.message}`);
    }
});

connectToCluster().then(()=> {
    console.log("Connection to cluster was successfull");
    app.listen(7777, ()=>{
        console.log("Server listening up at port 7777");
    })
}).catch(err => console.log("Connection to cluster was not established", err))
