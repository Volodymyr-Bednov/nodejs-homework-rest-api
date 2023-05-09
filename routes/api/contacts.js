const express = require("express");
const controllers = require("../../controllers/contacts");
const auth = require("../../middelwares/");
const ownerVerification = require("../../middelwares/ownerVerification.js");

const router = express.Router();

router.get("/", auth, controllers.listContacts);

router.get("/:contactId", auth, ownerVerification, controllers.getContactById);

router.post("/", auth, controllers.addContact);

router.delete(
  "/:contactId",
  auth,
  ownerVerification,
  controllers.removeContact
);

router.put("/:contactId", auth, ownerVerification, controllers.updateContact);

router.patch(
  "/:contactId/favorite",
  auth,
  ownerVerification,
  controllers.updateStatusContact
);

module.exports = router;
