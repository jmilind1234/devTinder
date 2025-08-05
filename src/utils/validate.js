var validator = require('validator');

function validateSignUpData(body){
    const ALLOWED_KEYS = ['firstName', 'lastName', 'emailId', 'password', 'age' , 'gender', 'photoUrl', 'about' , 'skills'];
    const isCorrect = Object.keys(body).every(key => ALLOWED_KEYS.includes(key));
    if(!isCorrect){
        throw new Error("Unwanted field(or fields) present");
    }
    if(body.firstName && !(/^[A-Za-z]+$/.test(body.firstName))){
        throw new Error("First name is not valid i.e. it contains invalid characters");
    }
    if(body.lastName && !(/^[A-Za-z]+$/.test(body.lastName))){
        throw new Error("Last name is not valid i.e. it contains invalid characters");
    }
    if(body.emailId && (!validator.isEmail(body.emailId))){
        throw new Error("Email ID is not valid, please enter valid email id");
    }
    if(body.password && (!validator.isStrongPassword(body.password))){
        throw new Error("Password is not strong enough");
    }
    if(body.age && typeof body.age !== "number"){
        throw new Error("Age must be a valid number");
    }
    if(body.photoUrl && (!validator.isURL(body.photoUrl))){
        throw new Error("Photo URL must be proper URL.");
    }
    if(body.skills && (!Array.isArray(body.skills))){
        throw new Error("Skills are in wrong format");
    }
}

function validateUpdateViaEmail(body){
    //only skills and photourl can be updated
    const ALLOWED_KEYS = ['emailId', 'photoUrl', 'skills'];
    const isCorrect = Object.keys(body).every(key => ALLOWED_KEYS.includes(key));

    if(!isCorrect){
        throw new Error('Only photo url and/or skills can be updated');
    }
    if(!body.emailId){
        throw new Error('Email ID is must for updating data.')
    }

    if(body.emailId && (!validator.isEmail(body.emailId))){
        throw new Error("Email ID is not valid, please enter valid email id");
    }
    
    if(body.photoUrl && (!validator.isURL(body.photoUrl))){
        throw new Error("Photo URL must be proper URL.");
    }

    if(body.skills && (!Array.isArray(body.skills))){
        throw new Error("Skills are in wrong format");
    }

}
module.exports = {validateSignUpData, validateUpdateViaEmail}