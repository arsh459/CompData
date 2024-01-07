import {GooglePlacesType, IndividualPlacesResponseType} from './interface';
import * as admin from 'firebase-admin';

export const parsePlacesResult = (response: GooglePlacesType, listingObj: any, override: boolean) => {

    const results = response['candidates'][0];

    return {
        rating: getRating(results),
        num_reviews: getUserRatingTotal(results),
        // googlePhotos: getPhotos(results),
        googleResponseUpdatedOn: admin.firestore.FieldValue.serverTimestamp(),
        lat: override ? getLat(results) : !override && listingObj.lat === 0 ? getLat(results) : listingObj.lat,
        lng: override ? getLng(results) : !override && listingObj.lng === 0 ? getLng(results) : listingObj.lng,
        placeId: getPlaceId(results),
    }
};

export const parseDetailResponse = (response: any, placeResponse: any) => {

    const result = response['result'];
    return {
        ...placeResponse, 
        googlePhotos: parseDetailPhotos(result)
    }
};


const getRating = (results: IndividualPlacesResponseType) => {
    if ('rating' in results){
        return results.rating
    }
    return 0
};

const getUserRatingTotal = (results: IndividualPlacesResponseType) => {
    if ('user_ratings_total' in results){
        return results.user_ratings_total
    }
    return 0
};

/*
const getPhotos = (results: IndividualPlacesResponseType) => {
    if ('photos' in results){
        return results.photos
    }
    return []
};
*/

const getLat = (results: IndividualPlacesResponseType) => {
    if ('geometry' in results){
        return results.geometry?.location.lat
    }
    return 0
};

const getLng = (results: IndividualPlacesResponseType) => {
    if ('geometry' in results){
        return results.geometry?.location.lng
    }
    return 0
};


const getPlaceId = (results: IndividualPlacesResponseType) => {
    if ('place_id' in results){
        return results.place_id
    }
    else {
        return ''
    }
};


const parseDetailPhotos = (result: any) => {
    if ('photos' in result){
        return result['photos']
    } else {
        return []
    }
}