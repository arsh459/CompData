import * as admin from "firebase-admin";

export interface MSToken {
  token: string;
  expires: number;
}

export const getMSToken = async (now: number) => {
  const remoteTokens = await admin
    .firestore()
    .collection("msTokens")
    .where("expires", ">=", now)
    .get();

  if (remoteTokens.docs.length) {
    return remoteTokens.docs[0].data() as MSToken;
  }

  return undefined;
};

export const saveMSToken = async (token: string, expires: number) => {
  await admin.firestore().collection("msTokens").doc().set({
    token,
    expires,
  });
};
