var validator = require('validator');

function validateLoginData(body){
    const ALLOWED_KEYS = ['emailId', 'password'];
    const isCorrect = Object.keys(body).every(key => ALLOWED_KEYS.includes(key));
    if(!isCorrect){
        throw new BadRequestError("Bad Request");
    }
    if(!body?.emailId){
        throw new BadRequestError("Email Id missing");
    }
    if(!body?.password){
        throw new BadRequestError("Password is missing");
    }
    if(body.emailId && (!validator.isEmail(body.emailId))){
        throw new BadRequestError("Email ID is not valid, please enter valid email id");
    }
}

function validateSignUpData(body){
    const ALLOWED_KEYS = ['firstName', 'lastName', 'emailId', 'password', 'age' , 'gender', 'photoUrl', 'about' , 'skills'];
    const isCorrect = Object.keys(body).every(key => ALLOWED_KEYS.includes(key));
    if(!isCorrect){
        throw new BadRequestError("Unwanted field(or fields) present");
    }
    if(body.firstName && !(/^[A-Za-z]+$/.test(body.firstName))){
        throw new BadRequestError("First name is not valid i.e. it contains invalid characters");
    }
    if(body.lastName && !(/^[A-Za-z]+$/.test(body.lastName))){
        throw new BadRequestError("Last name is not valid i.e. it contains invalid characters");
    }
    if(body.emailId && (!validator.isEmail(body.emailId))){
        throw new BadRequestError("Email ID is not valid, please enter valid email id");
    }
    if(body.password && (!validator.isStrongPassword(body.password))){
        throw new BadRequestError("Password is not strong enough");
    }
    if(body.age && typeof body.age !== "number"){
        throw new BadRequestError("Age must be a valid number");
    }
    if(body.photoUrl && (!validator.isURL(body.photoUrl))){
        throw new BadRequestError("Photo URL must be proper URL.");
    }
    if(body.skills && (!Array.isArray(body.skills))){
        throw new BadRequestError("Skills are in wrong format");
    }
}

function validateUpdateViaEmail(body){
    //only skills and photourl can be updated
    const ALLOWED_KEYS = ['emailId', 'photoUrl', 'skills'];
    const isCorrect = Object.keys(body).every(key => ALLOWED_KEYS.includes(key));

    if(!isCorrect){
        throw new BadRequestError('Only photo url and/or skills can be updated');
    }
    if(!body.emailId){
        throw new BadRequestError('Email ID is must for updating data.')
    }

    if(body.emailId && (!validator.isEmail(body.emailId))){
        throw new BadRequestError("Email ID is not valid, please enter valid email id");
    }
    
    if(body.photoUrl && (!validator.isURL(body.photoUrl))){
        throw new BadRequestError("Photo URL must be proper URL.");
    }

    if(body.skills && (!Array.isArray(body.skills))){
        throw new BadRequestError("Skills are in wrong format");
    }

}
module.exports = {validateSignUpData, validateUpdateViaEmail, validateLoginData}