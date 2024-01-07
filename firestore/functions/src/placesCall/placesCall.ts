import axios from 'axios';
import {googlePlacesURL, googlePlaceDetailURL} from '../constants/urls/urls';
import {PLACES_KEY} from '../constants/keys/googleKeys';
import {parsePlacesResult, parseDetailResponse} from './parsePlacesCall';
import {updateOne, fetchOne} from '../utils/firestore/fetchOne';
import {RequestInterface, GooglePlacesResponse} from './interface';
import * as t from 'io-ts';
import {incomingValidation} from '../validations/middlewareValidation';

export const makePlacesCall = async (request: t.TypeOf<typeof RequestInterface>) => {

    try {
        // get listingIds
        const firebaseReadPromises = request.listingIds.map((listingId) => {
            return (
                fetchOne('allListings', listingId)
            )
        });

        const listingObjs = await Promise.all(firebaseReadPromises);
        const listingObjList: any [] = [];
        // make all places calls 
        const googleAPIResponsePromises = listingObjs.map((objFromRemote) => {

            // console.log('objFromRemote', objFromRemote.data());

            if (
                //incomingValidation(ListingObj, objFromRemote.data()) && 
                objFromRemote.exists){

                    // const result = await tPromise.decode(ListingObj, objFromRemote.data());
                    
                const a: any = objFromRemote.data()!;

                // console.log('a', a);
                
                // update listingObjList 
                listingObjList.push(a);

                return (
                    placesAPICall(a.listingName, request.fieldNames)
                )
            };

            // listingID is not present
            throw new Error('ListingID is not present or permission not present');
        });
    
        
        // await for the responses 
        const apiResponses = await Promise.all(googleAPIResponsePromises);
        const placesResponseList: any [] = [];
        
        // write to firebase 
        const detailResponsePromises = apiResponses.map((response, index) => {

            // console.log('response.data', response.data);

            // validate response
            if (incomingValidation(GooglePlacesResponse, response.data)){
                // parse places result
                const parsedResult = parsePlacesResult(response.data, listingObjList[index], request.override);
                placesResponseList.push(parsedResult)

                // console.log('parsedResult', parsedResult);

                // write to firebase 
                return (
                    placesDetailCall(parsedResult.placeId)
                    // updateOne('allListings', listingObjList[index].listingId, parsedResult)
                );
            }

            throw new Error('Places request is corrupted');
        });

        // await for write confirmation
        const detailResponses = await Promise.all(detailResponsePromises);


        const firebasePromises = detailResponses.map((response, index) => {

            const parsedResult = parseDetailResponse(response.data, placesResponseList[index]);
            // console.log('parsedResult', parsedResult);

            return (
                updateOne('allListings', listingObjList[index].listingId, parsedResult)
            )

        });

        await firebasePromises;

        return {
            status: true,
            errors: ''
        }

    } catch (error) {
        return {
            status: false,
            errors: error
        }
    }
}; 



const placesAPICall = (query: string, textFieldsNeeded: string[]) => {

    return (
        axios({
            method: 'get',
            url: googlePlacesURL,
            params: {
                input: query,
                fields: textFieldsNeeded.join(','),
                inputtype: 'textquery',
                key: PLACES_KEY,
            }
        })
    )
};


const placesDetailCall = (place_id: string) => {

    return (
        axios({
            method: 'get',
            url: googlePlaceDetailURL,
            params: {
                place_id: place_id,
                fields: 'photo',
                key: PLACES_KEY,
            }
        })
    )
};

