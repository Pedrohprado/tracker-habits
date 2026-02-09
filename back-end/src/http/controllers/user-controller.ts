import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users.repository';
import { CreateUserService } from '../../services/user-service';
import { UserAlreadyExistsError } from '../../services/erros/user-already-exists-error';

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, name, password } = createBodySchema.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const createUserService = new CreateUserService(prismaUsersRepository);

    await createUserService.create({
      email,
      name,
      password,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }
    throw error;
  }
}
