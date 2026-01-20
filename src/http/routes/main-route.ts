import type { FastifyInstance } from 'fastify';
import { userRoutes } from './user-route.js';
import { habitRoutes } from './habit-route.js';

export async function mainRoutes(app: FastifyInstance) {
  app.register(userRoutes, {
    prefix: '/users',
  });
  app.register(habitRoutes, {
    prefix: '/habits',
  });
}
