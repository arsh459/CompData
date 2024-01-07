import { lightningIcon } from "@constants/imageKitURL";
import { workoutFrequencyTypes } from "@models/User/User";
import clsx from "clsx";
import { Image, View } from "react-native";
import OptionBox, { optionType } from "./OptionBox";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useEffect, useState } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const options: optionType[] = [
  { key: "none", text: "Need to start" },
  { key: "1_3", text: "1 - 3 times / week" },
  { key: "2_5", text: "2 - 5 times / week" },
  { key: "everyday", text: "Everyday" },
];

interface Props {
  onWorkoutFrequencySave: (val?: workoutFrequencyTypes) => void;
  nextBtnText: string;
  progress?: number;
}

const SetWorkoutFrequency: React.FC<Props> = ({
  onWorkoutFrequencySave,
  nextBtnText,
  progress,
}) => {
  const [workoutFrequency, onWorkoutFrequencyUpdate] =
    useState<workoutFrequencyTypes>();

  const workoutFrequencyDB = useUserStore(
    (state) => state.user?.workoutFrequency,
    shallow
  );

  useEffect(() => {
    if (workoutFrequencyDB) {
      onWorkoutFrequencyUpdate(workoutFrequencyDB);
    }
  }, [workoutFrequencyDB]);

  const onWorkoutFrequencyClick = (newVal: workoutFrequencyTypes) => {
    onWorkoutFrequencyUpdate(newVal);
    onWorkoutFrequencySave(newVal);
  };

  return (
    <JoinBoatWrapper
      title="How often do you currently workout?"
      onNext={() => onWorkoutFrequencySave(workoutFrequency)}
      disabled={!workoutFrequency}
      nextBtnText={nextBtnText}
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
                onWorkoutFrequencyClick(option.key as workoutFrequencyTypes)
              }
              isSelected={
                workoutFrequency === (option.key as workoutFrequencyTypes)
              }
            >
              {index ? (
                <View className="bg-[#100F1A] flex flex-row rounded-full px-3 py-2">
                  {Array.from(Array(index)).map((_, ind) => (
                    <Image
                      key={`lightning-${ind}`}
                      source={{ uri: lightningIcon }}
                      className="w-2.5 aspect-square object-contain mr-px"
                    />
                  ))}
                </View>
              ) : null}
            </OptionBox>
          </View>
        ))}
      </View>
    </JoinBoatWrapper>
  );
};

export default SetWorkoutFrequency;
