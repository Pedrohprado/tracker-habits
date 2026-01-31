import { endOfWeek, startOfWeek } from 'date-fns';
import { prisma } from '../../lib/prisma';
import type { CreateHabitsProps } from '../../services/habit-service';
import {
  jsDayToEnum,
  type JsWeekDay,
} from '../../utils/habits-week-days-utils';

export class PrismaHabitRepository {
  async findHabitsForToday(userId: string, today: Date) {
    return prisma.habit.findMany({
      where: {
        user_id: userId,
        startDate: {
          lte: today,
        },
        OR: [{ endDate: null }, { endDate: { gte: today } }],
        habitWeekDays: {
          some: {
            weekDay: jsDayToEnum(today.getDay() as JsWeekDay),
          },
        },
      },
      include: {
        habitWeekDays: true,
        habitCompletions: {
          where: {
            completedAt: {
              gte: startOfWeek(today, { weekStartsOn: 0 }),
              lte: endOfWeek(today, { weekStartsOn: 0 }),
            },
          },
        },
      },
    });
  }

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
