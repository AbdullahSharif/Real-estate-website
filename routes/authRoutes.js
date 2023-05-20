const express = require("express");
const router = express.Router();
const {registerUser, login} = require("../controllers/authController.js");

// register a user.
router.post("/registerUser", registerUser);
// login.
router.post("/login", login);








module.exports = router;