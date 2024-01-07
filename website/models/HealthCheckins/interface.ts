export interface CheckIn {
  id: string;
  unixStart: number;
  name?: string;
  scheduleType: "COACH" | "USER";
  createdOn: number;
}
