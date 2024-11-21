const { readJSON, writeJSON } = require('../utilities/fileHandler');

const contactsFilePath = 'data/contacts.json';

exports.createContact = async (req, res) => {
    // Extract contact details from the request body.
    const { name, email, phone, address, notes } = req.body;
    // Read existing contacts from JSON file.
    const contacts = await readJSON(contactsFilePath);

    // Generate a unique ID using the current timestamp.
    // Assign contact data with current user.
    const newContact = { id: Date.now(), userId: req.user.id, name, email, phone, address, notes };
    // Add the new contact to the list.
    contacts.push(newContact);
    // Save updated contacts list.
    await writeJSON(contactsFilePath, contacts);
    
    // Respond with newly created contact.
    res.json(newContact);
};

exports.getContacts = async (req, res) => {
    // Read contacts from the JSON file.
    const contacts = await readJSON(contactsFilePath);
    // Filter contacts by current user's ID.
    const userContacts = contacts.filter(contact => contact.userId === req.user.id);
    // Respond with user's contacts.
    res.json(userContacts);
};

exports.updateContact = async (req, res) => {
    // Extract updated data from request body.
    const { name, email, phone, address, notes } = req.body;
    // Read the contacts from JSON file.
    const contacts = await readJSON(contactsFilePath);
    
    // Find contact by its ID and ensure it belongs to the user
    const contactIndex = contacts.findIndex(contact => contact.id === parseInt(req.params.id) && contact.userId === req.user.id);
    if (contactIndex === -1) return res.status(404).send('Contact not found.');

    // Update the contact's details.
    contacts[contactIndex] = { ...contacts[contactIndex], name, email, phone, address, notes };
    // Save the updated contacts list.
    await writeJSON(contactsFilePath, contacts);

    // Respond with updated contact.
    res.json(contacts[contactIndex]);
};

exports.deleteContact = async (req, res) => {
    const contacts = await readJSON(contactsFilePath);
    // Keep contacts whose ID does not match the one being deleted.
    // Ensure only the current user's contacts are checked.
    const updatedContacts = contacts.filter(contact => contact.id !== parseInt(req.params.id) || contact.userId !== req.user.id);

    await writeJSON(contactsFilePath, updatedContacts);
    res.status(204).send();
};

    await writeJSON(contactsFilePath, updatedContacts);
    res.status(204).send();
};

