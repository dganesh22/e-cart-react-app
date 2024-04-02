const mongoose = require('mongoose')
const Cart = require('./cart')

const OrderSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.ObjectId,
        ref: Cart
    },
    paymentId: {
        type: String,
        trim: true
    },
    paymentStatus: {
        type: String,
        trim:true,
        enum: ["pending", "success","failed"]
    },
    orderStatus: {
        type: String,
        trim: true,
        enum: ["pending", "confirmed","canceled"]
    },
    deliveryStatus: {
        type: String,
        trim: true,
        enum: ["processing", "delivered", "returned"]
    }
},{
    collection: "order",
    timestamps: true
})

module.exports = mongoose.model("Order", OrderSchema)