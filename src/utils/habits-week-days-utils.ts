import { $Enums } from '../../generated/prisma/browser';

export function getWeekDays(days: { weekDay: number }[]): $Enums.WeekDay[] {
  const map: Record<number, $Enums.WeekDay> = {
    0: $Enums.WeekDay.SUNDAY,
    1: $Enums.WeekDay.MONDAY,
    2: $Enums.WeekDay.TUESDAY,
    3: $Enums.WeekDay.WEDNESDAY,
    4: $Enums.WeekDay.THURSDAY,
    5: $Enums.WeekDay.FRIDAY,
    6: $Enums.WeekDay.SATURDAY,
  };

  return days
    .map((day) => map[day.weekDay])
    .filter((day): day is $Enums.WeekDay => day !== undefined);
}
