const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.registerUser = async function (req, res) {
    try {
        let {
            name,
            email
        } = req.body
        

        // check if the user already exists.
        const userPresent = await User.findOne({email: req.body.email});

        if(userPresent) throw new Error("User already exists!")

        // encrypt the user password.
        const pass =  await bcrypt.hash(req.body.password, 10);

        // create the user in the database.
        const result = await User.create({
            password: pass,
            name,
            email 
        });

        if(!result) throw new Error("Something went wrong!");
        const jwtToken = jwt.sign({id: result._id}, process.env.JWT_SECRET, {expiresIn: "2h"});

        const {password, ...userDetails} = result._doc;
        

        return res.status(201).json({
            saved: true,
            message: "You have registered successfully!",
            jwtToken,
            userDetails
        })


        
    } catch (error) {
        return res.json({
            saved: false,
            error: error.message
        })
    }


}


// login controller.
exports.login = async function (req, res) {
    try {
        // find the user.
        const user = await User.findOne({email: req.body.email}).select("+password");
        
        if(!user) throw new Error("Wrong username or password!");

        // check if password is the same.
        const passIsSame = await bcrypt.compare(req.body.password, user.password);

        if(!passIsSame) throw new Error("Wrong email or password!");

        // if emil and password is same, return the user user details and the jwt token.
        const jwtToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "2h"});

        const {password, ...userDetails} = user._doc;

        return res.status(200).json({
            saved: true,
            message: "You are logged in successfully!",
            jwtToken,
            userDetails
            
        })

        
    } catch (error) {
        return res.status(500).json({
            saved:false,
            message: error.message
        })
    }
}

