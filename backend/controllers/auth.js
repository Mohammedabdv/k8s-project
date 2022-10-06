const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

//----Documentation----
//https://www.npmjs.com/package/express-validator
//https://www.npmjs.com/package/jsonwebtoken
//https://www.npmjs.com/package/express-jwt

//----Exports----

//Sign up
exports.signup = (req, res) => {
    const errors = validationResult(req);
    //if there are errors
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    //create new user
    const user = new User(req.body);
    //Find whether user already exists
    User.findOne({ email: user.email }, (err, userExists) => {
        if (err || userExists) {
            return res.status(400).json({
                error: "User Already Exists"
            });
        }
    });
    user.save((err, user) => {
        //if error
        if (err) {
            return res.status(400).json({
                err: "Not able to save user in DB"
            })
        }
        //if no error
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
};

//Sign in
exports.signin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    //if there are errors
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    //find user by email
    User.findOne({ email }, (err, user) => {
        //if error or user not found
        if (err || !user) {
            return res.status(400).json({
                error: "User email does not exist"
            });
        }
        //password does not match
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }
        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });
        //send response to front end
        const { _id, name, email, role } = user;
        res.json({ token, user: { _id, name, email, role } });
    });
};

//Sign out
exports.signout = (req, res) => {
    //clear cookie
    res.clearCookie("token");
    res.json({
        message: "User signed out successfully"
    });
};

//Custom middleware
//Protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});
//isAuthenticated
exports.isAuthenticated = (req, res, next) => {
    //if user is authenticated
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};
//isAdmin
exports.isAdmin = (req, res, next) => {
    //if user is admin
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not ADMIN, Access denied"
        });
    }
    next();
}

