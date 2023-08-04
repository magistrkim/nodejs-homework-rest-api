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
import { isValidId, authenticate, upload } from "../../middlewares/index.js";
const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getAllCtrl.getAllContacts);

contactsRouter.get("/:id", isValidId, getOneByIdCtrl.getById);

// upload.array("avatar", 5);  upload.fields([{name: "avatar", maxCount: 4},{name: "poster", maxCount: 2}])
contactsRouter.post("/", upload.single("avatar"), addNewCtrl.addNewContact);

contactsRouter.put("/:id", isValidId, updateByIdCtrl.updateContact);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  updateStatusByIdCtrl.updateStatusContact
);

contactsRouter.delete("/:id", isValidId, removeByIdCtrl.deleteContact);

export default contactsRouter;
