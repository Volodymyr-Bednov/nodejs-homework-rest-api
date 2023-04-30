const Book = require("../../models/contacts/schema/contact");

const listContacts = async () => {
  const data = await Book.find();
  return data || null;
};

const getContactById = async (contactId) => {
  const result = await Book.findOne({ _id: contactId });
  return result;
};

const removeContact = async (contactId) => {
  const result = await Book.findOneAndRemove({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const result = await Book.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Book.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return result;
};
const updateStatusContact = async (contactId, body) => {
  const result = await Book.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return result;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
