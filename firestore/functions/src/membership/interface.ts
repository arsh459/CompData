import * as t from 'io-ts';

// type 
const MembershipMandatory = t.type({
    email: t.string, 
});

const MembershipPartial = t.partial({
    phone: t.string,
    type: t.string
});

export const MembershipRequest = t.intersection([MembershipMandatory, MembershipPartial]);

export interface MembershipRequestInterface {
    email: string;
    phone?: string;
    type?: string;
}

