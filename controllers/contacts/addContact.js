const joi = require("joi");
const contacts = require("../../models/contacts");

const contactsSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
});

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    const schemaError = error;
    if (schemaError) {
      const error = new Error(schemaError.message);
      error.status = 400;
      throw error;
    }
    const result = await contacts.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
