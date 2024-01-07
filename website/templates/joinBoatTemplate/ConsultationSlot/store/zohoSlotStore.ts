import { create } from "zustand";
import { ZohoSlot, ZohoStore, ZohoStoreValues } from "./interface";
import { fetchAvailableSlots, makeSlotBooking } from "../utils";
import { format } from "date-fns";
import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import { weEventTrack } from "@analytics/webengage/user/userLog";

const defaultSlotDurationInMinutes = 15;
const oneDayMS = 60 * 60 * 24 * 1000;

const intialData: ZohoStoreValues = {
  fetching: true,
  datesArr: [],
  slotDate: undefined,
  slot: undefined,
  // availableSlots: [],
  slotOnDates: {},
  slotDurationInMinutes: defaultSlotDurationInMinutes,
};

export const useZohoSlotStore = create<ZohoStore>((set, get) => ({
  ...intialData,

  initStore: async (todayUnix: number) => {
    set((state) => ({
      ...state,
      fetching: true,
    }));

    const res = await fetchAvailableSlots(todayUnix, todayUnix + 2 * oneDayMS);

    const fetchedSlots: { [date: string]: ZohoSlot[] } = {};
    const availableSlots: ZohoSlot[] = res?.slots || [];
    const slotDurationInMinutes: number =
      res?.slotDurationInMinutes || defaultSlotDurationInMinutes;
    let earliestUnix: number | undefined = res?.earliestUnix;

    for (const availableSlot of availableSlots) {
      const dt = format(new Date(availableSlot.timeStart), "yyyy-MM-dd");

      if (fetchedSlots[dt]) {
        fetchedSlots[dt].push(availableSlot);
      } else {
        fetchedSlots[dt] = [availableSlot];
      }

      if (!earliestUnix) {
        earliestUnix = availableSlot.timeStart;
      }
    }

    const datesArr = [0, 1, 2, 3, 4, 5, 6].map(
      (each) => todayUnix + each * oneDayMS
    );

    set((state) => ({
      ...state,
      datesArr,
      slotDate: earliestUnix
        ? format(new Date(earliestUnix), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      slotOnDates: fetchedSlots,
      slotDurationInMinutes,
      fetching: false,
    }));
  },

  setSlotDate: async (slotDate: string) => {
    const state = get();
    weEventTrack("zohoChangeDate", { slotDate });
    if (state.slotOnDates[slotDate] && state.slotOnDates[slotDate].length) {
      set((state) => ({
        ...state,
        slotDate,
      }));
      return;
    }

    set((state) => ({ ...state, slotDate, fetching: true }));
    const slotStartUnix = new Date(slotDate).getTime();

    const res = await fetchAvailableSlots(
      slotStartUnix,
      slotStartUnix + oneDayMS
    );

    const fetchedSlots = { ...state.slotOnDates };
    const availableSlots: ZohoSlot[] = res?.slots || [];

    for (const availableSlot of availableSlots) {
      const dt = format(new Date(availableSlot.timeStart), "yyyy-MM-dd");
      if (fetchedSlots[dt]) {
        fetchedSlots[dt].push(availableSlot);
      } else {
        fetchedSlots[dt] = [availableSlot];
      }
    }

    const slotDurationInMinutes: number =
      res?.slotDurationInMinutes || defaultSlotDurationInMinutes;

    set((state) => ({
      ...state,
      // availableSlots,
      slotOnDates: fetchedSlots,
      slotDurationInMinutes,
      fetching: false,
    }));
  },

  setSlot: (slot: ZohoSlot) => {
    set((state) => ({ ...state, slot }));
    weEventTrack("zohoSelectTime", { time: slot.timeStart });
  },

  resetStore: () => set((state) => ({ ...state, ...intialData })),

  bookSlot: async (uid: string, category: CategoryTypes) => {
    const { slot } = get();

    if (slot) {
      const appointmentId = await makeSlotBooking(uid, slot, category);
      return appointmentId;
    } else {
      weEventTrack("zohoNoSlotSelected", {});
    }
  },
}));
