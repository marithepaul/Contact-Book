const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { readJSON, writeJSON } = require('../utilities/fileHandler');
require('dotenv').config();


const usersFilePath = './data/users.json';

exports.register = async (req, res) => {
    try {
        const { id, username, email, password } = req.body;

        // Read users from JSON file
        const users = await readJSON(usersFilePath);

        // Ensure users is an array
        if (!Array.isArray(users)) {
            return res.status(500).json({ message: 'Internal Server Error: Invalid users data' });
        }

        // Check if the user already exists
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = { id, username, email, password: hashedPassword };
        users.push(newUser);

        // Write updated users back to JSON file
        await writeJSON(usersFilePath, users);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const users = await readJSON(usersFilePath);

    // Find user with the matching email.
    const user = users.find(user => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token for the authenticated user.
    // Payload: user ID for identifying user, Secret key for signing token, Token expiration time (1 hour).
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
