const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");

class OrderRepository {
    async createOrderItem(item) {
        const newItem = new OrderItem(item);
        return await newItem.save();
    }

    async createOrder(orderData) {
        const orders = new Order(orderData);
        return await orders.save();
    }

    async getAllOrders() {
        return await Order.find().populate("user", "name email").populate({
            path: "orderItems",
            populate: {
                path: "product",
                model: "Product"
            }
        });
    }

    async getOrderById(orderId) {
        return await Order.findById(orderId).populate("user", "name email").populate({
            path: "orderItems",
            populate: {
                path: "product",
                model: "Product"
            }
        });
    }
}

module.exports = OrderRepository;