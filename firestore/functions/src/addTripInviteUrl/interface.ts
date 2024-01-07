import * as t from "io-ts";

// type
const TripInviteUrlMandatory = t.type({
  tripId: t.string,
  circuitId: t.string,
  access_code: t.string,
});

const TripInviteUrlPartial = t.partial({
  uid: t.string,
});

export const TripInviteUrl = t.intersection([
  TripInviteUrlMandatory,
  TripInviteUrlPartial,
]);

// interface
export interface TripInviteUrlInterface {
  tripId: string;
  circuitId: string;
  access_code: string;
  uid?: string;
}
