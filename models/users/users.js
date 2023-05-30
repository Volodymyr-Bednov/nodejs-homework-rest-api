const User = require("../../models/users/schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { httpError } = require("../../helpers");

const registrationUser = async (body) => {
  const { password } = body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const url = gravatar.url(body.email);

  try {
    const result = await User.create({
      ...body,
      password: hashedPassword,
      avatarURL: url,
    });
    const { email, subscription } = result;

    return { user: { email, subscription } };
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      throw httpError(409, "Email in use");
    }
  }
};

const loginUser = async (body) => {
  const { email, password } = body;
  const { JWT_SECRET } = process.env;
  const user = await User.findOne({
    email,
    verify: { $eq: true },
    verificationToken: { $regex: "null" },
  });

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

const updateUserAvatar = async (userId, avatarURL) => {
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { avatarURL: avatarURL },
    {
      new: true,
    }
  );
  return result;
};

const logoutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
  return { message: "No Content" };
};

const verifyToken = async (verificationToken) => {
  const result = await User.findOneAndUpdate(
    { verificationToken: verificationToken },
    { verify: true, verificationToken: "null" },
    { new: true }
  );
  if (result === null) {
    throw httpError(404, "User not found");
  }
  console.log("result-2", result);
  return { result };
};

const reVerify = async (email) => {
  const result = await User.findOne({ email, verify: { $eq: false } });
  if (result === null) {
    throw httpError(400, "Verification has already been passed");
  }
  console.log("result-2", result);
  return { result };
};

module.exports = {
  registrationUser,
  loginUser,
  updateUserAvatar,
  logoutUser,
  verifyToken,
  reVerify,
};
