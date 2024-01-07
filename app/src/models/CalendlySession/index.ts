export type calendlySessionTypes = "PROGRESS" | "DONE" | "FAILED";

export interface CalendlySession {
  uid: string;
  name?: string;
  id: string;
  createdOn: number;
  status: calendlySessionTypes;
}
