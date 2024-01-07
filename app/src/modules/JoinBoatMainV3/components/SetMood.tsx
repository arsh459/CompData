import { View } from "react-native";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { dataAddMood } from "@modules/JourneyLogHome/MoodViews/utils";
import { useEffect, useState } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { getLatestCollectionByType } from "@providers/streak/hooks/useLatestProgress";
import OptionBox, { optionType } from "./OptionBox";
import { getEmojiByMood } from "@modules/JourneyLogHome/utils";
import SvgIcons from "@components/SvgIcons";

interface Props {
  onMoodSave: (val?: number) => void;
  nextBtnText: string;
  progress?: number;
}

const SetMood: React.FC<Props> = ({ onMoodSave, nextBtnText, progress }) => {
  const [mood, onMoodUpdate] = useState<string>();

  const userId = useUserStore(({ user }) => user?.uid, shallow);

  useEffect(() => {
    const getMood = async () => {
      if (userId) {
        const latestMood = await getLatestCollectionByType(
          "mood",
          "dailyMood",
          userId
        );

        if (latestMood?.mood) {
          onMoodUpdate(latestMood.mood.toString());
        }
      }
    };

    getMood();
  }, [userId]);

  return (
    <JoinBoatWrapper
      nextBtnText={nextBtnText}
      title="How would you characterise your mood ?"
      onNext={() => mood && onMoodSave(parseInt(mood))}
      disabled={!mood}
      progress={progress}
    >
      <View className="flex flex-col-reverse p-4">
        {dataAddMood.map((each, index) => {
          const option: optionType = {
            key: each.mood.toString(),
            text: each.moodType,
            icon: getEmojiByMood(each.mood).icon,
          };
          const isSelected = mood === option.key ? true : false;

          return (
            <View
              key={option.key}
              className={index !== dataAddMood.length - 1 ? "mt-4" : ""}
            >
              <OptionBox
                option={option}
                onPress={() => onMoodUpdate(option.key)}
                isSelected={isSelected}
                reverse={true}
              >
                <View className="w-5 aspect-square rounded-full">
                  {isSelected ? (
                    <SvgIcons iconType="tick" color="#FF5970" />
                  ) : null}
                </View>
              </OptionBox>
            </View>
          );
        })}
      </View>
    </JoinBoatWrapper>
  );
};

export default SetMood;
