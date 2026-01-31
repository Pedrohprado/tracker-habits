import type { Habit, Prisma } from '../../generated/prisma/client';
import type { CreateHabitsProps } from '../services/habit-service';

type CreateHabitProp = Omit<CreateHabitsProps, 'habitWeekList'>;

export type HabitWithWeekDaysAndCompletions = Prisma.HabitGetPayload<{
  include: {
    habitWeekDays: true;
    habitCompletions: true;
  };
}>;

export interface HabitsRepository {
  create({ habit, userId }: CreateHabitProp): Promise<Habit>;
  findHabitsForToday(
    userId: string,
    today: Date,
  ): Promise<HabitWithWeekDaysAndCompletions[]>;
}
