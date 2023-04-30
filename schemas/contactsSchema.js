const Joi = require("joi");

const addValidateSchema = (body) => {
  const contactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  return contactSchema.validate(body);
};

const updateValidateSchema = (body) => {
  const contactSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  });
  return contactSchema.validate(body);
};
const updateStatusValidateSchema = (body) => {
  const contactSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  return contactSchema.validate(body);
};

module.exports = {
  addValidateSchema,
  updateValidateSchema,
  updateStatusValidateSchema,
};
