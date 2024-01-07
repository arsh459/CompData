import { lightningIcon } from "@constants/icons/iconURLs";
import { LocalUser } from "@hooks/joinBoat/V6/interface";
import { workoutFrequencyTypes } from "@models/User/User";
import OptionBox, { optionType } from "./OptionBox";

const options: optionType[] = [
  { key: "none", text: "Need to start" },
  { key: "1_3", text: "1 - 3 times / week" },
  { key: "2_5", text: "2 - 5 times / week" },
  { key: "everyday", text: "Everyday" },
];

interface Props {
  localUser?: LocalUser | undefined;
  onWorkoutFrequencyClick: (val: workoutFrequencyTypes) => void;
}

const SetWorkoutFrequency: React.FC<Props> = ({
  localUser,
  onWorkoutFrequencyClick,
}) => {
  return (
    <div className="grid gap-4 p-4">
      {options.map((option, index) => (
        <OptionBox
          key={option.key}
          option={option}
          onPress={() =>
            onWorkoutFrequencyClick(option.key as workoutFrequencyTypes)
          }
          isSelected={
            localUser?.workoutFrequency ===
            (option.key as workoutFrequencyTypes)
          }
        >
          {index ? (
            <div className="bg-[#100F1A] flex rounded-full px-3 py-2">
              {Array.from(Array(index)).map((_, ind) => (
                <img
                  key={`lightning-${ind}`}
                  src={lightningIcon}
                  alt={`lightning-${ind}`}
                  className="w-2.5 object-contain mr-px"
                />
              ))}
            </div>
          ) : null}
        </OptionBox>
      ))}
    </div>
  );
};

export default SetWorkoutFrequency;
