import type { $Enums } from '../../generated/prisma/browser';
import type { HabitWeekRepository } from '../repositories/habit-week-repository';
import type { HabitsRepository } from '../repositories/habits-repository';

import { getWeekDays } from '../utils/habits-week-days-utils';

export interface CreateHabitsProps {
  habit: {
    name: string;
    description: string | null;
    startDate: Date | string;
    endDate: Date | string | null;
  };
  userId: string;
  habitWeekList: {
    weekDay: number;
  }[];
}

export class CreateHabitService {
  constructor(
    private habitsRepository: HabitsRepository,
    private habitWeekDaysRepository: HabitWeekRepository,
  ) {}

  async execute({ habit, habitWeekList, userId }: CreateHabitsProps) {
    const createHabit = await this.habitsRepository.create({ habit, userId });

    const weekDay = getWeekDays(habitWeekList);

    await this.habitWeekDaysRepository.create(weekDay, createHabit.id);
  }
}
