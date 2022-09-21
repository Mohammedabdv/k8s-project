const express = require('express');
const router = express.Router();

const { getUserById, getUser, updateUser, userPurchaseList } = require('../controllers/user');
const { isAdmin, isSignedIn, isAuthenticated } = require('../controllers/auth');

//----Docuemntation----
//https://www.npmjs.com/package/express

//----My Routes----

//----Params----
router.param("userId", getUserById);

//----Actual Routes----

//Get user
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//Update user
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

//----Order Routes----

//Get all orders
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

//----Exports----
module.exports = router;