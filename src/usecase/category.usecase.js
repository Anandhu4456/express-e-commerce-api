// const CategoryRepository = require("../repository/category.repository");

class CategoryUsecase {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async getCategory(categoryID) {
        const cat = await this.categoryRepository.getCategory(categoryID);
        if (!cat) {
            throw new Error("no category found");
        } else {
            return { category: cat };
        }
    }

    async createCategory(categoryData) {
        let cat = await this.categoryRepository.findCategoryByName(categoryData.name);
        if (cat) {
            throw new Error("category already exist")

        } else {
            return await this.categoryRepository.createCategory(categoryData);
        }
    }

    async getAllCategory() {
        return await this.categoryRepository.getAllCategories();
    }

    async removeCategory(categoryId) {
        let cat = await this.categoryRepository.getCategory(categoryId);
        if (!cat) {
            throw new Error("no category found to remove");
        } else {
            await this.categoryRepository.removeCategory(categoryId);
        }
        return {message : "category removed succesfully"}
    }
}

module.exports = CategoryUsecase;