import {
  keepFitIcon,
  looseWeightIcon,
  pcosPcodIcon,
  regulariseCycleIcon,
} from "@constants/imageKitURL";
import { fitnessGoalTypes } from "@models/User/User";
import clsx from "clsx";
import { View } from "react-native";
import OptionBox, { optionType } from "./OptionBox";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";

const commonOptions: optionType[] = [
  { key: "lose_weight", text: "Lose Weight", icon: looseWeightIcon },
  { key: "keep_fit", text: "General well being", icon: keepFitIcon },
];

interface Props {
  onFitnessGoalSave: (goal?: fitnessGoalTypes, age?: number) => void;
  nextBtnText: string;
  progress?: number;
}

const SetFitnessGoal: React.FC<Props> = ({
  onFitnessGoalSave,
  nextBtnText,
  progress,
}) => {
  // console.log("RenderTest SetFitnessGoal");
  const [fitnessGoal, onFitnessGoalUpdate] = useState<fitnessGoalTypes>();

  const { ageDB, genderDB, fitnessGoalDB } = useUserStore((state) => {
    return {
      ageDB: state.user?.age,
      genderDB: state.user?.gender,
      fitnessGoalDB: state.user?.fitnessGoal,
    };
  }, shallow);

  useEffect(() => {
    if (fitnessGoalDB?.length) {
      onFitnessGoalUpdate(fitnessGoalDB[0]);
    }
  }, [fitnessGoalDB]);

  const onFitnessGoalClick = (val?: fitnessGoalTypes) => {
    if (val) {
      onFitnessGoalUpdate(val);
      onFitnessGoalSave(val, ageDB);
    }
  };

  const options: optionType[] =
    genderDB === "female"
      ? [
          { key: "pcos_pcod", text: "Manage PCOS/PCOD", icon: pcosPcodIcon },
          ...commonOptions,
          {
            key: "regularise_cycle",
            text: "Regularise Your Cycle",
            icon: regulariseCycleIcon,
          },
        ]
      : commonOptions;

  return (
    <JoinBoatWrapper
      nextBtnText={nextBtnText}
      title="Choose your fitness goal."
      onNext={() => onFitnessGoalClick(fitnessGoal)}
      disabled={!fitnessGoal}
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
              onPress={() => onFitnessGoalClick(option.key as fitnessGoalTypes)}
              isSelected={
                fitnessGoal === (option.key as fitnessGoalTypes) ? true : false
              }
            />
          </View>
        ))}
      </View>
    </JoinBoatWrapper>
  );
};

export default SetFitnessGoal;
