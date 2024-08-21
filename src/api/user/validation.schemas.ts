import Joi from 'joi';

export type TUser = {
  telegramId: string;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isBot: boolean;
}

export const userCreationSchema = Joi.object({
  telegramId: Joi.string().required(),
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).optional(),
  username: Joi.string().optional(),
  languageCode: Joi.string().optional(),
  isBot: Joi.boolean().required(),
})