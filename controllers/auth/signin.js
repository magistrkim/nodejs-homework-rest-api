import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../../models/user.js";
import { HttpError, ctrlWrapper } from "../../helpers/index.js";
import {
  emailSchema,
  passwordSchema,
  subscriptionSchema,
} from "../../schemas/user-schemas.js";

const { JWT_SECRET } = process.env;

const userAddSigninSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
  subscription: subscriptionSchema,
});

const signin = async (req, res) => {
  const { error } = userAddSigninSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export default {
  signin: ctrlWrapper(signin),
};
