

class UserController {
    constructor(userUsecase) {
        this.userUsecase = userUsecase;
        this.registerUser = this.registerUser.bind(this);
        this.userLogin = this.userLogin.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    async registerUser(req, res) {
        try {
            const { name, email, password, phone, country, city, pincode, isAdmin } = req.body;
            const user = await this.userUsecase.registerUser({ name, email, password, phone, country, city, pincode, isAdmin });
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async userLogin(req, res) {
        try {
            const { email, password} = req.body;
            const user = await this.userUsecase.userLogin(email, password);
            res.status(200).json(user);
        } catch (err) {
            res.status(401).json({message: err.message});
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userUsecase.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json( {message: err.message});
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userUsecase.getOneUser( id );
            res.status(200).json(user);
        } catch (err) {
            res.status(403).json( {message: err.message});
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { updatedUser } = req.body;
            const response = await this.userUsecase.updateUser(id, updatedUser);
            res.status(200).json( response );
        } catch (err) {
            res.status(403).json( {message: err.message});
        }
    }

    async removeUser(req, res) {
        try {
            const { id } = req.params;
            const response = await this.userUsecase.removeUser(id);
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}


module.exports = UserController;