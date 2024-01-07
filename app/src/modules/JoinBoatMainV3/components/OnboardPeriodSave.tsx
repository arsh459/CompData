import { View, Text, TouchableOpacity, ColorValue } from "react-native";

import { weEventTrack } from "@utils/analytics/webengage/userLog";
import crashlytics from "@react-native-firebase/crashlytics";
import { getDateDiff, getSavedPeriod } from "./utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { shallow } from "zustand/shallow";
import OnSaveLoadingModal from "@modules/PeriodTrackerMain/OnSaveLoading";
import { useState } from "react";
import { groupConsecutiveDateStrings } from "@providers/period/funcs/utils";
import { sectionTypes } from "../hooks/useSection";
import { savePeriodInRemote } from "@modules/PeriodCalenderLogMain/utils";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onSaveAndNext: (
    sec: sectionTypes,
    periodLength?: number,
    cycleLength?: number,
    sleepLength?: number
  ) => Promise<void>;
  target: "markLastPeriod" | "markBeforeLastPeriod";
  noteText?: string;
  noteTextColor?: ColorValue;
}

const OnboardPeriodSave: React.FC<Props> = ({
  target,
  onSaveAndNext,
  noteText,
  noteTextColor,
}) => {
  // const { todayUnix } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { bottom } = useSafeAreaInsets();

  const {
    //  cycles,
    selectedperiodDates,
    consecutiveDateGroup,
    savePending,
  } = useCurrentPeriodStore((state) => {
    const consecutiveDateGroup = groupConsecutiveDateStrings(
      Object.keys(state.selectedPeriodState)
    );

    return {
      // cycles: state.cyclesArray,
      // selectedDates: state.selectedState,
      consecutiveDateGroup: consecutiveDateGroup,
      selectedperiodDates: state.selectedPeriodState,
      onSave: state.onSave,
      savePending: state.savePending,
    };
  }, shallow);

  const { userId, sleepQualityDB } = useUserStore(({ user }) => {
    return {
      userId: user?.uid,
      // cycleLengthDB: user?.periodTrackerObj?.inputCycleLength,
      // periodLengthDB: user?.periodTrackerObj?.inputPeriodLength,
      sleepQualityDB: user?.sleepQuality || 7,
    };
  }, shallow);

  let canGoNext: boolean = false;
  if (consecutiveDateGroup.length >= 2) {
    canGoNext = true;
  } else if (target === "markLastPeriod" && consecutiveDateGroup.length >= 1) {
    canGoNext = true;
  } else if (
    target === "markBeforeLastPeriod" &&
    consecutiveDateGroup.length >= 2
  ) {
    canGoNext = true;
  }

  const handleSaveAndNext = async (
    needsLastToLast: boolean,
    periodLength?: number,
    cycleLength?: number,
    sleepLength?: number
  ) => {
    await onSaveAndNext(
      needsLastToLast ? "markBeforeLastPeriod" : "sleepQuality",
      periodLength,
      cycleLength,
      sleepLength
    );

    // if (target === "markLastPeriod") {
    //   await onSaveAndNext(
    //     needsLastToLast ? "markBeforeLastPeriod" : "sleepQuality",
    //     len || periodLengthDB,
    //     cycleLengthDB || 28
    //   );
    // } else {
    //   await onSaveAndNext(
    //     "sleepQuality",
    //     len || cycleLengthDB,
    //     sleepQualityDB || 7
    //   );
    // }
  };

  // console.log("cycles", selectedperiodDates);

  const saveHandler = async () => {
    try {
      if (userId) {
        setLoading(true);

        const onlyPeriodDates = getSavedPeriod(selectedperiodDates);
        // const consecutiveDateGroup =
        //   groupConsecutiveDateStrings(onlyPeriodDates);

        await savePeriodInRemote(userId, onlyPeriodDates);

        // only one set
        if (consecutiveDateGroup.length === 1) {
          const periodLength = consecutiveDateGroup[0].length;

          // console.log("p", periodLength);
          // console.log("cp", cycleLength);
          await handleSaveAndNext(true, periodLength);
        }
        // can calculate cycle length
        else if (consecutiveDateGroup.length > 1) {
          const periodLength =
            consecutiveDateGroup[consecutiveDateGroup.length - 1].length;

          const dt1 = consecutiveDateGroup[consecutiveDateGroup.length - 1][0];
          const dt2 = consecutiveDateGroup[consecutiveDateGroup.length - 2][0];

          const cycleLength = getDateDiff(dt1, dt2);

          await handleSaveAndNext(
            false,
            periodLength,
            cycleLength,
            sleepQualityDB
          );
        } else {
          handleSaveAndNext(target === "markLastPeriod" ? true : false);
        }

        // const { cycleLength, periodLength } = getPeriodAndCycleLength(
        //   cycles,
        //   todayUnix
        // );

        // if (savedPeriods.length > 0 && savePending === "READY") {
        //   await onSave();
        //   await savePeriodInRemote(userId, savedPeriods);

        //   // await handleSaveAndNext(
        //   //   consecutiveDateGroup.length,
        //   //   target === "markLastPeriod" ? periodLength : cycleLength
        //   // );
        // } else {
        //   await handleSaveAndNext(consecutiveDateGroup.length);
        // }

        setLoading(false);
        weEventTrack("calendar_savePeriods", {});
      }
    } catch (error: any) {
      console.log("error", error);
      setLoading(false);
      crashlytics().recordError(error);
    }
  };

  return (
    <>
      {canGoNext ? (
        <View className="absolute bottom-4 left-4 right-4">
          <TouchableOpacity
            onPress={saveHandler}
            className="text-white bg-[#6D55D1] w-full mx-auto py-4 rounded-lg"
          >
            <Text className="text-white text-center">
              {savePending === "NEED_ONE_VALUE"
                ? "Select at least 1 date"
                : savePending === "READY"
                ? "Save Dates"
                : "Proceed"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : noteText ? (
        <LinearGradient
          style={{ paddingBottom: bottom || 16 }}
          pointerEvents="none"
          colors={["transparent", "#232136", "#232136"]}
          className="absolute bottom-0 left-0 px-6 right-0 flex justify-center items-center"
        >
          <Text
            className="text-sm Text-8 pt-16"
            style={{
              fontFamily: "Nunito-SemiBold",
              color: noteTextColor || "#FFFFFF",
            }}
          >
            Note: {noteText}
          </Text>
        </LinearGradient>
      ) : null}
      <OnSaveLoadingModal isOpen={loading} onCloseModal={() => {}} />
    </>
  );
};

export default OnboardPeriodSave;
