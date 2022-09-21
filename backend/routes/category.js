const express = require('express');
const router = express.Router();
const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//----Documenation----
//https://npmjs.com/package/express

//----My Routes----

//----Params----
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//----Actual Routes----

//Create category
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);

//Get category
router.get("/category/:categoryId", getCategory)

//Get all categories
router.get("/categories", getAllCategory)

//Update category
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);

//Delete category
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory
)

//----Exports----
module.exports = router;