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
  status: "AVAILABLE" | "BUSY";
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

  // calculate on frontend
  startUnix: number;
  endUnix: number;

  rawString: string; // day, date, start - end label
}
