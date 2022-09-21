const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

//----Documentation----
// https://mongoosejs.com/docs/guide.html

//----Schema----
const cartItemSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
    },
    name: String,
    price: Number,
    count: Number,
});
const CartItem = mongoose.model('CartItem', cartItemSchema);

const orderSchema = new mongoose.Schema({
    products: [cartItemSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: String,
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
const Order = mongoose.model('Order', orderSchema);

//----Export----
module.exports = { Order, CartItem };