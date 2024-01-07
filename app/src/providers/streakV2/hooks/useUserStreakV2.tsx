import { useUserStore } from "@providers/user/store/useUserStore";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import { streakData, useStreakStore } from "../store/useStreakStoreV2";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  PendingNotification,
  streakLabel,
  streakLevelsTypes,
  streakMapInterface,
} from "../interface";
import {
  addDays,
  endOfToday,
  format,
  isFirstDayOfMonth,
  startOfToday,
} from "date-fns";
import { shallow } from "zustand/shallow";
import { getMonthStreaks } from "../utils/getMonthStreaks";
import { streakLevels } from "../utils/streakUpdate";
import { getTodayFp } from "../utils/getTodayFp";

export interface StreakDaysListInterface {
  date: string;
  isMonthStart: boolean;
  status: streakLabel | undefined;
}

export const useUserStreakV2 = () => {
  const { userId } = useUserStore(
    (state) => ({
      userId: state.user?.uid,
      usertz: state.user?.recommendationConfig?.timezone?.tzString,
    }),
    shallow
  );
  const { setStreakMonthDays } = useStreakStore(
    (state) => ({
      streakId: state.streak?.id,
      setStreakMonthDays: state.setStreakMonthDays,
      dailyFPTarget: state.streak?.targetFp ? state.streak?.targetFp : 0,
    }),
    shallow
  );

  const onStreakMonthChange = async (unix: number) => {
    if (userId) {
      const monthStatusMap = await getMonthStreaks(unix, userId);

      setStreakMonthDays(monthStatusMap);
    }
  };
  const getNextTargetDay = (day: streakLevelsTypes) => {
    const currentIndex = streakLevels.indexOf(day);
    return day > 7 ? streakLevels[0] : streakLevels[currentIndex + 1];
  };
  // above function we need to change pendingNo , streakMap , days
  // when we should call where will have the latest activites

  return {
    // updatePendingNotification,
    // createNewStreak,
    onStreakMonthChange,
    getNextTargetDay,
    // getStreakDaysList,
  };
};

export const updatePendingNotification = async (
  uid: string,
  streakId: string,
  notificationData: PendingNotification
) => {
  const streakRef: FirebaseFirestoreTypes.DocumentReference = firestore()
    .collection(`users/${uid}/streaks`)
    .doc(streakId);
  await streakRef.update({ pendingNotification: notificationData });
};

export const getStreakDaysList = (
  startedOn: number,
  targetDays: number,
  currentStreakMap: streakMapInterface
) => {
  const streakDaysArray: StreakDaysListInterface[] = [];

  for (let i = 0; i < targetDays; i++) {
    const currentDate = addDays(startedOn, i);
    const isMonthStart = isFirstDayOfMonth(currentDate.getTime());
    const currentDateStr = format(currentDate, "yyyy-MM-dd");
    const currentDay = format(currentDate, "dd");

    streakDaysArray.push({
      date: currentDay,
      isMonthStart: isMonthStart,
      status:
        currentStreakMap && currentStreakMap[currentDateStr]
          ? currentStreakMap[currentDateStr]
          : undefined,
    });
  }

  return streakDaysArray;
};

const getNewStreakTimes = () => {
  const todayEndUnix = endOfToday().getTime();
  const todayDateStr = format(Date.now(), "yyyy-MM-dd");
  const monthName = format(Date.now(), "MMMM");
  const todayStartUnix = startOfToday().getTime();

  return {
    todayEndUnix,
    todayDateStr,
    monthName,
    todayStartUnix,
  };
};

export const createNewStreak = async (
  uid: string,
  targetDays: streakLevelsTypes,
  dailyFPTarget: number,
  userTZ: string
) => {
  const { todayEndUnix, todayDateStr, monthName, todayStartUnix } =
    getNewStreakTimes();

  const todayTotalFp = await getTodayFp(uid, todayStartUnix);

  let isCurrentHit: boolean = false;
  if (
    todayTotalFp &&
    dailyFPTarget &&
    todayTotalFp &&
    todayTotalFp >= dailyFPTarget
  ) {
    isCurrentHit = true;
  }

  const newStreak: streakData = {
    id: uuidv4(),
    startedOn: startOfToday().getTime(),
    activeTill: todayEndUnix,
    updatedOn: Date.now(),
    targetDays: targetDays,
    days: isCurrentHit ? 1 : 0,
    streakMap: { [todayDateStr]: `${isCurrentHit ? "activeHit" : "active"}` },
    targetFp: dailyFPTarget,
    streakStatus: "active",
    userTimeZone: userTZ,
    streakMonths: [monthName],
  };

  const newStreakDocRef: FirebaseFirestoreTypes.DocumentReference = firestore()
    .collection(`users/${uid}/streaks`)
    .doc(newStreak.id);

  await newStreakDocRef.set(newStreak);

  return;
};

export const updateStreakDays = async (
  uid: string,
  streakId: string,
  targetDays: number
) => {
  const currentStreakRef: FirebaseFirestoreTypes.DocumentReference =
    firestore().doc(`users/${uid}/streaks/${streakId}`);

  await currentStreakRef.update({
    updatedOn: Date.now(),
    targetDays: targetDays,
  });
};
