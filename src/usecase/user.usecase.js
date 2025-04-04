
const { generateToken, passwordHash, compareHash } = require("../helper/user.helper");

class UserUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async registerUser(userData) {
        const hashedPassword = await passwordHash(userData.password);
        // Assigning hashed password to passwordHash field in the user model
        userData.password = hashedPassword;

        const user = await this.userRepository.userRegister(userData);

        // Generate JWT 
        const token = generateToken(user);
        console.log("token: ", token);


        return { user, token };

    }

    async userLogin(email, password) {
        const user = await this.userRepository.userLogin(email);
        if (!user) {
            throw new Error(" no user found ");
        }

        await compareHash(password, user.password);

        // Generate JWT
        const token = generateToken(user);

        return { user, token }

    }
    async getOneUser(userId) {
        const user = await this.userRepository.getOneUser(userId);
        if (!user) {
            throw new Error(" no user found ");
        }

        return { "user": user };
    }

    async getAllUsers() {
        return await this.userRepository.getUsers();

    }

    async updateUser(userId, updatedData) {
        const user = await this.userRepository.getOneUser(userId);
        if (!user) {
            return { message: " no user found to update" };
        }
        return await this.userRepository.updateUser(userId, updatedData);
    }

    async removeUser(userId) {
        let user = await this.userRepository.getOneUser(userId);
        if (!user) {
            return { message: "no user found to remove "};
        }
        await this.userRepository.removeUser(userId);
        return { message: "removed user successfully"};
    }
}

module.exports = UserUsecase;