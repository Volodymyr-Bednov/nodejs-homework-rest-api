const contacts = require("../../models/contacts/contacts");
const { updateStatusValidateSchema } = require("../../schemas/contactsSchema");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateStatusValidateSchema(req.body);
    const schemaError = error;
    if (schemaError) {
      const error = new Error("missing field favorite");
      error.status = 400;
      throw error;
    }
    const { userId } = req.user;
    const result = await contacts.updateStatusContact(
      req.params.contactId,
      req.body,
      userId
    );
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

module.exports = updateStatusContact;
