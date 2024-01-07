import * as admin from "firebase-admin";

export const getZohoData = async () => {
  const docs = await admin.firestore().collection("zoho").get();

  if (docs.docs.length) {
    return docs.docs[0].data() as zohoToken;
  }

  return undefined;
};
