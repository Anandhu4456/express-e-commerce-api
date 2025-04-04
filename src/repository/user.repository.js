const User = require("../models/user.model");

class UserRepository {
    async userRegister(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async userLogin(email) {
        return await User.findOne({ email });
    }

    async getUsers() {
        return await User.find();
    }

    async getOneUser(userId) {
        return await User.findById(userId);
    }

    async updateUser(userId, updatedUser) {
        return await User.findByIdAndUpdate(userId, updatedUser, { new: true, runValidators: true});
    }

    async removeUser(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = UserRepository;