const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");

router.post("/mentor/register", authController.registerMentor);
router.post("/mentor/login", authController.loginMentor);


module.exports = router;

//what missed did earlier 😪 I said it was probably something silly and I was right. we just forgot the final line where we export the router. this alone caused the error in our server. 


// dont forget the define your routes heer when you do the signup and register method for the trainee girlies.
