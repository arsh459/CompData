import { updateOne } from "../../../utils/firestore/fetchOne";

import { firestore } from "firebase-admin";

export const incrementCollectionLike = async (collecitonId: string) => {
  await updateOne("collections", collecitonId, {
    numLikes: firestore.FieldValue.increment(1),
  });
};

export const decrementCollectionLike = async (collecitonId: string) => {
  await updateOne("collections", collecitonId, {
    numLikes: firestore.FieldValue.increment(-1),
  });
};

export const incrementTripLike = async (tripId: string) => {
  await updateOne("tripsV2", tripId, {
    numLikes: firestore.FieldValue.increment(1),
  });
};

export const decrementTripLike = async (tripId: string) => {
  await updateOne("tripsV2", tripId, {
    numLikes: firestore.FieldValue.increment(-1),
  });
};
