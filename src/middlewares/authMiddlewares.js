const jwt = require("jsonwebtoken");
const UserModel = require("../Models/userModel");

const userAuth = async (req, res, next) => {
  try {
    const decodedObj = jwt.verify(req.cookies.token, "DevTinder");
    const user = await UserModel.findById(decodedObj?.userId);
    if (!user) {
      res.status(404).send("User not found!!!");
    }
    req.user = user;
    next();
  } catch (error) {
    if(error.name === "TokenExpiredError"){
        res.status(401).send(error.message);
    }
  }
};

module.exports = { userAuth };
