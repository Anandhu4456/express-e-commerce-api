const Category = require("../models/category.model");

class CategoryRepository {
    async createCategory(categoryData) {

        const category = new Category(categoryData);
        return await category.save();
    }
    async getCategory(categoryID) {
        return await Category.findById(categoryID);
    }
    async getAllCategories() {
        return await Category.find();
    }
    async findCategoryByName(name) {
        return await Category.findOne({name});
    }
    async removeCategory(categoryId) {
        return await Category.findByIdAndDelete(categoryId);
    }
}

module.exports =  CategoryRepository;

