import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, name, password } = createBodySchema.parse(req.body);
}
