import {InterviewRequestInterface, InterviewResponseInterface, InterviewRecordInterface} from './interface';
import { v4 as uuid } from 'uuid';

export const generateRecords = (request: InterviewRequestInterface):InterviewResponseInterface => {

    const response = [];
    for (let i = 0; i<request.numRecords; i++){
        response.push(generateRecord())
    }

    return {
        users: response
    }

}

const generateRecord = ():InterviewRecordInterface => {
    return {
        id: uuid(),
        name: makeid(getRandomIntArbitrary(4, 7)),
        lat: getRandomFloatArbitrary(28, 28.5),
        lng: getRandomFloatArbitrary(77, 75.5),
    }
}

const makeid = (length: number): string => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


 const getRandomIntArbitrary = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const getRandomFloatArbitrary = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }