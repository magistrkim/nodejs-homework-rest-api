import express from "express";
import {contactController} from "../../controllers/contacts/index.js";
import { isValidId } from "../../middlewares/index.js";
const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAllContacts);

contactsRouter.get("/:id", isValidId, contactController.getById);

contactsRouter.post("/", contactController.addNewContact);

contactsRouter.put("/:id", isValidId, contactController.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, contactController.updateStatusContact);

contactsRouter.delete("/:id", isValidId, contactController.deleteContact);

export default contactsRouter;
