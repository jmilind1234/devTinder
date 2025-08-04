function validateSignUpData(body){
    const ALLOWED_KEYS = ['firstName', 'lastName', 'emailId', 'password', 'age' , 'gender', 'photoUrl', 'about' , 'skills'];
    const isCorrect = Object.keys(body).every(key => ALLOWED_KEYS.includes(key));
    if(!isCorrect){
        throw new Error("Unwanted field(or fields) present");
    }
}

module.exports = {validateSignUpData}