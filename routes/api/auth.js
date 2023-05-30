const express = require("express");
const authController = require("../../controllers/auth");
const { auth, upload } = require("../../middelwares/");
const usersController = require("../../controllers/users");

const router = express.Router();

router.post("/register", authController.registration);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);
router.post("/current", auth, authController.current);

router.patch(
  "/avatars",
  auth,
  upload.single("avatarURL"),
  usersController.updateUserAvatar
);
router.get("/verify/:verificationToken", authController.verifyToken);
router.post("/verify", authController.reVerify);

module.exports = router;
