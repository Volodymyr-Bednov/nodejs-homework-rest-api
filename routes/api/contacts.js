const express = require("express");
const controllers = require("../../controllers/contacts");
const auth = require("../../middelwares/");

const router = express.Router();

router.get("/", auth, controllers.listContacts);

router.get("/:contactId", auth, controllers.getContactById);

router.post("/", auth, controllers.addContact);

router.delete("/:contactId", auth, controllers.removeContact);

router.put("/:contactId", auth, controllers.updateContact);

router.patch("/:contactId/favorite", auth, controllers.updateStatusContact);

module.exports = router;
