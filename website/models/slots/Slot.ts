import { userSlotStatus } from "@models/User/User";

export interface SlotCollection {
  id: string;
  slots: SlotObj[];
  day: dayTypes;
}

export interface SlotObj {
  start: string;
  end: string;

  id: string;

  label: timeLabel;
  status: slotStatus;
}

export type timeLabel = "Morning" | "Evening";
export type slotStatus = "AVAILABLE" | "BUSY";

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
  slotId?: string;
  status?: userSlotStatus;
  link?: string;
  phone?: string;

  // calculate on frontend
  startUnix: number;
  createdOn?: number;
  version?: "calendly";
  endUnix: number;
}
