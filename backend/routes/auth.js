const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');

//----Documentation----
//https://www.npmjs.com/package/express
//https://www.npmjs.com/package/express-validator

//----Routes----

//Sign up
router.post("/signup", [
    check("name", "Name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 8 characters").isLength({ min: 8 })
], signup);

//Sign in
router.post("/signin", [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 8 })
], signin);

//Sign out
router.get('/signout', signout);

//Test route
router.get('/testroute', isSignedIn, (req, res) => {
    res.json(req.auth);
});


//----Exports----
module.exports = router;