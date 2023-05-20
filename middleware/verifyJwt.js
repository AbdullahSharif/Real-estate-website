const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const verifyJwt = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new Error("You are not logged in! Kindly login."))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next()

}

module.exports = verifyJwt;