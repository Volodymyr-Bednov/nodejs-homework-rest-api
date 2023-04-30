const express = require("express");
const controllers = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put("/:contactId", controllers.updateContact);

router.patch("/:contactId/favorite", controllers.updateStatusContact);

module.exports = router;
