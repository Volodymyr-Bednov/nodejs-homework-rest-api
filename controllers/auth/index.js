const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateUserAvatar = require("../users/updateUserAvatar");
const verifyToken = require("./verifyToken");
const reVerify = require("./reVerify");

module.exports = {
  registration,
  login,
  logout,
  current,
  updateUserAvatar,
  verifyToken,
  reVerify,
};
