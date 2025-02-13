const { registrationValidateSchema } = require("../../schemas/usersSchema");
const user = require("../../models/users/users");

const login = async (req, res, next) => {
  try {
    const { error } = registrationValidateSchema(req.body);
    const schemaError = error;
    if (schemaError) {
      const error = new Error(schemaError.message);
      error.status = 400;
      throw error;
    }
    const result = await user.loginUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = login;
