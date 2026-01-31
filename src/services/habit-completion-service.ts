import { startOfDay } from 'date-fns';
import type { HabitCompletionRepository } from '../repositories/habit-completion-repository';

export class CheckInHabitService {
  constructor(private habitCompletionRepository: HabitCompletionRepository) {}

  async execute({ habitId }: { habitId: string }) {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const completionDate = `${year}-${month}-${day}`;
    console.log(completionDate);

    await this.habitCompletionRepository.checkIn({
      habitId,
      completionDate,
    });
  }
}
