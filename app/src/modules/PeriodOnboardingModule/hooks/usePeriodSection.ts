import firestore from "@react-native-firebase/firestore";
import { StackActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/MainStack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { sectionTypes } from "@modules/JoinBoatMainV3/hooks/useSection";

export type periodSectionTypes =
  | "loading"
  // | "cycleRegularity"
  | "sleepQuality"
  | "markLastPeriod"
  | "markBeforeLastPeriod"
  | "cycleLengthAverage"
  // | "irregulerCycle"
  | "lastPeriodLength";

export const usePeriodSection = (backOnDone?: boolean) => {
  const userId = useUserStore((state) => state.user?.uid, shallow);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const gotoSection = (sec: periodSectionTypes, replace?: boolean) => {
    backOnDone
      ? navigation.goBack()
      : replace
      ? navigation.replace("PeriodOnboarding", {
          sec,
        })
      : navigation.push("PeriodOnboarding", {
          sec,
        });
  };

  // last 6 month cycle length average save
  const onCycleLengthAverageSave = async (
    cycleLength?: number,
    periodLength?: number
  ) => {
    if (userId && cycleLength) {
      weEventTrack("fScanCycleLengthAverage_clickNext", {});

      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          ["periodTrackerObj.inputCycleLength"]: cycleLength,
          ["periodTrackerObj.inputPeriodLength"]: periodLength,
        });

      gotoSection("markLastPeriod");
    }
  };

  // last month cycle length save
  const onLastPeriodLengthSave = async (
    periodLength?: number,
    sleepQuality?: number
  ) => {
    if (userId && periodLength) {
      weEventTrack("fScanLastPeriodLength_clickNext", {});

      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          ["periodTrackerObj.inputPeriodLength"]: periodLength,
          sleepQuality,
        });

      gotoSection("cycleLengthAverage");
    }
  };

  //   const onSymptomsDuringPeriodSave = async (symptoms?: symptomId[]) => {
  //     if (userId && symptoms) {
  //       weEventTrack("fScanSymptomsDuringPeriod_clickNext", {});

  //       await firestore()
  //         .collection("users")
  //         .doc(userId)
  //         .update({
  //           ["periodTrackerObj.symptomsDuringPeriod"]: symptoms,
  //         });

  //       gotoSection("symptomsBeforePeriod");
  //     }
  //   };

  //   const onSymptomsBeforePeriodSave = async (symptoms?: symptomId[]) => {
  //     if (userId && symptoms) {
  //       weEventTrack("fScanSymptomsBeforePeriod_clickNext", {});

  //       await firestore()
  //         .collection("users")
  //         .doc(userId)
  //         .update({
  //           ["periodTrackerObj.symptomsBeforePeriod"]: symptoms,
  //         });

  //       gotoSection("workoutFrequency");
  //     }
  //   };

  const onMarkPeriodSave = async (
    sec: sectionTypes,
    periodLength?: number,
    cycleLength?: number,
    sleepQuality?: number
  ) => {
    if (userId) {
      if (sec === "markBeforeLastPeriod") {
        weEventTrack("fScanMarkLastPeriod_clickNext", {});
      } else {
        weEventTrack("fScanMarkLastToLastPeriod_clickNext", {});
      }

      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          ...(periodLength
            ? { ["periodTrackerObj.inputPeriodLength"]: periodLength }
            : {}),
          ...(cycleLength
            ? { ["periodTrackerObj.inputCycleLength"]: cycleLength }
            : {}),
          // ...(typeof sleepQuality === "number" ? { sleepQuality } : {}),
        });

      // gotoSection(sec);
      if (sec === "markBeforeLastPeriod") {
        gotoSection(sec);
      } else {
        // pop to top
        navigation.dispatch(StackActions.popToTop());
      }
    }
  };

  return {
    gotoSection,

    onCycleLengthAverageSave,
    onLastPeriodLengthSave,

    onMarkPeriodSave,
  };
};
