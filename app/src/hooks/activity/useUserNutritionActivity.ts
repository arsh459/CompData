import firestore from "@react-native-firebase/firestore";
import { Activity } from "@models/Activity/Activity";
import { useEffect, useState } from "react";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { formatUnixTimestampByDateTime } from "@modules/DoctorFormMain/utils";
type NutritionDataContribution = {
  todayData: Activity[];
  weekData: Activity[];
  lastMonthData: Activity[];
  //   allData: Activity[];
};

export const useUserNutritionActivity = (day?: number) => {
  const { state } = useAuthContext();
  const [userNutritionData, setUserNutritionData] =
    useState<NutritionDataContribution>({
      todayData: [],
      weekData: [],
      lastMonthData: [],
      //   allData: [],
    });

  useEffect(() => {
    if (day) {
      const now = day || Date.now() / 1000; // Current Unix timestamp
      const lastWeek = now - 7 * 24 * 60 * 60; // Unix timestamp for 7 days ago
      const lastMonth = now - 30 * 24 * 60 * 60; // Unix timestamp for 30 days ago

      const unsub = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("activities")
        .where("source", "==", "nutrition")
        .where("calories", ">", 0)
        .onSnapshot((userRelevantActsDocs) => {
          if (userRelevantActsDocs) {
            const result: NutritionDataContribution = {
              todayData: [],
              weekData: [],
              lastMonthData: [],
              //   allData: [],
            };

            userRelevantActsDocs.forEach((doc) => {
              const activity = doc.data() as Activity;
              const timestamp = activity.trueUnix || activity.createdOn;

              //   if (timestamp && timestamp >= lastMonth) {
              //     // result.allData.push(activity);

              //   }

              if (timestamp) {
                if (timestamp >= now) {
                  console.log(
                    "today",
                    formatUnixTimestampByDateTime(timestamp),
                    "today"
                  );

                  result.todayData.push(activity);
                }
                if (timestamp >= lastWeek && timestamp <= now) {
                  console.log(
                    "lastWeek",
                    formatUnixTimestampByDateTime(timestamp),
                    "lastWeek"
                  );

                  result.weekData.push(activity);
                }
                if (timestamp >= lastMonth && timestamp <= now) {
                  console.log(
                    "lastMonth",
                    formatUnixTimestampByDateTime(timestamp),
                    "lastMonth"
                  );

                  result.lastMonthData.push(activity);
                }
              }
            });

            setUserNutritionData(result);
          }
        });
      return () => {
        unsub();
      };
    }
  }, [state.uid, day]);

  return { userNutritionData };
};

export const useUserNutritionActivityCount = (day?: string) => {
  const { state } = useAuthContext();
  const [useUserNutritionActivityCount, setUserNutritionActivityCount] =
    useState<number>(0);

  useEffect(() => {
    const getCount = async () => {
      if (day) {
        const snapshot = await firestore()
          .collection("users")
          .doc(state.uid)
          .collection("activities")
          .where("type", "==", "nutrition")
          .where("calories", ">", 0)
          .where("date", "==", day)

          .count()
          .get();

        setUserNutritionActivityCount(snapshot.data().count);
      }
    };

    getCount();
  }, [state.uid, day]);

  return { useUserNutritionActivityCount };
};
