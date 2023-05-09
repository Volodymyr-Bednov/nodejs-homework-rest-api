const httpError = require("../helpers/httpError");
const Contact = require("../models/contacts/schema/contact");

const ownerVerification = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const { owner } = await Contact.findOne({ _id: contactId });

  if (userId.toHexString() !== owner.toHexString()) {
    next(httpError(401, "Not authorize"));
  }
  next();
};

module.exports = ownerVerification;
