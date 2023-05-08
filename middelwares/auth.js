const jwt = require("jsonwebtoken");
const User = require("../models/users/schema/user");
const httpError = require("../helpers/httpError");

const auth = async (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const { authorization = " " } = req.headers;
  console.log(authorization.split(" "));
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    console.log('(type !== "Bearer")', type !== "Bearer");
    next(httpError(401, "Not authorize"));
  }

  if (!token) {
    console.log(" (!token)", !token);
    next(httpError(401, "Not authorize"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
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
