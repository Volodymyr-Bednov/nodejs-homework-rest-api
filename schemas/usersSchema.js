const Joi = require("joi");

const registrationValidateSchema = (body) => {
  const contactSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return contactSchema.validate(body);
};


module.exports = {
  registrationValidateSchema,
};
