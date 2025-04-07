const Product = require("../models/product.model")
class OrderUsecase{
    constructor(orderRepository,productRepo) {
        this.orderRepository = orderRepository;
        this.productRepo = productRepo;
    }

    async createOrder(orderInput) {
        // First save all order items
        const orderItemsIds = await Promise.all(
            orderInput.orderItems.map(item => this.orderRepository.createOrderItem(item))
        );
    
        // We need to fetch product details to get prices
        const products = await this.productRepo.GetAllProducts({
            _id: { $in: orderInput.orderItems.map(item => item.product) }
        });
    
        // Create a map for quick price lookup
        const productPriceMap = {};
        products.forEach(product => {
            productPriceMap[product._id] = product.price;
        });
    
        // Calculate total price using actual product prices
        const totalPrice = orderInput.orderItems.reduce((acc, item) => {
            const price = productPriceMap[item.product] || 0;
            const quantity = item.quantity || 0;
            return acc + (price * quantity);
        }, 0);
    
        // Create order data
        const orderData = {
            ...orderInput,
            orderItems: orderItemsIds.map(i => i._id),
            totalPrice
        };
    
        return await this.orderRepository.createOrder(orderData);
    }

    async viewAllOrders() {
        return await this.orderRepository.getAllOrders();
    }

    async viewOrderById(orderId) {
        return await this.orderRepository.getOrderById(orderId);
    }
}

module.exports = OrderUsecase;