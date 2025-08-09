const express = require("express");
const bcrypt = require("bcrypt");
const {connectToCluster} = require("./config/database");
const BadRequestError = require('./utils/BadRequestError');
const {validateSignUpData, validateUpdateViaEmail, validateLoginData} = require("./utils/validate");
const UserModel = require("./Models/userModel");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const {userAuth} = require("../src/middlewares/authMiddlewares");
app.use(express.json());
app.use(cookieParser());

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
                const jwtToken = jwt.sign({userId : user[0]._id}, "DevTinder", {expiresIn : "1d"});
                res.cookie("token", jwtToken, {maxAge : "86400000"});
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

//API to get profile of the user
app.get("/profile", userAuth, async(req, res, next)=>{
    try {
        res.send(req.user);
    } catch (error) {
        res.send(500).send("Can't get profile of the user. Please login again!!!");
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
        console.log("Error name is ",error.name);
        if(error instanceof BadRequestError){
            res.status(400).send({Message: error.message});
        }
        if(error.name === "ValidationError"){
            res.status(400).send({Message: error.message});
        }
        if(error.name === "MongoServerError"){
            res.status(409).send({Message : error.message});
        }
        res.status(500).send("Error saving the user " +  error.message);
    }
});

connectToCluster().then(()=> {
    console.log("Connection to cluster was successfull");
    app.listen(7777, ()=>{
        console.log("Server listening up at port 7777");
    })
}).catch(err => console.log("Connection to cluster was not established", err))
