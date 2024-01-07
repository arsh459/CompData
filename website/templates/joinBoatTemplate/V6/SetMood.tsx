import { useEffect, useState } from "react";
import OptionBox, { optionType } from "./OptionBox";
import { getLatestCollectionByType } from "@modules/ProgressModule/PeriodTracker/hook/utils";
import { dataAddMood } from "@modules/ProgressModule/constants";
import { getEmojiByMood } from "@modules/ProgressModule/MoodTracker/utils";
import TickIcon from "@components/SvgIcons/TickIcon";
import JoinBoatWrapper from "./JoinBoatWrapper";

interface Props {
  userId?: string;
  totalSection: number;
  onMoodSave: (val: number) => void;
}

const SetMood: React.FC<Props> = ({ userId, totalSection, onMoodSave }) => {
  const [localMood, setMood] = useState<number>(-1);

  useEffect(() => {
    const getMood = async () => {
      if (userId) {
        const latestMood = await getLatestCollectionByType(
          "mood",
          "dailyMood",
          userId
        );

        if (latestMood?.mood) {
          setMood(latestMood.mood);
        }
      }
    };

    getMood();
  }, [
    userId,
    // mood,
    // onMoodUpdate,
  ]);

  return (
    <JoinBoatWrapper
      title="How would you characterise your mood ?"
      onNext={() => onMoodSave(localMood)}
      disabled={localMood < 0}
      progress={11 / totalSection}
    >
      <div className="flex flex-col-reverse p-4">
        {dataAddMood.map((each, index) => {
          const option: optionType = {
            key: each.mood.toString(),
            text: each.moodType,
            icon: getEmojiByMood(each.mood).icon,
          };
          const isSelected = each.mood === localMood ? true : false;

          return (
            <div
              key={option.key}
              className={index !== dataAddMood.length - 1 ? "mt-4" : ""}
            >
              <OptionBox
                option={option}
                onPress={() => setMood(each.mood)}
                isSelected={isSelected}
                reverse={true}
              >
                <div className="w-5 aspect-1 rounded-full">
                  {isSelected ? <TickIcon color="#FF5970" /> : null}
                </div>
              </OptionBox>
            </div>
          );
        })}
      </div>
    </JoinBoatWrapper>
  );
};

export default SetMood;
