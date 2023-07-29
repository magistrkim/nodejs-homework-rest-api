import Joi from "joi";
import Contact from "../../models/contact.js";
import { HttpError, ctrlWrapper } from "../../helpers/index.js";
import {
  nameSchema,
  emailSchema,
  phoneSchema,
  favoriteSchema
} from "../../schemas/validation-schemas.js";

const contactAddSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  favorite: favoriteSchema,
});

const addNewContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

export default {
  addNewContact: ctrlWrapper(addNewContact)
};