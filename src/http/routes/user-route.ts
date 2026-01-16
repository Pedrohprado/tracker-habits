import type { FastifyInstance } from 'fastify';

export async function userRoutes(app: FastifyInstance) {
  app.get('/test', async (req, reply) => {
    reply.send({ message: 'test' });
  });
}
