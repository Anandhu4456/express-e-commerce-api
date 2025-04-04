const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);