export function addXDays(unixTimestamp: number, x: number): number {
  // Create a new date object from the Unix timestamp
  const date = new Date(unixTimestamp);

  // Add 1 day
  date.setDate(date.getDate() + x);

  // Return the updated Unix timestamp
  return date.getTime();
}
