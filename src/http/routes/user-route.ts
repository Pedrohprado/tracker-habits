import type { FastifyInstance } from 'fastify';
import { create } from '../controllers/user-controller';

export async function userRoutes(app: FastifyInstance) {
  app.post('/', create);
}
