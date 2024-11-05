const { readJSON, writeJSON } = require('../utils/fileHandler');

const contactsFilePath = 'data/contacts.json';

exports.createContact = async (req, res) => {
    const { name, email, phone, address, notes } = req.body;
    const contacts = await readJSON(contactsFilePath);

    const newContact = { id: Date.now(), userId: req.user.id, name, email, phone, address, notes };
    contacts.push(newContact);
    await writeJSON(contactsFilePath, contacts);

    res.json(newContact);
};

exports.getContacts = async (req, res) => {
    const contacts = await readJSON(contactsFilePath);
    const userContacts = contacts.filter(contact => contact.userId === req.user.id);
    res.json(userContacts);
};

exports.updateContact = async (req, res) => {
    const { name, email, phone, address, notes } = req.body;
    const contacts = await readJSON(contactsFilePath);

    const contactIndex = contacts.findIndex(contact => contact.id === parseInt(req.params.id) && contact.userId === req.user.id);
    if (contactIndex === -1) return res.status(404).send('Contact not found.');

    contacts[contactIndex] = { ...contacts[contactIndex], name, email, phone, address, notes };
    await writeJSON(contactsFilePath, contacts);

    res.json(contacts[contactIndex]);
};

exports.deleteContact = async (req, res) => {
    const contacts = await readJSON(contactsFilePath);
    const updatedContacts = contacts.filter(contact => contact.id !== parseInt(req.params.id) || contact.userId !== req.user.id);

    await writeJSON(contactsFilePath, updatedContacts);
    res.status(204).send();
};

