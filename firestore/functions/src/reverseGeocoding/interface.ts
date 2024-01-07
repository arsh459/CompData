import * as t from 'io-ts';

export const RevRequest = t.type({
    listingIds: t.array(t.string),
});


export interface RevRequestInterface {
    listingIds: string[]
}

export interface RevGoogleResponseInterface {
    results: revResult[],
    status?: string,
    error_message?: string,
}

interface revResult {
    address_components: addressComponent[],
    formatted_address: string,   
}

interface addressComponent {
    long_name: string,
    short_name?: string,
    types: string[],
}

export interface remoteObjInterface {
    formattedAddress: string,
    hyperlocation: string,
}