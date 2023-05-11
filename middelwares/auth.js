const jwt = require("jsonwebtoken");
const User = require("../models/users/schema/user");
const httpError = require("../helpers/httpError");

const auth = async (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const { authorization = " " } = req.headers;
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    next(httpError(401, "Not authorize"));
  }

  if (!token) {
    next(httpError(401, "Not authorize"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    // console.log("id", id, "user", user);
    // if (id !== user._id) {next(httpError(401, "Not authorize"))};
    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      next(httpError(401, "Not authorize"));
    }
    next(error);
  }
};

module.exports = auth;
