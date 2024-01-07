import {
  keepFitIcon,
  looseWeightIcon,
  pcosPcodIcon,
  regulariseCycleIcon,
} from "@constants/icons/iconURLs";
import { LocalUser } from "@hooks/joinBoat/V6/interface";
import { fitnessGoalTypes } from "@models/User/User";
import OptionBox, { optionType } from "./OptionBox";

const commonOptions: optionType[] = [
  { key: "lose_weight", text: "Lose Weight", icon: looseWeightIcon },
  { key: "keep_fit", text: "General well being", icon: keepFitIcon },
];

interface Props {
  localUser?: LocalUser | undefined;
  onFitnessGoalClick: (val: fitnessGoalTypes) => void;
}

const SetFitnessGoal: React.FC<Props> = ({ localUser, onFitnessGoalClick }) => {
  const options: optionType[] =
    localUser?.gender === "female"
      ? [
          { key: "pcos_pcod", text: "Reverse PCOS/PCOD", icon: pcosPcodIcon },
          ...commonOptions,
          {
            key: "regularise_cycle",
            text: "Regularise Your Cycle",
            icon: regulariseCycleIcon,
          },
        ]
      : commonOptions;

  return (
    <div className="grid gap-4 p-4">
      {options.map((option) => (
        <OptionBox
          key={option.key}
          option={option}
          onPress={() => onFitnessGoalClick(option.key as fitnessGoalTypes)}
          isSelected={
            localUser?.fitnessGoal &&
            localUser.fitnessGoal.length &&
            localUser.fitnessGoal[0] === (option.key as fitnessGoalTypes)
              ? true
              : false
          }
        />
      ))}
    </div>
  );
};

export default SetFitnessGoal;
