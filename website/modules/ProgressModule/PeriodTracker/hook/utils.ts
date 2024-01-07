import {
  ProgressCollectionType,
  typePropTypes,
} from "@modules/ProgressModule/interface";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@config/firebase";
import { DailyDataObj } from "@hooks/progress/interface";

export const getLatestCollectionByType = async (
  type: typePropTypes,
  collectionName: ProgressCollectionType,
  uid: string
) => {
  const querySnapshot = await getDocs(
    query(
      collection(doc(db, "users", uid), collectionName),
      where(type, "!=", 0)
    )
  );

  const docs = querySnapshot.docs;
  if (docs.length > 0) {
    docs.sort((a, b) => (a.data().unix < b.data().unix ? 1 : -1));

    const data = docs
      .find((doc) => doc.data()[type] !== 0)
      ?.data() as DailyDataObj;
    if (data) {
      return data;
    }
  }
};
