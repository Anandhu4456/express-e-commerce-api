const Product = require("../models/product.model");


class ProductRepository {
    async CreateProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }
    async GetProduct(productId) {
        return await Product.findById(productId);
    }
    async GetAllProducts() {
        return await Product.find().populate("category");
    }
    async RemoveProduct(productId) {
        return await Product.findByIdAndDelete(productId);
    }
    async FindProductByName(name) {
        return await Product.findOne({name});
    }
    async UpdateProduct(productId, updatedItem) {
        return await Product.findByIdAndUpdate(productId, updatedItem, { new: true, runValidators: true});
    }
}

module.exports = ProductRepository;