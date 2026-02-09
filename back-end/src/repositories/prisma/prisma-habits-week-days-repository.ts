import type { $Enums } from '../../../generated/prisma/browser';
import { prisma } from '../../lib/prisma';

export class PrismaHabitWeekDaysRepository {
  async create(data: $Enums.WeekDay[], habitId: string) {
    await prisma.habitWeekDay.createMany({
      data: data.map((habit) => ({
        weekDay: habit,
        habit_id: habitId,
      })),
    });
  }
}
