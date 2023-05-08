const contacts = require("../../models/contacts/contacts");

const listContacts = async (req, res, next) => {
  try {
        const { _id: owner } = req.user;
 
    const result = await contacts.listContacts({owner});
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
