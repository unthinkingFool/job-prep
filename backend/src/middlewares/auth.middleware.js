const jwt = require("jsonwebtoken");
const { pool } = require("../db/db");

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        });
    }

    try {
        // Check if token is blacklisted
        const result = await pool.query(
            "SELECT * FROM blacklisted_tokens WHERE token = $1",
            [token]
        );

        if (result.rows.length > 0) {
            return res.status(401).json({
                message: "Token has been blacklisted. Please login again."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    authMiddleware
};