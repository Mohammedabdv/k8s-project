//CartItem=ProductCart
const { Order, CartItem } = require("../models/order");


//Get order by id
exports.getOrderById = (req, res, next, id) => {
    //Find order by id
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            //if error or order is not found
            if (err || !order) {
                return res.status(400).json({
                    error: "No order found in DB"
                });
            }
            //if order is found
            req.order = order;
            next();
        });
};

//Create order
exports.createOrder = (req, res) => {
    //req.profile is set by getUserById in auth.js
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        //if error
        if (err) {
            return res.status(400).json({
                error: "Failed to save your order in DB"
            });
        }
        //if order is saved
        res.json(order);
    });
};

//Get all orders
exports.getAllOrders = (req, res) => {
    //Find all orders
    Order.find()
        .populate("user", "_id name")
        .exec((err, orders) => {
            //if error
            if (err) {
                return res.status(400).json({
                    error: "No orders found"
                });
            }
            //if orders are found
            res.json(orders);
        });
};

//Get order status
exports.getOrderStatus = (req, res) => {
    //Send status in response
    res.json(Order.schema.path("status").enumValues);
};

//Update status of order
exports.updateStatus = (req, res) => {
    //Update status of order
    Order.updateOne(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            //if error
            if (err) {
                return res.status(400).json({
                    error: "Cannot update order status"
                });
            }
            //if status is updated
            res.json(order);
        });
};

