import type { UsersRepository } from '../repositories/users-repository';
import bcrypt from 'bcryptjs';

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}
export class CreateService {
  constructor(private usersRepository: UsersRepository) {}

  async create({ email, name, password }: CreateUserProps) {
    await this.usersRepository.create({ email, name, password });
  }
}
