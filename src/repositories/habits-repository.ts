import type { Habit, Prisma } from '../../generated/prisma/client';
import type { CreateHabitsProps } from '../services/habit-service';

type CreateHabitProp = Omit<CreateHabitsProps, 'habitWeekList'>;

export interface HabitsRepository {
  create({ habit, userId }: CreateHabitProp): Promise<Habit>;
}
