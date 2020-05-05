import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Users from '../entities/Users';

import AppError from '../../../shared/errors/AppError';

import uploadConfig from '../../../config/upload';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<Users> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User must be authenticated to change avatar', 401);
    }

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userFileAvatarExists = await fs.promises.stat(avatarFilePath);

      if (userFileAvatarExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
