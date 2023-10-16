export function getWeekdayFromDate(dateStr: string) {
  const date = new Date(dateStr);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  return dayOfWeek;
}
