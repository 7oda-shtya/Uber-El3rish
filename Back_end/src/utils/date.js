const WEEK_START_DAY = 6; 
const WEEK_START_HOUR = 7;

export function getCurrentWeekStart(referenceDate = new Date()) {
  const d = new Date(referenceDate);
  const currentDay = d.getDay();

  const daysSinceSaturday = (currentDay - WEEK_START_DAY + 7) % 7;
  d.setDate(d.getDate() - daysSinceSaturday);
  d.setHours(WEEK_START_HOUR, 0, 0, 0);

  if (referenceDate < d) {
    d.setDate(d.getDate() - 7);
  }

  return d;
}

export function getCurrentWeekEnd(referenceDate = new Date()) {
  const start = getCurrentWeekStart(referenceDate);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  end.setMilliseconds(end.getMilliseconds() - 1);
  return end;
}