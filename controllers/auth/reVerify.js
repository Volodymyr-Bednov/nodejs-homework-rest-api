const { sendMail } = require("../../helpers");

const user = require("../../models/users/users");

const reVerify = async (req, res, next) => {
  const { email } = req.body;
  const fullUrl = req.protocol + "://" + req.get("host");

  try {
    const { result } = await user.reVerify(email);
    await sendMail(email, result.verificationToken, fullUrl);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = reVerify;
