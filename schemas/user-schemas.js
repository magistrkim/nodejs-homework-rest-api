import Joi from "joi";
import { emailRegexp, subscriptionList } from "../constants/user-constants.js";

export const emailSchema = Joi.string().pattern(emailRegexp).required();
export const passwordSchema = Joi.string().min(6).required();
export const subscriptionSchema = Joi.string().valid(...subscriptionList);
export const avatarSchema = Joi.string().required();

export const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});
// export const userAvatarSchema = Joi.object({
//   avatarURL: Joi.string()
//     .required(),
// });
