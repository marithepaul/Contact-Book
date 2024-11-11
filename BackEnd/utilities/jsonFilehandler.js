const fs = require('fs');
const path = require('path');

const readJSON = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '..', filePath), 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data));
        });
    });
};

const writeJSON = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, '..', filePath), JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

module.exports = { readJSON, writeJSON };

