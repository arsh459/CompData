import { UserInterface } from "@models/User/User";
import ProgressHeader from "@modules/ProgressModule/Components/ProgressHeader";
import PeriodCalender from "@modules/ProgressModule/PeriodTracker/PeriodCalender";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { usePeriodCycles } from "@modules/ProgressModule/PeriodTracker/hook/usePeriodCycles";
import { usePeriodDatesForUser } from "@modules/ProgressModule/PeriodTracker/hook/usePeriodDatesForUser";
import { useCurrentPeriodStore } from "@modules/ProgressModule/PeriodTracker/store/periodStore";
import { savePeriodInRemote } from "@modules/ProgressModule/PeriodTracker/store/utils";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  remoteUser?: UserInterface;
}

const LogPeriod: React.FC<Props> = ({ remoteUser: user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // fetch cycles
  usePeriodCycles(user?.uid);
  usePeriodDatesForUser(user?.uid);

  const onBack = () => {
    router.back();
  };

  const { selectedDates, savePending, onChangeSavePending, onSave } =
    useCurrentPeriodStore((state) => ({
      selectedDates: state.selectedState,
      savePending: state.savePending,
      onChangeSavePending: state.onChangeSavePending,
      onSave: state.onSave,
    }));

  const saveHandler = async () => {
    try {
      if (user?.uid) {
        const savedPeriods: string[] = [];
        Object.keys(selectedDates).map((item) => {
          if (selectedDates[item] === "PERIOD") {
            savedPeriods.push(item);
          }
        });

        if (savedPeriods.length > 0) {
          setLoading(true);
          await onSave();
          await savePeriodInRemote(user.uid, savedPeriods);

          setLoading(false);
          onBack();
        } else {
          onChangeSavePending("NEED_ONE_VALUE");
        }

        weEventTrack("calendar_savePeriods", {});
      }
    } catch (error: any) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg h-full mx-auto flex flex-col">
        <ProgressHeader
          onBack={onBack}
          text={`${user?.name}'s Weight Journey `}
        />
        <div className="bg-[#FFECF5] rounded-3xl p-4 md:flex gap-4">
          <PeriodCalender isEditable={true} uid={user?.uid} />
        </div>
        {savePending !== "NONE" ? (
          <button
            disabled={loading}
            onClick={saveHandler}
            className="bg-[#E089B5] text-white w-1/4 min-w-max px-8 py-3 m-4 rounded-xl mx-auto"
          >
            {loading
              ? "Saving..."
              : savePending === "NEED_ONE_VALUE"
              ? "Select at least 1 date"
              : "Save Dates"}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default LogPeriod;
