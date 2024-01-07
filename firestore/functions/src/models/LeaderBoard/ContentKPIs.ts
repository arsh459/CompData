import { setOne } from "../../utils/firestore/fetchOne";
import { firestore } from "firebase-admin";

export const updateTripsPlanned = async (uid: string, change: number) => {
  await setOne(
    "leaderBoard",
    `leader-${uid}`,
    {
      uid: uid,
      tripsPlanned: firestore.FieldValue.increment(change),
    },
    true
  );
};

export const updateDiscoveries = async (uid: string, change: number) => {
  await setOne(
    "leaderBoard",
    `leader-${uid}`,
    {
      uid: uid,
      discoveries: firestore.FieldValue.increment(change),
    },
    true
  );
};

export const updateAllfollowers = async (uid: string, followers: number) => {
  await setOne(
    "leaderBoard",
    `leader-${uid}`,
    {
      uid: uid,
      allFollowers: followers,
    },
    true
  );
};

export const updateCollectionsCreated = async (uid: string, change: number) => {
  await setOne(
    "leaderBoard",
    `leader-${uid}`,
    {
      uid: uid,
      collections: firestore.FieldValue.increment(change),
    },
    true
  );
};

export const updateTripsCreated = async (uid: string, change: number) => {
  await setOne(
    "leaderBoard",
    `leader-${uid}`,
    {
      uid: uid,
      trips: firestore.FieldValue.increment(change),
    },
    true
  );
};

export const updateCollectionListings = async (uid: string, change: number) => {
  await setOne(
    "leaderBoard",
    `leader-${uid}`,
    {
      uid: uid,
      collectionListings: firestore.FieldValue.increment(change),
    },
    true
  );
};
