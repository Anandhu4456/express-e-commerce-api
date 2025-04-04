//const CategoryUsecase = require("../usecase/category.usecase");


class CategoryController {
    constructor(categoryUsecase) {
        this.categoryUsecase = categoryUsecase;
        // When we pass CategoyController to routes, the functions losses its reference. So we need to bind the 'this' keyword
        this.createCategory = this.createCategory.bind(this);
        this.getAllCategory = this.getAllCategory.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
    }
    async createCategory(req, res) {
        try {
            const { name, icon, color } = req.body;
            const category = await this.categoryUsecase.createCategory({ name, icon, color });
            res.status(201).json(category);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await this.categoryUsecase.getCategory(id);
            res.status(200).json(category);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async getAllCategory(req, res) {
        try {
            const categories = await this.categoryUsecase.getAllCategory();
            return res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async removeCategory(req, res) {
        try {
            const { id } = req.params;
            const response = await this.categoryUsecase.removeCategory(id);
            res.status(200).json(response);

        } catch (err) {
            res.send(500).json({ message: err });
        }
    }
}

module.exports = CategoryController;