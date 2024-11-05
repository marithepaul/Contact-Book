const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { readJSON, writeJSON } = require('../utils/fileHandler');
require('dotenv').config();

const usersFilePath = 'data/users.json';

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const users = await readJSON(usersFilePath);

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), username, email, passwordHash: hashedPassword };
    users.push(newUser);
    await writeJSON(usersFilePath, users);

    res.json(newUser);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const users = await readJSON(usersFilePath);

    const user = users.find(user => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

