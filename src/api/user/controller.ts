import { Request, Response } from "express";

import { TUser, userCreationSchema } from "./validation.schemas";
import { UserCrudService } from "./crud";

export class UserController {
  constructor(
    private request: Request,
    private response: Response
  ) { }

  public async authorize() {
    const { error, value } = userCreationSchema.validate(this.request.body)

    if (error) {
      return this.response.status(400).json({ error: error.message, details: error.details });
    }

    try {
      const user = await UserCrudService.getByTelegramId(value.telegramId);

      if (user) {
        return this.response.status(200).json(user);
      }

      const createdUser = await UserCrudService.create(value as TUser);

      return this.response.status(201).json(createdUser)
    } catch (error) {
      return this.response.status(500).json({
        error: 'Unable to create user',
        details: `${error}`
      });
    }
  }
}