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

export type JsWeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const WEEK_DAY_MAP: Record<JsWeekDay, $Enums.WeekDay> = {
  0: $Enums.WeekDay.SUNDAY,
  1: $Enums.WeekDay.MONDAY,
  2: $Enums.WeekDay.TUESDAY,
  3: $Enums.WeekDay.WEDNESDAY,
  4: $Enums.WeekDay.THURSDAY,
  5: $Enums.WeekDay.FRIDAY,
  6: $Enums.WeekDay.SATURDAY,
};

export function jsDayToEnum(day: JsWeekDay): $Enums.WeekDay {
  return WEEK_DAY_MAP[day];
}
