export interface GeometryObj {
  location: {lat: number; lng: number};
  viewport?: {
    northeast: {lat: number; lng: number};
    southwest: {lat: number; lng: number};
  };
}

export interface GooglePhoto {
  height: number;
  width: number;
  photo_reference: string;
  html_attributes: string[];
}

export type BusinessStatus =
  | 'OPERATIONAL'
  | 'CLOSED_TEMPORARILY'
  | 'CLOSED_PERMANENTLY';

export interface GooglePlacesResult {
  business_status?: BusinessStatus;
  formatted_address?: string;
  geometry?: GeometryObj;
  icon?: string;
  name?: string;
  photos?: GooglePhoto[];
  place_id: string;
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  price_level?: 0 | 1 | 2 | 3 | 4;
  vicinity?: string;
}

export function isGooglePlaceResult(input: any): input is GooglePlacesResult {
  return (input as GooglePlacesResult).place_id !== undefined;
}
