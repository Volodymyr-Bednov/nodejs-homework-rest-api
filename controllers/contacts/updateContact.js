const contacts = require("../../models/contacts");
const { updateValidateSchema } = require("../../schemas/contactsSchema");

const updateContact = async (req, res, next) => {
  try {
    const { error } = updateValidateSchema(req.body);
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
