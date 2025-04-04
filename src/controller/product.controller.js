

class ProductController {
    constructor(productUsecase) {
        this.productUsecase = productUsecase;
        this.createProduct = this.createProduct.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

    async createProduct(req, res) {
        try {
            const { name, description, image, images, brand, price, countInStock, category } = req.body;
            const productResponse = await this.productUsecase.CreateProduct({ name, description, image, images, brand, price, countInStock, category});
            res.status(201).json(productResponse);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
        
    }

    async getProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await this.productUsecase.GetProduct(id);
            res.status(200).json(product);
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productUsecase.GetAllProducts();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } 

    async removeProduct(req, res) {
        try {
            const { id } = req.params;
            const response = await this.productUsecase.RemoveProduct(id);
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const response = await this.productUsecase.UpdateProduct(id, updatedData);

            res.status(200).json(response);

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

module.exports = ProductController;