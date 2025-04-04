

class ProductUsecase {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    async CreateProduct(productData) {
        // Check if the category exist
        const category = await this.categoryRepository.getCategory(productData.category)
        if (!category) {
            return { message: "category not found" }
        }
        let product = await this.productRepository.FindProductByName(productData.name)
        // If product already exists, increment quantity
        if (product) {
            product.countInStock +=1;
            await product.save();
            return product;
        } else {
            // Otherwise add as a new product
            return await this.productRepository.CreateProduct({...productData});
        }

    }

    async GetProduct(productId) {
        const product = await this.productRepository.GetProduct(productId);
        if (!product) {
            throw new Error(" no product found");
        } else {
            return { productData: product }
        }
    }

    async GetAllProducts() {
        return await this.productRepository.GetAllProducts();
    }

    async RemoveProduct(productId) {
        let product = await this.productRepository.GetProduct(productId);
        if (!product) {
            throw new Error(" no product found to remove");
        }

        // Decrement quantity first
        if (product.countInStock > 1) {
            product.countInStock -= 1;
            await product.save();
            return { message: "product quantity decremented", item: product };
        } else {
            // If quantity is 1, remove the product
            await this.productRepository.RemoveProduct(productId);
            return { message: "product removed from inventory " };
        }

    }

    async UpdateProduct(productId, updatedProduct) {
        let isProduct = await this.productRepository.GetProduct(productId);
        if (!isProduct) {
            return { message: "no product found to update" };
        }
        const newProduct = await this.productRepository.UpdateProduct(productId, updatedProduct);
        return newProduct;
    }
}

module.exports = ProductUsecase;