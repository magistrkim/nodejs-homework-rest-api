import Joi from "joi";
import Contact from "../../models/contact.js";
import { HttpError, ctrlWrapper } from "../../helpers/index.js";
import {
  nameSchema,
  emailSchema,
  phoneSchema,
  favoriteSchema,
} from "../../schemas/validation-schemas.js";

const contactAddSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  favorite: favoriteSchema,
});

const updateContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
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
  updateContact: ctrlWrapper(updateContact)
};