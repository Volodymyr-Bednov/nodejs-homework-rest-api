const contacts = require("../../models/contacts/contacts");
const { addValidateSchema } = require("../../schemas/contactsSchema");

const addContact = async (req, res, next) => {
  try {
    const { error } = addValidateSchema(req.body);
    const schemaError = error;
    if (schemaError) {
      const error = new Error(schemaError.message);
      error.status = 400;
      throw error;
    }
    const { _id: owner } = req.user;
    const result = await contacts.addContact({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
