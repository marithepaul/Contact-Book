// express is used to create an API server
const express = require('express');
// fs is used to read and write the contacts.json file to manage the data
const fs = require('fs');
// express.Router() is used to define the routes to the contacts
const router = express.Router();
// filePath is used to store the location of the contacts.json file
const filePath = '.data/contacts.json';

// Function to get contacts from the JSON file
const getContacts = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};


