export interface Lead {
  creatorId?: string;
  leadId: string; // update the same document on each submit

  tripId?: string;
  tripName?: string;

  listingId?: string;
  listingName?: string;

  // personal details
  name: string;
  phone: string;
  email?: string;
  uid?: string; // if user is authenticated
  // location
  circuitName?: string;
  circuitId?: string;
  // travelTheme
  travelTheme?:
    | "mountains"
    | "beaches"
    | "couple"
    | "friends"
    | "somethingElse";
  // dates
  startDate?: string;
  endDate?: string;
  tentativeDuration?: "weekend" | "week" | ">1week";
  tentativeMonths?: month[];
  // travelStyle
  offbeat?: boolean;
  // rangeClassification
  rangeClassification?: "basic" | "premium" | "luxury";
  // guests
  guests?: {
    adults: number;
    children: number;
    infants: number;
  };
  source: "app" | "holidaying-landing" | "influencer-landing";
  createdOn: number;
}
export type month =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";
