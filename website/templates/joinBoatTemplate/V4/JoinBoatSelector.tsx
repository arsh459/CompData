import {
  achievementPace,
  fitnessGoalTypes,
  workoutLocation,
} from "@models/User/User";
import { useEffect, useState } from "react";
import clsx from "clsx";
import IconSelector, { iconTypes } from "./Icons/IconSelector";

const dataArrObj: {
  [key in targetTypes]: (
    | { key: fitnessGoalTypes; icon?: iconTypes }
    | { key: workoutLocation; icon?: iconTypes }
    | { key: achievementPace; icon?: iconTypes }
  )[];
} = {
  fitnessGoal: [
    { key: "lose_weight", icon: "weight" },
    { key: "gain_muscle", icon: "muscle" },
    { key: "increase_stamina", icon: "run" },
    { key: "recovery_from_injury", icon: "recovery" },
    { key: "keep_fit", icon: "fit" },
  ],
  goalPace: [
    { key: "1_month" },
    { key: "3_months" },
    { key: "6_months" },
    { key: "just_for_fun" },
  ],
  goalLocation: [
    { key: "at_home", icon: "home" },
    { key: "at_gym", icon: "dumbbell" },
    { key: "outdoors", icon: "outdoor" },
  ],
};

type targetTypes = "fitnessGoal" | "goalPace" | "goalLocation";

interface Props {
  target: targetTypes;
  fitnessGoal?: fitnessGoalTypes[];
  goalLocation?: workoutLocation[];
  goalPace?: achievementPace;
  onGoalUpdate?: (val: fitnessGoalTypes[]) => void;
  onLocationUpdate?: (val: workoutLocation[]) => void;
  onPaceUpdate?: (val: achievementPace) => void;
}

const JoinBoatSelector: React.FC<Props> = ({
  target,
  fitnessGoal,
  goalLocation,
  goalPace,
  onGoalUpdate,
  onLocationUpdate,
  onPaceUpdate,
}) => {
  const targetArr = dataArrObj[target];
  const [selected, setSelected] = useState<
    (fitnessGoalTypes | workoutLocation | achievementPace)[]
  >([]);

  useEffect(() => {
    if (target === "fitnessGoal" && fitnessGoal) {
      setSelected(fitnessGoal);
    } else if (target === "goalLocation" && goalLocation) {
      setSelected(goalLocation);
    } else if (target === "goalPace" && goalPace) {
      setSelected([goalPace]);
    }
  }, [target]);

  const handlePress = (
    val: fitnessGoalTypes | workoutLocation | achievementPace
  ) => {
    const remoteSelected = target === "goalPace" ? [] : [...selected];
    const ind = remoteSelected.indexOf(val);

    if (ind !== -1) {
      remoteSelected.splice(ind, 1);
    } else {
      remoteSelected.push(val);
    }

    if (target === "fitnessGoal" && onGoalUpdate) {
      onGoalUpdate(remoteSelected as fitnessGoalTypes[]);
    } else if (target === "goalLocation" && onLocationUpdate) {
      onLocationUpdate(remoteSelected as workoutLocation[]);
    } else if (target === "goalPace" && onPaceUpdate) {
      onPaceUpdate(val as achievementPace);
    }

    setSelected(remoteSelected);
  };

  return (
    <div>
      {targetArr.map((each) => (
        <div
          key={each.key}
          className={clsx(
            "m-3 iphoneX:m-4 p-3 iphoneX:p-4 border border-[#F5F8FF] rounded-lg flex items-center",
            selected.includes(each.key)
              ? "bg-[#F5F5F7] text-[#100F1A]"
              : "text-[#F5F5F7] bg-transparent"
          )}
          onClick={() => handlePress(each.key)}
        >
          {each.icon ? (
            <div className="w-4 iphoneX:w-5 h-4 iphoneX:h-5 mr-3 iphoneX:mr-4">
              <IconSelector
                iconType={each.icon}
                color={selected.includes(each.key) ? "#100F1A" : "#F5F5F7"}
              />
            </div>
          ) : null}
          <h6 className="flex-1 iphoneX:text-xl capitalize">
            {each.key.replaceAll("_", " ")}
          </h6>
          <img
            src={`https://ik.imagekit.io/socialboat/Component_1__kBZ1v1S2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658917102509`}
            className={clsx(
              "w-4 iphoneX:w-5 h-4 iphoneX:h-5 object-contain",
              selected.includes(each.key) ? "" : "opacity-0"
            )}
            alt="selected icon"
          />
        </div>
      ))}
    </div>
  );
};

export default JoinBoatSelector;
