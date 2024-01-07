import * as admin from "firebase-admin";

export interface Ice_Server {
  url: string;
  urls?: string;
  username?: string;
  credential?: string;
}

export interface STUNResponse_Firebase extends STUNResponse {
  expires: number;
}

export interface STUNResponse {
  username: string;
  iceServers: Ice_Server[];
  dateUpdated: string;
  accountSid: string;
  ttl: string;
  dateCreated: string;
  password: string;
}

export const getStunServer = async (now: number) => {
  const remoteTokens = await admin
    .firestore()
    .collection("turn")
    .where("expires", ">=", now)
    .get();

  if (remoteTokens.docs.length) {
    return remoteTokens.docs[0].data() as STUNResponse_Firebase;
  }

  return undefined;
};

export const saveStunServer = async (
  stunResp: STUNResponse,
  expires: number,
) => {
  await admin.firestore().collection("turn").doc().set({
    userName: stunResp.username,
    iceServers: stunResp.iceServers,
    date_updated: stunResp.dateCreated,
    date_created: stunResp.dateUpdated,
    password: stunResp.password,
    ttl: stunResp.ttl,
    account_sid: stunResp.accountSid,
    expires,
  });
};
