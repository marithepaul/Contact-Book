const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    // Extract the token from the `Authorization` header.
    const token = req.header('Authorization');
     // If no token is provided, respond with a 401 Unauthorized status.
    if (!token) return res.status(401).send('Access denied.');

    try {
        // Verify the token using the secret key stored in the `.env` file.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the decoded token data 
        req.user = decoded;
        // Pass control to the next middleware or route handler.
        next();
    } catch (error) {
        // If token verification fails, respond with a 400 Bad Request status.
        res.status(400).send('Invalid token.');
    }
};

module.exports = auth;
