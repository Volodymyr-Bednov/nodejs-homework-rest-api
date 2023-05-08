const express = require("express");
const authController = require("../../controllers/auth");
const auth = require("../../middelwares/");

const router = express.Router();

router.post("/register", authController.registration);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);
router.post("/current", auth, authController.current);

module.exports = router;
