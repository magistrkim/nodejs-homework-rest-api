import express from "express";
import {
  //   contactController,
  getAllCtrl,
  getOneByIdCtrl,
  addNewCtrl,
  updateByIdCtrl,
  removeByIdCtrl,
  updateStatusByIdCtrl,
} from "../../controllers/contacts/index.js";
import { isValidId } from "../../middlewares/index.js";
const contactsRouter = express.Router();

contactsRouter.get("/", getAllCtrl.getAllContacts);

contactsRouter.get("/:id", isValidId, getOneByIdCtrl.getById);

contactsRouter.post("/", addNewCtrl.addNewContact);

contactsRouter.put("/:id", isValidId, updateByIdCtrl.updateContact);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  updateStatusByIdCtrl.updateStatusContact
);

contactsRouter.delete("/:id", isValidId, removeByIdCtrl.deleteContact);

export default contactsRouter;
