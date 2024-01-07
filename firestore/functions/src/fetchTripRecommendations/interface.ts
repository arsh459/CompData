import * as t from 'io-ts';


// type 
export const FetchRecsRequest = t.type({
    tripId: t.string,
    uid: t.string,
});




// interface 
export interface FetchRecsRequestInterface {
    tripId: string,
    uid: string
};