const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsFilePath = path.join(__dirname, "contacts.json");

const getAllDataContacts = async () => {
  const contactsArray = await fs.readFile(contactsFilePath);
  return JSON.parse(contactsArray);
};

const listContacts = async () => {
  const data = await getAllDataContacts();
  return data || null;
};

const getContactById = async (contactId) => {
  console.log("contactId", contactId);
  const contactsArray = await getAllDataContacts();
  const [data] = contactsArray.filter((item) => item.id === contactId);
  return data;
};

const removeContact = async (contactId) => {
  const contactsArray = await getAllDataContacts();
  const index = contactsArray.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [result] = contactsArray.splice(index, 1);
  await fs.writeFile(contactsFilePath, JSON.stringify(contactsArray, null, 2));
  return result;
};

const addContact = async (body) => {
  const contactsArray = await getAllDataContacts();
  const newContact = { id: nanoid(), ...body };
  contactsArray.push(newContact);
  await fs.writeFile(contactsFilePath, JSON.stringify(contactsArray, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  console.log("contactId, body", contactId, body);
  const contactsArray = await getAllDataContacts();
  const index = contactsArray.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const updatedContact = { ...contactsArray[index], ...body };
  contactsArray[index] = updatedContact;
  await fs.writeFile(contactsFilePath, JSON.stringify(contactsArray, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
