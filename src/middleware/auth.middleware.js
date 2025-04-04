const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied.. No token provided "});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // 'user' is a variable that attached to the request object for storing the decoded jwt. We can use any name instead of 'user'.
        next();

    } catch (err) {
        res.status(401).json({ message: " Invalid token "});
    }
}

const adminAuthMiddleware = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only"});
    }

    next();
}

module.exports = {authMiddleware, adminAuthMiddleware};