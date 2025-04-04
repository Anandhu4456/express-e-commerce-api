const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connection succesfull");
    } catch (err) {
        console.error("mongo connection error due to : ", err);
        process.exit(1);
    }
}

module.exports = dbConnection;