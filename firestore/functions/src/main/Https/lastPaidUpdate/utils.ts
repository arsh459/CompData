export function parseDate(dateStr: string): Date {
  // Split the string into components
  const parts = dateStr.split("/");

  // parts[0] is day, parts[1] is month, parts[2] is year
  // Adjust month (-1 because JavaScript months are 0-indexed)
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10) + 2000; // Adjust for yy to yyyy

  // Create a new Date object
  return new Date(year, month, day);
}
