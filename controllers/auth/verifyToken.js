const user = require("../../models/users/users");

const verifyToken = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    await user.verifyToken(verificationToken);
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
