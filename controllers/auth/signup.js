import Joi from "joi";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import User from "../../models/user.js";
import "dotenv/config";
import { HttpError, ctrlWrapper, sendEmail } from "../../helpers/index.js";
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

const { BASE_URL } = process.env;

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
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" 
    target="_blank">Click here to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
