export interface CityScrappingObject {
  circuitId: string;
  circuitName: string;
  goibiboCityCode: string;
  maxNumPages: number;
  numWeekendsFromNow: number;
  numWeeksFromNow: number; // will only fetch weekdays for these
}
