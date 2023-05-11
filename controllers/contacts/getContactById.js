const contacts = require("../../models/contacts/contacts");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { userId } = req.user;
    const result = await contacts.getContactById(contactId, userId);
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

module.exports = getContactById;
