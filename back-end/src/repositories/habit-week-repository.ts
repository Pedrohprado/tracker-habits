export interface HabitWeekRepository {
  create(data: string[], habitId: string): Promise<void>;
}
