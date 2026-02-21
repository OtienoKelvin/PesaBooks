const jwt = require("jsonwebtoken");
const db = require("../config/db");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json("Authorization header missing or malformed");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json("Database error");
            }

            if (results.length === 0) {
                return res.status(401).json("User not found");
            }

            req.user = results[0];
            next();
        });
    } catch (err) {
        console.error(err);
        return res.status(401).json("Invalid token");
    }
}