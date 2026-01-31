import { addDays, getDay, isSameDay, startOfDay, startOfWeek } from 'date-fns';
import type { $Enums, WeekDay } from '../../generated/prisma/browser';
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

export class GetHabitsForToday {
  constructor(private habitsRepository: HabitsRepository) {}

  async execute({ userId }: { userId: string }) {
    const today = new Date();

    const habits = await this.habitsRepository.findHabitsForToday(
      userId,
      today,
    );

    return habits.map((habit) => {
      const weekDaysEnabled = habit.habitWeekDays.map((w) => w.weekDay);
      console.log(weekDaysEnabled);
      const completedDays = habit.habitCompletions.map(
        (c) => new Date(c.completionDate).getDay() + 1,
      );
      console.log(completedDays);

      console.log(today.getDay());

      const total = weekDaysEnabled.length;
      const completed = completedDays.length;

      const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

      const todayDone = habit.habitCompletions.some((c) =>
        new Date(c.completionDate).getDay() + 1 === today.getDay()
          ? true
          : false,
      );

      // const validEnabledDay = today.getDate() >= habit.createdAt.getDate();
      // console.log(validEnabledDay);
      const startWeek = startOfWeek(today);
      const week = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
      ].map((day, index) => {
        const dateOfThisDay = startOfDay(addDays(startWeek, index));
        const createdAtDay = startOfDay(new Date(habit.createdAt));

        const validEnabledDay = dateOfThisDay >= createdAtDay;
        return {
          day,
          enabled:
            weekDaysEnabled.includes(day as $Enums.WeekDay) && validEnabledDay,
          done: completedDays.includes(index),
        };
      });

      return {
        id: habit.id,
        name: habit.name,
        description: habit.description,
        createdAt: habit.createdAt,
        week,
        progress: {
          completed,
          total,
          percent,
        },
        todayDone,
      };
    });
  }
}
