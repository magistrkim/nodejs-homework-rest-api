import Contact from "../../models/contact.js";
import { HttpError, ctrlWrapper } from "../../helpers/index.js";
import { contactUpdateFavoriteSchema } from "../../helpers/validation-schemas.js";

const updateStatusContact = async (req, res) => {
  const { error } = contactUpdateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
    // runValidators: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

export default {
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
