import * as admin from "firebase-admin";
import { View } from "../Collection";
import * as functions from "firebase-functions";

export const getCollectionViews = async (
  collectionId: string,
  min: number,
  max: number,
  base: "collection" | "trip"
): Promise<View[]> => {
  const allViews: View[] = [];

  try {
    const views = await admin
      .firestore()
      .collection(base === "collection" ? "collections" : "tripsV2")
      .doc(collectionId)
      .collection("views")
      .where("visitedOn", ">=", min)
      .where("visitedOn", "<=", max)
      .get();

    return views.docs.reduce((acc, item) => {
      const viewTmp = item.data() as View;
      if (viewTmp.status === "ACCEPTED") {
        acc.push();
      }
      return acc;
    }, allViews);
  } catch (error) {
    functions.logger.error(error);
    return [];
  }
};

export const getCollectionViewsObj = async (
  collectionId: string,
  min: number,
  max: number,
  base: "collection" | "trip"
): Promise<{ [docId: string]: View }> => {
  const allViews: { [docId: string]: View } = {};

  try {
    const views = await admin
      .firestore()
      .collection(base === "collection" ? "collections" : "tripsV2")
      .doc(collectionId)
      .collection("views")
      .where("visitedOn", ">=", min)
      .where("visitedOn", "<=", max)
      .get();

    return views.docs.reduce((acc, item) => {
      const viewTmp = item.data() as View;
      if (viewTmp.status === "ACCEPTED") {
        acc[item.id] = item.data() as View;
      }
      return acc;
    }, allViews);
  } catch (error) {
    functions.logger.error(error);
    return {};
  }
};

export const reconcileCollectionView = async (
  collectionId: string,
  base: "collection" | "trip"
) => {
  const allViews: View[] = [];

  try {
    const views = await admin
      .firestore()
      .collection(base === "collection" ? "collections" : "tripsV2")
      .doc(collectionId)
      .collection("views")
      .get();

    const selectedViews = views.docs.reduce((acc, item) => {
      const viewTmp = item.data() as View;
      if (viewTmp.status === "ACCEPTED") {
        acc.push(item.data() as View);
      }
      return acc;
    }, allViews);

    await admin
      .firestore()
      .collection(base === "collection" ? "collections" : "tripsV2")
      .doc(collectionId)
      .update({ numViews: selectedViews.length });
  } catch (error) {
    functions.logger.error(error);
  }
};
