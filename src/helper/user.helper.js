const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

 function generateToken(registerDetails) {
    return jwt.sign({email: registerDetails.email, id: registerDetails._id, isAdmin: registerDetails.isAdmin}, process.env.JWT_SECRET, { expiresIn: "30m"})
}

 async function passwordHash(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

async function compareHash(password, passwordFromDb) {
    const isMatch = await bcrypt.compare(password, passwordFromDb);
    if (!isMatch) {
        throw new Error(" password doesn't match");
    }
    return true;
}

module.exports = { generateToken, passwordHash, compareHash};