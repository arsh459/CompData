import { View, Text, TouchableOpacity } from "react-native";
import { CycleRegularityTypes } from "@models/User/User";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useEffect, useState } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import clsx from "clsx";

interface Props {
  progress: number;
  onCycleRegularitySave: (
    cycleRegularity?: CycleRegularityTypes,
    periodLength?: number
  ) => void;
}

const CycleRegularity: React.FC<Props> = ({
  progress,
  onCycleRegularitySave,
}) => {
  const [cycleRegularity, onCycleRegularityUpdate] =
    useState<CycleRegularityTypes>();

  const { cycleRegularityDB, periodLengthDB } = useUserStore((state) => {
    return {
      cycleRegularityDB: state.user?.periodTrackerObj?.cycleRegularity,
      periodLengthDB: state.user?.periodTrackerObj?.inputPeriodLength,
    };
  }, shallow);

  // console.log("cycleRegularity", cycleRegularity);

  const onNext = (val: CycleRegularityTypes) => {
    onCycleRegularityUpdate(val);
    onCycleRegularitySave(val, periodLengthDB || 5);
  };

  const onNextMain = () => {
    onCycleRegularitySave(cycleRegularity, periodLengthDB || 5);
  };

  useEffect(() => {
    if (cycleRegularityDB) {
      onCycleRegularityUpdate(cycleRegularityDB);
    }
  }, [cycleRegularityDB]);

  return (
    <JoinBoatWrapper
      disabled={!cycleRegularity}
      progress={progress}
      nextBtnText={cycleRegularity ? "Proceed" : ""}
      onNext={onNextMain}
      title="Is your cycle Regular?"
    >
      <View className="p-4 gap-4">
        <TouchableOpacity
          onPress={() => onNext("CAN_PREDICT")}
          className="rounded-2xl p-4"
          style={{
            backgroundColor:
              cycleRegularity === "CAN_PREDICT" ? "#FFFFFF" : "#343150",
          }}
        >
          <Text
            className={clsx(
              cycleRegularity === "CAN_PREDICT"
                ? "text-[#232136]"
                : "text-[#3EE778]",
              "text-base text-center  "
            )}
            style={{ fontFamily: "Nunito-Bold" }}
          >
            I can predict my period
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNext("CHANGES")}
          className="rounded-2xl p-4"
          style={{
            backgroundColor:
              cycleRegularity === "CHANGES" ? "#FFFFFF" : "#343150",
          }}
        >
          <Text
            className={clsx(
              cycleRegularity === "CHANGES"
                ? "text-[#232136]"
                : "text-[#E7A33E]",
              "text-base text-center"
            )}
            style={{ fontFamily: "Nunito-Bold" }}
          >
            My period date fluctuates alot
          </Text>
        </TouchableOpacity>
      </View>
    </JoinBoatWrapper>
  );
};

export default CycleRegularity;
