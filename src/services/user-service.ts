import type { Prisma } from '../../generated/prisma/client';
import type { UsersRepository } from '../repositories/users-repository';

export class CreateService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async create({});
}
