const CategoryRepository = require("../repository/category.repository");
const CategoryUsecase = require("../usecase/category.usecase");
const CategoryController = require("../controller/category.controller");

const ProductRepository = require("../repository/product.repository");
const ProductUsecase = require("../usecase/product.usecase");
const ProductController = require("../controller/product.controller");

const UserRepository = require("../repository/user.repository");
const UserUsecase = require("../usecase/user.usecase");
const UserController = require("../controller/user.controller");

// Instantiate dependencies
const userRepo = new UserRepository();
const userUsecase = new UserUsecase(userRepo);
const userController = new UserController(userUsecase);

const categoryRepo = new CategoryRepository();
const categoryUsecase = new CategoryUsecase(categoryRepo);
const categoryController = new CategoryController(categoryUsecase);

const productRepo = new ProductRepository();
const productUsecase = new ProductUsecase(productRepo, categoryRepo);
const productController = new ProductController(productUsecase);

// Export controller for using in routes
// Exporting as an object
module.exports = { categoryController, productController, userController };