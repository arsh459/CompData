import {
  BusinessStatus,
  GeometryObj,
  GooglePhoto,
} from '../GooglePlaceResult/GooglePlaceResult';

export interface AddressComponent {
  types: string[];
  long_name: string;
  short_name: string;
}

export interface PeriodStatus {
  day: number;
  time: string;
}

export interface Period {
  open: PeriodStatus;
  close: PeriodStatus;
}

export interface OpeningHours {
  open_now: boolean;
  periods: Period[];
  weeekday_text: string[];
}

export interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  language: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlaceDetail {
  address_components?: AddressComponent[];
  business_status?: BusinessStatus;
  formatted_address?: string;
  formatted_phone_number?: string;
  geometry?: GeometryObj;
  icon?: string;
  international_phone_number?: string;
  opening_hours?: OpeningHours[];
  photos?: GooglePhoto[];
  place_id: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReview[];
  types?: string[];
  url?: string;
  utc_offset?: string;
  vicinity?: string;
  website?: string;
  name?: string;

  // place detail
  dayList?: number[];
}
