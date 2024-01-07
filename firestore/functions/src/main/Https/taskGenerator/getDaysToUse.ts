export const getDaysToUse = (
  start: number,
  days: number,
  recreate?: boolean,
) => {
  const now = Date.now();
  const daysToNow = (now - start) / (24 * 60 * 60 * 1000);
  let daysToUse = days;
  if (!recreate) {
    daysToUse = days;
  } else if (days - 1 > daysToNow) {
    daysToUse = days;
  } else {
    daysToUse = Math.ceil(daysToNow) + 5;
  }

  console.log("days", days, daysToNow, daysToUse);

  return daysToUse;
};
