// const { registrationValidateSchema } = require("../../schemas/usersSchema");
const httpError = require("../../helpers/httpError");
const user = require("../../models/users/users");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  if (!_id) {
    next(httpError(401, "Unauthorized"));
  }
  const result = await user.logoutUser(_id);
  res.status(201).json(result);
};

module.exports = logout;
