import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";

export interface ZohoSlot {
  timeStart: number;
  staff_id: string;
}
export interface AvailabilityResponse {
  slots: ZohoSlot[];
  slotDurationInMinutes: number;
  earliestUnix?: number;
}

export interface ZohoStoreValues {
  fetching: boolean;
  datesArr?: number[];
  slotDate?: string; // number;
  slot?: ZohoSlot;
  // availableSlots: ZohoSlot[];
  slotOnDates: { [date: string]: ZohoSlot[] };
  slotDurationInMinutes: number;
}

export interface ZohoStore extends ZohoStoreValues {
  setSlotDate: (val: string) => void;
  setSlot: (val: ZohoSlot) => void;
  initStore: (todayUnix: number) => void;
  resetStore: () => void;
  bookSlot: (
    uid: string,
    category: CategoryTypes
  ) => Promise<string | undefined>;
}
