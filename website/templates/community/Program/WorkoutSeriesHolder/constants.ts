export type dayString =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface dayObj {
  text: string;
  key: dayString;
  dN: number;
}

export const days: dayObj[] = [
  {
    text: "S",
    key: "sunday",
    dN: 0,
  },
  {
    text: "M",
    key: "monday",
    dN: 1,
  },
  {
    text: "T",
    key: "tuesday",
    dN: 2,
  },
  {
    text: "W",
    key: "wednesday",
    dN: 3,
  },
  {
    text: "T",
    key: "thursday",
    dN: 4,
  },
  {
    text: "F",
    key: "friday",
    dN: 5,
  },
  {
    text: "S",
    key: "saturday",
    dN: 6,
  },
];
