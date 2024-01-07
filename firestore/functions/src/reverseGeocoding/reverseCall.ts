import axios from 'axios';
import {googleRevURL} from '../constants/urls/urls';
import {PLACES_KEY} from '../constants/keys/googleKeys';
import {
    updateOne, 
    fetchOne} from '../utils/firestore/fetchOne';
import {RevRequestInterface} from './interface';
import {getLocality} from './utils';

export const makeRevCall = async (request: RevRequestInterface) => {

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
                objFromRemote.exists){

                const a: any = objFromRemote.data();
                
                // update listingObjList 
                listingObjList.push(a);

                return (
                    revAPICall(a.lat, a.lng)
                )
            };

            // listingID is not present
            throw new Error('ListingID is not present or permission not present');
        });
    
        
        // await for the responses 
        const apiResponses = await Promise.all(googleAPIResponsePromises);
        
        // write to firebase 
        apiResponses.map((response, index) => {

            // console.log('response', response.data);
            // console.log('listingObjList[index].formattedAddress', listingObjList[index].formattedAddress)
            // console.log('listingObjList[index].hyperLocation', listingObjList[index].hyperLocation)

            const parsedResponse = getLocality(response.data);

            // console.log('parsedResponse', parsedResponse);

            const remoteKey = listingObjList[index].listingId;
            if (!listingObjList[index].formattedAddress && parsedResponse.formattedAddress){
                // console.log('remoteKey', remoteKey, parsedResponse.formattedAddress)
                updateOne('allListings', remoteKey, {formattedAddress: parsedResponse.formattedAddress}).catch((error) => console.log(error))
            } 

            if (!listingObjList[index].hyperLocation && parsedResponse.locality){
                // console.log('remoteKey', remoteKey, parsedResponse.locality)
                updateOne('allListings', remoteKey, {hyperLocation: parsedResponse.locality}).catch((error) => console.log(error))
            }

            return 
            
        });

        return {
            status: true,
            errors: ''
        }

    } catch (error) {
        console.log('error', error);
        return {
            status: false,
            errors: error
        }
    }
}; 



const revAPICall = (lat: number, lng: number) => {

    return (
        axios({
            method: 'get',
            url: googleRevURL,
            params: {
                latlng: "" + lat + "," + lng,
                key: PLACES_KEY,
            }
        })
    )
};


