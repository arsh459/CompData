import * as admin from "firebase-admin";

export const fetchOne = (collectionId: string, docId: string) => {
  return admin.firestore().collection(collectionId).doc(docId).get();
};

export const updateOne = (
  collectionId: string,
  docId: string,
  document: any,
) => {
  return admin.firestore().collection(collectionId).doc(docId).update(document);
};

export const writeOne = (
  collectionId: string,
  docId: string,
  document: Object,
) => {
  return admin.firestore().collection(collectionId).doc(docId).set(document);
};

export const setOne = (
  collectionId: string,
  docId: string,
  document: Object,
  merge: boolean,
) => {
  return admin
    .firestore()
    .collection(collectionId)
    .doc(docId)
    .set(document, { merge: merge });
};
