import User from "~/database/models/User";
import { TUser } from "./validation.schemas";

export class UserCrudService {

  static async create(data: TUser): Promise<User> {
    try {
      const user = await User.create(data);

      return user;
    } catch (error) {
      console.error(`[UserCrudService:create] Unable to create user: ${error}`);

      throw new Error(`Unable to create user. ${error}`);
    }
  }

  static async getByTelegramId(telegramId: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { telegramId } });

      return user;
    } catch (error) {
      console.error(`[UserCrudService:getByTelegramId] Unable to get user by telegramId: ${error}`);

      throw new Error(`Unable to get user by telegramId. ${error}`);
    }
  }
}
