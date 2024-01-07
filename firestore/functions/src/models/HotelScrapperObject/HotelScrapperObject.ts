export interface HotelScrapperObject {
  listingId: string;
  listingName: string;
  cityCode: string;
  hotelCode: string; // city scrapper
  hotelHmdCode: string; // city scrapper
  numWeekendsFromNow: number;
  numWeeksFromNow: number; // will only fetch weekdays for these

  giHotelName: string;
}
