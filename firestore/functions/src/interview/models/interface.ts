import * as t from 'io-ts';

// type 
export const InterviewRequest = t.type({
    numRecords: t.number, 
});

export interface InterviewRequestInterface {
    numRecords: number,
}




// interfaces 
export interface InterviewRecordInterface {
    name: string,
    lat: number,
    lng: number
    id: string,
};

export interface InterviewResponseInterface {
    users: InterviewRecordInterface[],
}