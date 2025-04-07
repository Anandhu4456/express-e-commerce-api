

class OrderController {
    constructor(orderUsecase) {
        this.orderUsecase = orderUsecase;
        this.createOrder = this.createOrder.bind(this);
        this.getAllOrders = this.getAllOrders.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
    }

    async createOrder(req, res) {
        try {
            const order = await this.orderUsecase.createOrder( { ...req.body, user: req.user.id });
            res.status(201).json(order);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await this.orderUsecase.viewAllOrders();
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json( { message: err.message });
        }
    }

    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const response = await this.orderUsecase.viewOrderById(id);
            res.status(200).json(response);
        } catch (err) {
            res.status(403).json( { message: err.message });
        }
    }
}

module.exports = OrderController;