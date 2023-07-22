import express from "express";
import ctrl from "../../controllers/contacts-controllers.js";
import { isValidId } from "../../middlewares/index.js";
const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getById);

contactsRouter.post("/", ctrl.addNewContact);

contactsRouter.put("/:id", isValidId, ctrl.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, ctrl.updateStatusContact);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

export default contactsRouter;
