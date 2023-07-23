import Contact from "../../models/contact.js";
import { HttpError, ctrlWrapper } from "../../helpers/index.js";

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

export default {
  deleteContact: ctrlWrapper(deleteContact)
};