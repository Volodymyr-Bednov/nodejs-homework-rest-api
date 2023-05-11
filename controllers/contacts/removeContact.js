const contacts = require("../../models/contacts/contacts");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { userId } = req.user;
    const result = await contacts.removeContact(contactId, userId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
