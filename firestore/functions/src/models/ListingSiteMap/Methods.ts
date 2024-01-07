import * as admin from "firebase-admin";

export const addToSiteMap = async (
  type: "stays" | "collections" | "experiences" | "trips",
  name: string,
  key: string,
) => {
  await admin
    .firestore()
    .collection("siteMap")
    .doc("map-1")
    .update({
      [`${type}`]: admin.firestore.FieldValue.arrayUnion({
        name: name,
        key: key,
      }),
    });
};

export const removeFromSiteMap = async (
  type: "stays" | "collections" | "experiences" | "trips",
  name: string,
  key: string,
) => {
  await admin
    .firestore()
    .collection("siteMap")
    .doc("map-1")
    .update({
      [`${type}`]: admin.firestore.FieldValue.arrayRemove({
        name: name,
        key: key,
      }),
    });
};
