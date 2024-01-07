import { diagnosedPeriodType } from "@models/User/User";
import clsx from "clsx";
import { View } from "react-native";
import OptionBox, { optionType } from "./OptionBox";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";

const options: optionType[] = [
  { key: "not_diagnosed", text: "Not Diagnosed" },
  { key: "just_got_diagnosed", text: "just Got Diagnosed" },
  { key: "3_6_months", text: "3 - 6 Months" },
  { key: "more_than_6_months", text: "More than 6 Months" },
];

interface Props {
  onDiagnosedPeriodSave: (val?: diagnosedPeriodType) => void;
  nextBtnText: string;
  progress?: number;
}

const SetonDiagnosedPeriod: React.FC<Props> = ({
  onDiagnosedPeriodSave,
  nextBtnText,
  progress,
}) => {
  // console.log("RenderTest SetonDiagnosedPeriod");
  const [diagnosedPeriod, onDiagnosedPeriodUpdate] =
    useState<diagnosedPeriodType>();

  const diagnosedPeriodDB = useUserStore(
    (state) => state.user?.diagnosedPeriod,
    shallow
  );

  useEffect(() => {
    if (diagnosedPeriodDB) {
      onDiagnosedPeriodUpdate(diagnosedPeriodDB);
    }
  }, [diagnosedPeriodDB]);

  const onDiagnosedPeriodClick = (newVal?: diagnosedPeriodType) => {
    if (newVal) {
      onDiagnosedPeriodUpdate(newVal);
      onDiagnosedPeriodSave(newVal);
    }
  };

  return (
    <JoinBoatWrapper
      nextBtnText={nextBtnText}
      title="When where you diagnosed with PCOS/PCOD?"
      onNext={() => onDiagnosedPeriodClick(diagnosedPeriod)}
      disabled={!diagnosedPeriod}
      progress={progress}
    >
      <View className="flex p-4">
        {options.map((option, index) => (
          <View
            key={option.key}
            className={clsx(index !== options.length - 1 && "mb-4")}
          >
            <OptionBox
              option={option}
              onPress={() =>
                onDiagnosedPeriodClick(option.key as diagnosedPeriodType)
              }
              isSelected={
                diagnosedPeriod === (option.key as diagnosedPeriodType)
              }
            />
          </View>
        ))}
      </View>
    </JoinBoatWrapper>
  );
};

export default SetonDiagnosedPeriod;
