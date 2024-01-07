import { HotelInterface } from "./Hotel";
import { fetchOne } from "../../utils/firestore/fetchOne";

export const getHotelById = async (hotelId: string) => {
  const hotelObj = await fetchOne("hotels", hotelId);
  return hotelObj.data() as HotelInterface;
};
