const joi = require("joi");
const contacts = require("../../models/contacts");

const contactsSchema = joi.object({
  name: joi.string().min(3),
  email: joi.string().email(),
  phone: joi.number(),
});

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    const schemaError = error;
    if (schemaError) {
      const error = new Error(schemaError.message);
      error.status = 400;
      throw error;
    }

    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
