import { View } from "../Collection";
import { firestore } from "firebase-admin";
import { Notification } from "../../Notifications/interface";
import { getUserById } from "../../User/Methods";
import { createEarning } from "../../Earning/Methods";
import { getCollectionByCollectionId, getCollectionImage } from "./getUtils";
import { getTripBytripId } from "../../Trip/Methods/getUtils";
import { createNotification } from "../../Notifications/createNotification";
import { sendNotification } from "../../Notifications/Methods";

export const handleView = async (
  collectionId: string,
  view: View,
  docId: string,
  baseType: "trip" | "collection",
) => {
  if (await viewedThisDay(collectionId, view, baseType)) {
    // console.log("removing");
    await removeView(collectionId, docId, baseType);
  } else {
    // console.log("adding");
    const collection =
      baseType === "trip"
        ? await getTripBytripId(collectionId)
        : await getCollectionByCollectionId(collectionId);

    await addView(
      collectionId,
      docId,
      view.creatorId,
      baseType,
      view.viewerId,
      collection?.collectionName,
      collection ? getCollectionImage(collection) : undefined,
    );
  }
};

const viewedThisDay = async (
  collectionId: string,
  view: View,
  baseType: "trip" | "collection",
): Promise<boolean> => {
  const previousViews = await firestore()
    .collection(baseType === "collection" ? "collections" : "tripsV2")
    .doc(collectionId)
    .collection("views")
    .where("viewerId", "==", view.viewerId)
    .where("visitedOn", ">=", view.visitedOn - 24 * 60 * 60 * 1000)
    .get();

  const acceptedPrevious = previousViews.docs.filter(
    (remView) => (remView.data() as View).status === "ACCEPTED",
  );

  // console.log("previous", acceptedPrevious.length);
  // console.log("acceptedPrevious", acceptedPrevious);

  return acceptedPrevious.length > 0 ? true : false;
};

const removeView = async (
  collectionId: string,
  docId: string,
  baseType: "trip" | "collection",
) => {
  await firestore()
    .collection(baseType === "collection" ? "collections" : "tripsV2")
    .doc(collectionId)
    .collection("views")
    .doc(docId)
    .delete();
};

const addView = async (
  collectionId: string,
  docId: string,
  creatorId: string,
  baseType: "trip" | "collection",
  viewerId: string,
  collectionName?: string,
  collectionImage?: string,
) => {
  const batch = firestore().batch();

  batch.update(
    firestore()
      .collection(baseType === "collection" ? "collections" : "tripsV2")
      .doc(collectionId)
      .collection("views")
      .doc(docId),
    {
      status: "ACCEPTED",
      ...(baseType === "trip" ? { isTrip: true } : false),
    },
  );

  batch.update(
    firestore()
      .collection(baseType === "collection" ? "collections" : "tripsV2")
      .doc(collectionId),
    {
      numViews: firestore.FieldValue.increment(1),
    },
  );

  batch.update(
    firestore().collection("leaderBoard").doc(`leader-${creatorId}`),
    {
      uid: creatorId, // just to ensure the id exists
      numViews: firestore.FieldValue.increment(1),
      numViews2Weeks: firestore.FieldValue.increment(1),
      numViews1Month: firestore.FieldValue.increment(1),

      // earning KPIs
      earnings2Weeks: firestore.FieldValue.increment(2 * 1),
      earnings1Month: firestore.FieldValue.increment(2 * 1),
      allEarnings: firestore.FieldValue.increment(2 * 1),
    },
  );

  const viewerData = await getUserById(viewerId);

  const notification: Notification = createNotification(
    "New View",
    `You have received 1 view on ${
      collectionName ? collectionName : "your latest creation"
    }`,
    "view",
    collectionId,
    baseType === "trip" ? "trip" : "collection",
    viewerData,
  );

  batch.set(
    firestore()
      .collection("users")
      .doc(creatorId)
      .collection("notifications")
      .doc(notification.notificationId),
    notification,
  );

  const newEarning = createEarning(
    "VIEW",
    2,
    docId,
    baseType === "trip" ? "Trip view" : "Collection view",
    `New view on ${
      collectionName
        ? collectionName
        : `${baseType === "trip" ? "Trip" : "Collection"}`
    }`,
    "CREDIT",
    1,
    collectionImage ? collectionImage : undefined,
  );
  batch.set(
    firestore()
      .collection("users")
      .doc(creatorId)
      .collection("earnings")
      .doc(newEarning.earningId),
    newEarning,
  );

  await batch.commit();
  await sendNotification(creatorId, notification);
};
