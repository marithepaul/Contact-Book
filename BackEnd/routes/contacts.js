const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsControllers');
const auth = require('../middleware/authentication');

router.post('/', auth, contactsController.createContact);
router.get('/', auth, contactsController.getContacts);
router.put('/:id', auth, contactsController.updateContact);
router.delete('/:id', auth, contactsController.deleteContact);

module.exports = router;
