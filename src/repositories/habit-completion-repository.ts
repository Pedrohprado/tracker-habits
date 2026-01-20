import type { HabitCompletion } from '../../generated/prisma/client';

export interface HabitCompletionRepository {
  checkIn({
    completionDate,
    habitId,
  }: {
    completionDate: string | Date;
    habitId: string;
  }): Promise<HabitCompletion>;
}
