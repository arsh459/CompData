import { MembershipRequestInterface } from "./interface";
import { writeOne } from "../utils/firestore/fetchOne";
import { v4 as uuid } from 'uuid';


export const addEmail = async (request: MembershipRequestInterface) => {
    const newId = uuid()
    await writeOne('membershipRequests', newId, request)
}