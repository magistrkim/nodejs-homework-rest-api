import Joi from "joi";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import User from "../../models/user.js";
import { HttpError, ctrlWrapper } from "../../helpers/index.js";
import {
  emailSchema,
  passwordSchema,
  subscriptionSchema,
} from "../../schemas/user-schemas.js";

const userAddSignupSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
  subscription: subscriptionSchema,
});

const signup = async (req, res) => {
  const { error } = userAddSignupSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
