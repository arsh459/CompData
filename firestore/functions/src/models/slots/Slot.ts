import { userSlotStatus } from "../User/User";

export interface SlotCollection {
  id: string;
  slots: SlotObj[];
  day: dayTypes;
}

export interface SlotObj {
  start: string;
  end: string;

  label: timeLabel;
  status: "AVAILABLE" | "BUSY";
  id: string;
}

export type timeLabel = "Morning" | "Evening";

export type dayTypes =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const days: dayTypes[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// slots/slotId/bookings/bookingId
export interface SlotBooking {
  id: string;
  uid: string;

  rawString: string;

  createdOn?: number;
  version?: "calendly";

  // calculate on frontend
  startUnix: number;
  endUnix: number;
  status?: userSlotStatus;
}
