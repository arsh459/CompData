import * as t from 'io-ts';

// type 
export const Hotel = t.type({
    circuitId: t.string,
    hotelName: t.string,
    lat: t.number,
    lng: t.number,
    hotelId: t.string,
    images: t.array(t.string),
    type: t.string,
});



// interfaces 
export interface HotelInterface {
    circuitId: string,
    hotelName: string,
    lat: number,
    lng: number,
    hotelId: string, 
    images: string[],
    type: string,
};
