import { prisma } from '../../lib/prisma';
import type { CreateHabitsProps } from '../../services/habit-service';

export class PrismaHabitRepository {
  async create({ habit, userId }: CreateHabitsProps) {
    return await prisma.habit.create({
      data: {
        name: habit.name,
        description: habit.description,
        startDate: new Date(habit.startDate),
        endDate: habit.endDate ? new Date(habit.endDate) : null,
        user_id: userId,
      },
    });
  }
}
