import { View } from "react-native";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useEffect, useState } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { getLatestCollectionByType } from "@providers/streak/hooks/useLatestProgress";
import { dataAddEnergy } from "@modules/JourneyLogHome/EnergyViews/utils";
import OptionBox, { optionType } from "./OptionBox";
import { getEmojiByEnergy } from "@modules/JourneyLogHome/utils";
import SvgIcons from "@components/SvgIcons";
import { fitnessGoalTypes } from "@models/User/User";

interface Props {
  onEnergySave: (val?: number, goals?: fitnessGoalTypes[]) => void;
  nextBtnText: string;
  progress?: number;
}

const SetEnergy: React.FC<Props> = ({
  onEnergySave,
  nextBtnText,
  progress,
}) => {
  const [energy, onEnergyUpdate] = useState<string>();

  const { userId, goals } = useUserStore(
    ({ user }) => ({ userId: user?.uid, goals: user?.fitnessGoal }),
    shallow
  );

  useEffect(() => {
    const getEnergy = async () => {
      if (userId) {
        const latestEnergy = await getLatestCollectionByType(
          "energy",
          "dailyEnergy",
          userId
        );

        if (latestEnergy?.energy) {
          onEnergyUpdate(latestEnergy.energy.toString());
        }
      }
    };

    getEnergy();
  }, [userId]);

  return (
    <JoinBoatWrapper
      nextBtnText={nextBtnText}
      title="How would you characterise your energy ?"
      onNext={() => energy && onEnergySave(parseInt(energy), goals)}
      disabled={!energy}
      progress={progress}
    >
      <View className="flex flex-col-reverse p-4">
        {dataAddEnergy.map((each, index) => {
          const option: optionType = {
            key: each.energy.toString(),
            text: each.energyType,
            icon: getEmojiByEnergy(each.energy).icon,
          };
          const isSelected = energy === option.key ? true : false;

          return (
            <View
              key={option.key}
              className={index !== dataAddEnergy.length - 1 ? "mt-4" : ""}
            >
              <OptionBox
                option={option}
                onPress={() => onEnergyUpdate(option.key)}
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

export default SetEnergy;
