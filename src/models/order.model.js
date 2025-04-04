const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem', required: true }],
    shippingAddress: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: Number, required: true },
    country: { type: String, required: true },
    status: { type: String, required: true, default: 'Pending' },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateOrdered: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Order", OrderSchema);