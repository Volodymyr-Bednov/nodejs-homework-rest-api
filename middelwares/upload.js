const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../tmp");
console.log("tempDir", tempDir);

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    console.log("file", file);
    const { originalname } = file;
    const splitNameArr = originalname.split(".");
    cb(
      null,
      req.user._id.toHexString() + "." + splitNameArr[splitNameArr.length - 1]
    );
  },
});
console.log("storage: ", storage);

const upload = multer({
  storage,
});

module.exports = upload;
