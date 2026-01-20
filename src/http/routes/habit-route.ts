import type { FastifyInstance } from 'fastify';
import { checkin, create } from '../controllers/habit-controller';

export async function habitRoutes(app: FastifyInstance) {
  app.post('/', create);
  app.post('/checkin/:habitId', checkin);
}
