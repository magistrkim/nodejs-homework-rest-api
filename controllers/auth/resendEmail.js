import { HttpError, ctrlWrapper, sendEmail } from "../../helpers/index.js";
import User from "../../models/user.js";
import Joi from "joi";
import { emailSchema } from "../../schemas/user-schemas.js";
import "dotenv/config";

const { BASE_URL } = process.env;

const userEmailSchema = Joi.object({
  email: emailSchema,
});
const resendEmail = async (req, res) => {
  const { error } = userEmailSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log(email);
  if (!user) {
    throw HttpError(404, "User for resend not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" 
    target="_blank">Click here to verify email</a>`,
  };

  await sendEmail(verifyEmail);
  res.json({
    message: "Email resend",
  });
};

export default {
  resendEmail: ctrlWrapper(resendEmail),
};
