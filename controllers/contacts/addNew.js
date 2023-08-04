import Joi from "joi";
import fs from "fs/promises";
import path from "path";
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

const avatarPath = path.resolve("public", "avatars");

const addNewContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  const result = await Contact.create({ ...req.body, avatar, owner });
  res.status(201).json(result);
};

export default {
  addNewContact: ctrlWrapper(addNewContact),
};
