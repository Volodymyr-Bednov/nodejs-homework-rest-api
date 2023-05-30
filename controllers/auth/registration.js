const { registrationValidateSchema } = require("../../schemas/usersSchema");
const user = require("../../models/users/users");
const { sendMail } = require("../../helpers");
const { nanoid } = require("nanoid");

const registration = async (req, res, next) => {
  try {
    const { error } = registrationValidateSchema(req.body);
    const schemaError = error;
    if (schemaError) {
      const error = new Error(schemaError.message);
      error.status = 400;
      throw error;
    }
    const verificationToken = nanoid();
    const body = { ...req.body, verificationToken };
    const fullUrl = req.protocol + "://" + req.get("host");

    const result = await user.registrationUser(body);

    await sendMail(body.email, verificationToken, fullUrl);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = registration;
