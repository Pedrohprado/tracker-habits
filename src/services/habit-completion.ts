import type { HabitCompletionRepository } from '../repositories/habit-completion-repository';

export class CheckInHabitService {
  constructor(private habitCompletionRepository: HabitCompletionRepository) {}

  async execute({
    completionDate,
    habitId,
  }: {
    completionDate: string | Date;
    habitId: string;
  }) {
    await this.habitCompletionRepository.checkIn({
      completionDate,
      habitId,
    });
  }
}
