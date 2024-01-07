import { eventTypes } from "@models/Event/Event";

export const programTypes: ProgramType[] = [
  {
    value: "challenge",
    heading: "Challenge",
    helperText: "A Gamified learning experience",
  },
  {
    value: "course",
    heading: "Course",
    helperText: "A timed course for a cohort of students",
  },
];

interface ProgramType {
  value: eventTypes;
  heading: string;
  helperText: string;
}
