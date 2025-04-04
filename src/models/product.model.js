const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    images: [{ type: String }],
    brand: { type: String, default: '' },
    price: { type: Number, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    countInStock: { type: Number, required: true, min: 0, max: 150},
    dateCreated: { type: Date, default: Date.now}

})

module.exports = mongoose.model("Product", ProductSchema);