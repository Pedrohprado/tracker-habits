import { prisma } from '../../lib/prisma';

export class PrismaHabitCompletion {
  async checkIn({
    completionDate,
    habitId,
  }: {
    completionDate: string | Date;
    habitId: string;
  }) {
    return await prisma.habitCompletion.create({
      data: {
        habit_id: habitId,
        completionDate,
      },
    });
  }
}
