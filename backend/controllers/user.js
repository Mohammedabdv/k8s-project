const User = require("../models/user");
const Order = require("../models/order");

//Exports

//Get user by id
exports.getUserById = (req, res, next, id) => {
    //find user by id
    User.findById(id).exec((err, user) => {
        //if error or user not found
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        //if no error
        req.profile = user;
        next();
    });
}

//Get user
exports.getUser = (req, res) => {
    //Do not send password and salt to frontend
    req.profile.salt = undefined;
    req.profile.encryptedPassword = undefined;
    //Timestamps are not needed
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

//Update user
exports.updateUser = (req, res) => {
    //update user
    User.findByIdAndUpdate(
        //id
        { _id: req.profile._id },
        //update
        { $set: req.body },
        //options
        { new: true, useFindAndModify: false },
        //callback
        (err, user) => {
            //if error
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                });
            }
            //if no error
            //Do not send password and salt to frontend
            user.salt = undefined;
            user.encryptedPassword = undefined;
            res.json(user);
        }
    );
};

//Get all orders
exports.userPurchaseList = (req, res) => {
    //find all orders
    Order.find({ user: req.profile._id })
        //populate the product field
        .populate("user", "_id name")
        .exec((err, order) => {
            //if error
            if (err) {
                return res.status(400).json({
                    error: "No order in this account"
                });
            }
            //if no error
            return res.json(order);
        });
};

//Push order in purchase list
exports.pushOrderInPurchaseList = (req, res, next) => {
    //get all purchases
    let purchases = [];
    //loop through all products
    req.body.order.products.forEach(product => {
        //push each product into purchases array
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });
    //store this in DB
    //update user
    User.findOneAndUpdate(
        //id
        { _id: req.profile._id },
        //update
        { $push: { purchases: purchases } },
        //options
        { new: true },
        //callback
        (err, purchases) => {
            //if error
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                });
            }
            //if no error
            next();
        }
    );
};



