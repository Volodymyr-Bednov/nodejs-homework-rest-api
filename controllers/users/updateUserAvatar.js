const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");

const user = require("../../models/users/users");

const updateUserAvatar = async (req, res, next) => {
  const { filename } = req.file;
  console.log("filename", filename);
  const { path: tmpPath } = req.file;
  const publicPath = path.join(__dirname, "../../public/avatars", filename);
  try {
    const image = await jimp.read(tmpPath);
    image.resize(250, 250);
    await image.writeAsync(tmpPath);
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
  const userId = req.user._id;
  await user.updateUserAvatar(userId, publicPath);

  res.status(200).json({ avatarURL: publicPath });
};

module.exports = updateUserAvatar;
