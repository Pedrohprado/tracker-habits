import type { UsersRepository } from '../repositories/users-repository';
import bcrypt from 'bcryptjs';
import { UserAlreadyExistsError } from './erros/user-already-exists-error';

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async create({ email, name, password }: CreateUserProps) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    //409 conflito - usuário com esse email já dastrado
    if (userWithSameEmail) throw new UserAlreadyExistsError();

    const password_hash = await bcrypt.hash(password, 6);

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    });

    return {
      user,
    };
  }
}
