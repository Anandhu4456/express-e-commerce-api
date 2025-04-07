
class OrderUsecase{
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async createOrder(orderInput) {

        // Takes id's of ordered items
        const orderItemsIds = await Promise.all(
            orderInput.orderItems.map(item => this.orderRepository.createOrderItem(item))
        );

        // Calculate total price
        const totalPrice = orderInput.orderItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);

        // orderData object has the details of orderInput( details of the order), product id's, total price
        const orderData = {
            ...orderInput,
            orderItems : orderItemsIds.map(i => i._id),
            totalPrice
        }

        // Passing the orderData object to createOrder
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