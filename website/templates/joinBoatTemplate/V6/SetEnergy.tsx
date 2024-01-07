import { useEffect, useState } from "react";
import OptionBox, { optionType } from "./OptionBox";
import { getLatestCollectionByType } from "@modules/ProgressModule/PeriodTracker/hook/utils";
import { dataAddEnergy } from "@modules/ProgressModule/constants";
import { getEmojiByEnergy } from "@modules/ProgressModule/EnergyTracker/utils";
import TickIcon from "@components/SvgIcons/TickIcon";
import JoinBoatWrapper from "./JoinBoatWrapper";

interface Props {
  userId?: string;
  totalSection: number;
  onEnergySave: (val: number) => void;
}

const SetEnergy: React.FC<Props> = ({ userId, totalSection, onEnergySave }) => {
  const [localEnergy, setEnergy] = useState<number>(-1);

  useEffect(() => {
    const getEnergy = async () => {
      if (userId) {
        const latestEnergy = await getLatestCollectionByType(
          "energy",
          "dailyEnergy",
          userId
        );

        if (latestEnergy?.energy) {
          setEnergy(latestEnergy.energy);
        }
      }
    };

    getEnergy();
  }, [userId]);

  return (
    <JoinBoatWrapper
      title="How would you characterise your energy ?"
      onNext={() => onEnergySave(localEnergy)}
      disabled={localEnergy < 0}
      progress={12 / totalSection}
    >
      <div className="flex flex-col-reverse p-4">
        {dataAddEnergy.map((each, index) => {
          const option: optionType = {
            key: each.energy.toString(),
            text: each.energyType,
            icon: getEmojiByEnergy(each.energy).icon,
          };
          const isSelected = each.energy === localEnergy ? true : false;

          return (
            <div
              key={option.key}
              className={index !== dataAddEnergy.length - 1 ? "mt-4" : ""}
            >
              <OptionBox
                option={option}
                onPress={() => setEnergy(each.energy)}
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

export default SetEnergy;
