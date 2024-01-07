import { useEffect, useState } from "react";
import { DailyDataObj } from "./useAvgDataV2";
import firestore from "@react-native-firebase/firestore";
import {
  ProgressCollectionType,
  typePropTypes,
} from "@modules/JourneyLogHome/utils";
import {
  dailyEnergyObj,
  dailyMoodObj,
  dailyWeightObj,
} from "@models/User/User";
import { useProgressStore } from "@providers/progress/progressStore";

export const getLatestCollectionByType = async (
  type: typePropTypes,
  collectionName: ProgressCollectionType,
  uid: string
) => {
  const querySnapshot = await firestore()
    .collection("users")
    .doc(uid)
    .collection(collectionName)
    .where(type, "!=", 0)
    .get();

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

export const useLatestProgress = (uid?: string) => {
  const [moodData, setMoodData] = useState<dailyMoodObj>();
  const [energyData, setEnergyData] = useState<dailyEnergyObj>();
  const [weightData, setWeightData] = useState<dailyWeightObj>();

  const updateVal = useProgressStore((state) => state.update);

  useEffect(() => {
    if (uid) {
      const fetchLatestData = async () => {
        const latestMood = await getLatestCollectionByType(
          "mood",
          "dailyMood",
          uid
        );
        const latestEnergy = await getLatestCollectionByType(
          "energy",
          "dailyEnergy",
          uid
        );
        const latestWeight = await getLatestCollectionByType(
          "weight",
          "dailyWeight",
          uid
        );

        if (latestMood) {
          setMoodData(latestMood as dailyMoodObj);
        }
        if (latestEnergy) {
          setEnergyData(latestEnergy as dailyEnergyObj);
        }
        if (latestWeight) {
          setWeightData(latestWeight as dailyWeightObj);
        }
      };

      fetchLatestData();
    }
  }, [uid, updateVal]);

  return {
    mood: moodData,
    energy: energyData,
    weight: weightData,
  };
};
