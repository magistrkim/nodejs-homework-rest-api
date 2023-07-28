import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

export const emailSchema = Joi.string().pattern(emailRegexp).required();
export const passwordSchema = Joi.string().min(6).required();



