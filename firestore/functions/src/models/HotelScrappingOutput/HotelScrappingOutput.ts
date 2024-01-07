export interface HotelScrappingOutput {
  checkin_date: string;
  checkout_date: string;
  city_code: string;
  hotel_code: string;
  room_config: string;
  room_base_price: number;
  room_final_price?: number;
  room_tax?: number;
  room_type: string;
  room_type_code: string;
  listing_id?: string;
}
