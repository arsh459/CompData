import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Achiever, Award, targetMonthFormat } from "@models/Awards/interface";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface AchieverSection {
  targetMonth: string;
  data: Achiever[][];
}

const mergeSection = (
  previous: AchieverSection[],
  newDocs: AchieverSection[]
) => {
  let lastMonth: string = "";
  if (previous.length) {
    lastMonth = previous[previous.length - 1].targetMonth || "";
  }

  const mergedDocs = previous;
  for (const newDoc of newDocs) {
    if (newDoc.targetMonth === lastMonth) {
      mergedDocs[mergedDocs.length - 1].data.push(...newDoc.data);
    } else {
      mergedDocs.push(newDoc);
    }
  }

  return mergedDocs;
};

const queryProcess = async (
  snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  awards: { [key: string]: Award }
) => {
  const remoteAwards: { [key: string]: Award } = { ...awards };
  const remoteAchievers: AchieverSection[] = [];
  let lDoc: FirebaseFirestoreTypes.DocumentData | undefined;

  for (const doc of snapshot.docs) {
    const remoteData = doc.data() as Achiever;

    if (remoteData && remoteData.targetMonth) {
      const tempDate = targetMonthFormat(remoteData.targetMonth);

      const targetIndex = remoteAchievers.findIndex(
        (item) => item.targetMonth === tempDate
      );

      if (targetIndex !== -1) {
        const target = remoteAchievers[targetIndex].data;
        if (target[target.length - 1].length < 2) {
          target[target.length - 1].push(remoteData);
        } else {
          target.push([remoteData]);
        }
      } else {
        remoteAchievers.push({ targetMonth: tempDate, data: [[remoteData]] });
      }

      if (!remoteAwards.hasOwnProperty(remoteData.awardId)) {
        const awardDoc = await firestore()
          .collection("awards")
          .doc(remoteData.awardId)
          .get();

        if (awardDoc.data()) {
          const remoteAward = awardDoc.data() as Award;
          remoteAwards[remoteData.awardId] = remoteAward;
        }
      }
    }

    lDoc = doc;
  }

  return {
    lDoc,
    remoteAchievers,
    remoteAwards,
  };
};

export const useAchievedAwards = (uid?: string, hideUnachiever?: boolean) => {
  // const { state } = useAuthContext();
  const [awards, setAwards] = useState<{ [id: string]: Award }>({});
  const [wonAwardsData, setWonAwardsData] = useState<AchieverSection[]>([]);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [loading, setLoading] = useState<boolean>(true);

  const unseenChanged = useUserStore(
    (state) => state.user?.unseenAwards?.length,
    shallow
  );

  // console.log("loading", loading, uid);

  useEffect(() => {
    const getWonAwardsData = async () => {
      let q: FirebaseFirestoreTypes.Query;
      if (hideUnachiever) {
        q = firestore()
          .collection("achievers")
          .where("uid", "==", uid)
          .where("awardStatus", "==", "WON")
          .orderBy("createdOn", "asc")
          .limit(6);
      } else {
        q = firestore()
          .collection("achievers")
          .where("uid", "==", uid)
          .orderBy("createdOn", "asc")
          .limit(6);
      }

      const awardsData = await q.get();

      const { lDoc, remoteAchievers, remoteAwards } = await queryProcess(
        awardsData,
        {}
      );

      setLastDoc(lDoc);
      setWonAwardsData(mergeSection([], remoteAchievers));
      setAwards(remoteAwards);
      setLoading(false);
    };

    if (uid) {
      getWonAwardsData();
    } else {
      setLoading(false);
    }
  }, [uid, unseenChanged, hideUnachiever]);

  const onNext = async () => {
    if (lastDoc && uid) {
      let q: FirebaseFirestoreTypes.Query;
      if (hideUnachiever) {
        q = firestore()
          .collection("achievers")
          .where("uid", "==", uid)
          .where("awardStatus", "==", "WON")
          .orderBy("createdOn", "asc")
          .startAfter(lastDoc)
          .limit(6);
      } else {
        q = firestore()
          .collection("achievers")
          .where("uid", "==", uid)
          .orderBy("createdOn", "asc")
          .startAfter(lastDoc)
          .limit(6);
      }

      const awardsData = await q.get();

      const { lDoc, remoteAchievers, remoteAwards } = await queryProcess(
        awardsData,
        awards
      );

      setLastDoc(lDoc);
      setWonAwardsData(mergeSection(wonAwardsData, remoteAchievers));
      setAwards(remoteAwards);
    }
  };

  return { awards, wonAwardsData, onNext, loading };
};
