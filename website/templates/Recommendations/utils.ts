import { UserInterface } from "@models/User/User";

export const getTimezone = (user?: UserInterface) => {
  if (
    user?.recommendationConfig?.timezone &&
    user.recommendationConfig.timezone.tzString
  ) {
    return user.recommendationConfig.timezone.tzString;
  }

  return "Asia/Kolkata";
};

export function getUnixTimestamp(timezone: string, dateString: string) {
  // Parse the date string
  const [year, month, day] = dateString.split("-").map(Number);

  // Create a new Date object (this will be in local time)
  const date = new Date(Date.UTC(year, month - 1, day));

  // Use Intl.DateTimeFormat to create a string representation of the date in the specified timezone
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  // The formatted date will be a string in the format "MM/DD/YYYY", so parse it
  const [formattedMonth, formattedDay, formattedYear] = formattedDate
    .split("/")
    .map(Number);

  // Create a new Date object using the formatted date values
  const finalDate = new Date(formattedYear, formattedMonth - 1, formattedDay);

  // Convert the final Date object to a UNIX timestamp and return it
  return Math.floor(finalDate.getTime());
}
