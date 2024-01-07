import {
  acneIcon,
  badMoodIcon,
  fatigueIcon,
  facialAndExcessHairIcon,
} from "@constants/icons/iconURLs";
import { LocalUser } from "@hooks/joinBoat/V6/interface";
import { pcosSymptoms } from "@models/User/User";
import OptionBox, { optionType } from "./OptionBox";

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
  localUser?: LocalUser | undefined;
  onPcosSymptomsUpdate: (val: pcosSymptoms) => void;
}

const SetPcosSymptoms: React.FC<Props> = ({
  localUser,
  onPcosSymptomsUpdate,
}) => {
  return (
    <div className="grid grid-cols-2 auto-rows-fr gap-4 p-4">
      {options.map((option) => (
        <OptionBox
          key={option.key}
          option={option}
          onPress={() => onPcosSymptomsUpdate(option.key as pcosSymptoms)}
          isSelected={
            localUser?.pcosSymptoms
              ? localUser.pcosSymptoms.includes(option.key as pcosSymptoms)
              : false
          }
          verticle={true}
        />
      ))}
    </div>
  );
};

export default SetPcosSymptoms;
