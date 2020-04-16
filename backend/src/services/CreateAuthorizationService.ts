import { getRepository } from 'typeorm';
import Users from '../models/Users';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

class CreateAuthorizationService {
  public async execute({email, password}: Request): Promise<Response> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({
      where: {email}
    });

    if(!user) {
      throw new Error('E-mail or password incorrect');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new Error('E-mail or password incorrect');
    }

    const token = sign({}, 'eefecd96cd225ac16316618680cdfbdc', {
      subject: user.id,
      expiresIn: '1d'
    });

    return { user, token };
  }
}

export default CreateAuthorizationService;