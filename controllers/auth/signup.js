import Joi from "joi";
import User from "../../models/user.js";
import { HttpError, ctrlWrapper } from "../../helpers/index.js";
import { emailSchema, passwordSchema } from "../../schemas/user-schemas.js";

const userAddSignupSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const userAddSigninSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const signup = async (req, res) => {
  const { error } = userAddSignupSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    email: newUser.email,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
