import * as t from 'io-ts';

export const RequestInterface = t.type({
    fieldNames: t.array(t.string),
    listingIds: t.array(t.string),
    override: t.boolean,
});

export type RequestType = t.TypeOf<typeof RequestInterface>;

const Location = t.type({
    lat: t.number,
    lng: t.number
})

export const Geometry = t.type({
    location: Location
});

export const Photo = t.type({
    photo_reference: t.string,
    height: t.number,
    width: t.number,
})

export const IndividualPlacesResponse = t.type({
    rating: t.union([t.number, t.undefined]),
    photos: t.union([t.array(Photo), t.undefined]),
    user_ratings_total: t.union([t.number, t.undefined]),
    price_level: t.union([t.string, t.undefined]),
    geometry:  t.union([Geometry, t.undefined]),
    formatted_address: t.union([t.string, t.undefined]),
    place_id: t.string,
})


export const GooglePlacesResponse = t.type({
    candidates: t.array(
        IndividualPlacesResponse
    )
});

export type GooglePlacesType = t.TypeOf<typeof GooglePlacesResponse>;
export type IndividualPlacesResponseType = t.TypeOf<typeof IndividualPlacesResponse>;

