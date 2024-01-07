import * as t from 'io-ts';

export const userInviteLink = t.type({
    uid: t.string,
});

export interface userInviteInterface {
    uid: string;
}