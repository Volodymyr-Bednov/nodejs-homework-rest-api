const express = require("express");
const usersController = require("../../controllers/users");
const { auth, upload } = require("../../middelwares/");

const router = express.Router();

router.patch(
  "/avatars",
  auth,
  upload.single("image"),
  usersController.updateUserAvatar
);

module.exports = router;
