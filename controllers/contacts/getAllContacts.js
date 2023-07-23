import Contact from "../../models/contact.js";
import { ctrlWrapper } from "../../helpers/index.js";

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts)
};