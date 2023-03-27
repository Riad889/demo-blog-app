const express = require("express");

const { getAllUser,signup ,login} = require("../controllers/userControllers");

const router = express.Router();


//home page

router.get("/", getAllUser);


//signup route

router.post('/signup',signup);

//login route

router.post('/login',login);

//export the router





module.exports = router;
