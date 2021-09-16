export function getBeginningOfDay(startDate: string) : Date {
  const date: string[] = startDate.split('-');
  const month: number = parseInt(date[0]) - 1;
  const day: number = parseInt(date[1]);
  const year: number = parseInt(date[2]);
  const beginningOfDay: Date = new Date();
  beginningOfDay.setUTCFullYear(year);
  beginningOfDay.setUTCMonth(month);
  beginningOfDay.setUTCDate(day);
  beginningOfDay.setUTCHours(0, 0, 0);
  return beginningOfDay;
}

export function getEndOfDay(startDate: string) : Date {
  const date: string[] = startDate.split('-');
  const month: number = parseInt(date[0]) - 1;
  const day: number = parseInt(date[1]);
  const year: number = parseInt(date[2]);
  const endOfDay: Date = new Date();
  endOfDay.setUTCFullYear(year);
  endOfDay.setUTCMonth(month);
  endOfDay.setUTCDate(day);
  endOfDay.setUTCHours(23, 59, 0);
  return endOfDay;
}