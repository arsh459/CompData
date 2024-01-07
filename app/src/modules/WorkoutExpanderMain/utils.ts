import { oneDayMS } from "@models/slots/utils";

export const wasTaskDoneToday = (today: number, toCheck?: number) => {
  if (today && toCheck) {
    if (toCheck >= today && toCheck < today + oneDayMS) {
      return true;
    }
  }

  return false;
};
