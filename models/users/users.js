const User = require("../../models/users/schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrationUser = async (body) => {
  const { password } = body;
  const salt = await bcrypt.genSalt();

  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await User.create({ ...body, password: hashedPassword });
  const { email, subscription } = result;

  return { user: { email, subscription } };
};

const loginUser = async (body) => {
  const { email, password } = body;
  const { JWT_SECRET } = process.env;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Email or password is wrong");
    error.status = 401;
    throw error;
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    const error = new Error("Email or password is wrong");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

const logoutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
  return { message: "No Content" };
};

module.exports = {
  registrationUser,
  loginUser,
  logoutUser,
};