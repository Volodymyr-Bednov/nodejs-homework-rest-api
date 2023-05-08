const Contact = require("../../models/contacts/schema/contact");

const listContacts = async (owner) => {
  const data = await Contact.find(owner).populate("owner", "email");
  return data || null;
};

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return result;
};
const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
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
