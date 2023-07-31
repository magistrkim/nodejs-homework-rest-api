import Joi from "joi";

export const nameSchema = Joi.string()
  .pattern(/^[\p{L}A-Za-z\s'-]+$/u)
  .min(2)
  .required();
export const emailSchema = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  .required();

export const phoneSchema = Joi.string()
  .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
  .required();

export const favoriteSchema = Joi.boolean().required();

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
