import type { FastifyInstance } from 'fastify';
import {
  checkin,
  create,
  getHabitsForToday,
} from '../controllers/habit-controller';

export async function habitRoutes(app: FastifyInstance) {
  app.post('/', create);
  app.get('/', getHabitsForToday);
  app.post('/checkin/:habitId', checkin);
}
