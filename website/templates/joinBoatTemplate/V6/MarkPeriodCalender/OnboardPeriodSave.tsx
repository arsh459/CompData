import { weEventTrack } from "@analytics/webengage/user/userLog";
import { sectionTypes } from "@hooks/joinBoat/V6/useSection";
import { useCurrentPeriodStore } from "@modules/ProgressModule/PeriodTracker/store/periodStore";
import {
  getSavedPeriod,
  savePeriodInRemote,
} from "@modules/ProgressModule/PeriodTracker/store/utils";
import { useState } from "react";
import OnSaveLoadingModal from "./OnSaveLoading";
import { getDateDiff, groupConsecutiveDateStrings } from "./utils";

interface Props {
  onSaveAndNext: (
    sec: sectionTypes,
    periodLength?: number,
    cycleLength?: number
  ) => Promise<void>;
  target: "markLastPeriod" | "markBeforeLastPeriod";
  userId?: string;
  noteText?: string;
  noteTextColor?: string;
}

const OnboardPeriodSave: React.FC<Props> = ({
  target,
  onSaveAndNext,
  userId,
  noteText,
  noteTextColor,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { selectedperiodDates, consecutiveDateGroup, savePending } =
    useCurrentPeriodStore((state) => {
      const consecutiveDateGroup = groupConsecutiveDateStrings(
        Object.keys(state.selectedPeriodState)
      );

      return {
        consecutiveDateGroup: consecutiveDateGroup,
        selectedperiodDates: state.selectedPeriodState,
        savePending: state.savePending,
      };
    });

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

  const saveHandler = async () => {
    try {
      if (userId) {
        setLoading(true);

        const onlyPeriodDates = getSavedPeriod(selectedperiodDates);
        const consecutiveDateGroup =
          groupConsecutiveDateStrings(onlyPeriodDates);

        console.log("periodDates", onlyPeriodDates);
        await savePeriodInRemote(userId, onlyPeriodDates);

        if (consecutiveDateGroup.length === 1) {
          const periodLength = consecutiveDateGroup[0].length;

          await onSaveAndNext("markBeforeLastPeriod", periodLength);
        } else if (consecutiveDateGroup.length > 1) {
          const periodLength =
            consecutiveDateGroup[consecutiveDateGroup.length - 1].length;

          const dt1 = consecutiveDateGroup[consecutiveDateGroup.length - 1][0];
          const dt2 = consecutiveDateGroup[consecutiveDateGroup.length - 2][0];

          const cycleLength = getDateDiff(dt1, dt2);

          await onSaveAndNext("sleepQuality", periodLength, cycleLength);
        } else {
          onSaveAndNext(
            target === "markLastPeriod"
              ? "markBeforeLastPeriod"
              : "sleepQuality"
          );
        }

        setLoading(false);
        weEventTrack("calendar_savePeriods", {});
      }
    } catch (error: any) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <>
      {canGoNext ? (
        <div className="absolute bottom-4 left-4 right-4 flex justify-center items-center">
          <button
            onClick={saveHandler}
            className="text-white bg-[#6D55D1] w-full max-w-sm mx-auto p-4 rounded-lg"
          >
            <p className="text-white text-center">
              {savePending === "NEED_ONE_VALUE"
                ? "Select at least 1 date"
                : savePending === "READY"
                ? "Save Dates"
                : "Proceed"}
            </p>
          </button>
        </div>
      ) : noteText ? (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center bg-gradient-to-t from-[#232136] via-[#232136] pointer-events-none">
          <p
            className="font-nunitoSB text-sm p-8 pt-16"
            style={{ color: noteTextColor || "#FFFFFF" }}
          >
            Note: {noteText}
          </p>
        </div>
      ) : null}
      <OnSaveLoadingModal isOpen={loading} onCloseModal={() => {}} />
    </>
  );
};

export default OnboardPeriodSave;
