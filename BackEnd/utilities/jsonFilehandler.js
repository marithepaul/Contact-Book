const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const contactsFilePath = path.join(__dirname, '../data/contacts.json');

const readJSON = (filePath) => {
    try {
        const data = fs.readFileSync(path.resolve(filePath), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON from ${filePath}:`, error.message);
        return []; // Return an empty array if the file is invalid
    }
};
const writeJSON = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

module.exports = { readJSON, writeJSON };
