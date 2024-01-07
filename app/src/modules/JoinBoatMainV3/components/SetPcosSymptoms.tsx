import {
  acneIcon,
  badMoodIcon,
  fatigueIcon,
  facialAndExcessHairIcon,
} from "@constants/imageKitURL";
import { pcosSymptoms } from "@models/User/User";
import { View } from "react-native";
import OptionBox, { optionType } from "./OptionBox";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";

export const options: optionType[] = [
  { key: "acne", text: "Acne", icon: acneIcon },
  { key: "fatigue", text: "Fatigue", icon: fatigueIcon },
  {
    key: "facial_and_excess_hair",
    text: "Facial and excess hair",
    icon: facialAndExcessHairIcon,
  },
  { key: "bad_mood", text: "Feeling Unhappy", icon: badMoodIcon },
];

interface Props {
  onPcosSymptomsSave: (val?: pcosSymptoms[]) => void;
  nextBtnText: string;
  progress?: number;
}

const SetPcosSymptoms: React.FC<Props> = ({
  onPcosSymptomsSave,
  nextBtnText,
  progress,
}) => {
  const [symptoms, onSymptomsUpdate] = useState<pcosSymptoms[]>([]);

  const pcosSymptomsDB = useUserStore(
    (state) => state.user?.pcosSymptoms,
    shallow
  );

  useEffect(() => {
    if (pcosSymptomsDB) {
      onSymptomsUpdate(pcosSymptomsDB);
    }
  }, [pcosSymptomsDB]);

  const handleSymptomsUpdate = (val: pcosSymptoms, isSelected: boolean) => {
    onSymptomsUpdate((prev) => {
      if (isSelected) {
        return prev.filter((each) => each !== val);
      } else {
        return [...prev, val];
      }
    });
  };

  return (
    <JoinBoatWrapper
      title="Do you have any of the following symptoms?"
      onNext={() => onPcosSymptomsSave(symptoms)}
      disabled={!symptoms}
      nextBtnText={nextBtnText}
      progress={progress}
    >
      <View className="flex flex-row flex-wrap p-2">
        {options.map((option) => {
          console.log;
          const isSelected = symptoms.includes(option.key as pcosSymptoms);
          return (
            <View key={option.key} className="w-1/2 aspect-square p-2">
              <OptionBox
                option={option}
                onPress={() =>
                  handleSymptomsUpdate(option.key as pcosSymptoms, isSelected)
                }
                isSelected={isSelected}
                verticle={true}
              />
            </View>
          );
        })}
      </View>
    </JoinBoatWrapper>
  );
};

export default SetPcosSymptoms;
