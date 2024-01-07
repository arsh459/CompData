import { useEffect, useState } from "react";
import SvgIcons from "@components/SvgIcons";
import {
  achievementPace,
  fitnessGoalTypes,
  workoutLocation,
} from "@models/User/User";
import clsx from "clsx";
import { Image, Pressable, Text, View } from "react-native";
import { redRightTic } from "@constants/imageKitURL";

type joinBoatIconTypes =
  | "weight"
  | "muscle"
  | "run"
  | "recovery"
  | "fit"
  | "home"
  | "dumbbell"
  | "outdoor";

const dataArrObj: {
  [key in targetTypes]: (
    | { key: fitnessGoalTypes; name: string; icon?: joinBoatIconTypes }
    | { key: workoutLocation; name: string; icon?: joinBoatIconTypes }
    | { key: achievementPace; name: string; icon?: joinBoatIconTypes }
  )[];
} = {
  fitnessGoal: [
    { key: "lose_weight", name: "Lose Weight", icon: "weight" },
    { key: "gain_muscle", name: "Gain Muscle", icon: "muscle" },
    { key: "increase_stamina", name: "Increase Stamina", icon: "run" },
    {
      key: "recovery_from_injury",
      name: "Recovery From Injury",
      icon: "recovery",
    },
    { key: "keep_fit", name: "Keep Fit", icon: "fit" },
  ],
  goalPace: [
    { key: "1_month", name: "1 Month" },
    { key: "3_months", name: "3 Months" },
    { key: "6_months", name: "6 Months" },
    { key: "just_for_fun", name: "Just For Fun" },
  ],
  goalLocation: [
    { key: "at_home", name: "At Home", icon: "home" },
    { key: "at_gym", name: "At Gym", icon: "dumbbell" },
    { key: "outdoors", name: "Outdoors", icon: "outdoor" },
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
  }, [target, fitnessGoal, goalLocation, goalPace]);

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
    <View>
      {targetArr.map((each) => (
        <Pressable
          key={each.key}
          className={clsx(
            "mb-4 p-3 iphoneX:p-4 border border-[#F5F8FF] rounded-lg flex flex-row items-center",
            selected.includes(each.key) ? "bg-[#F5F5F7]" : "bg-transparent"
          )}
          onPress={() => handlePress(each.key)}
        >
          {each.icon ? (
            <View className="w-4 iphoneX:w-5 h-4 iphoneX:h-5 mr-3 iphoneX:mr-4">
              <SvgIcons
                iconType={each.icon}
                color={selected.includes(each.key) ? "#100F1A" : "#F5F5F7"}
              />
            </View>
          ) : null}
          <Text
            className={clsx(
              "flex-1 iphoneX:text-xl capitalize",
              selected.includes(each.key) ? "text-[#100F1A]" : "text-[#F5F5F7]"
            )}
          >
            {each.name}
          </Text>
          <Image
            source={{ uri: redRightTic }}
            className={clsx(
              "w-4 iphoneX:w-5 h-4 iphoneX:h-5",
              selected.includes(each.key) ? "" : "opacity-0"
            )}
            resizeMode="contain"
          />
        </Pressable>
      ))}
    </View>
  );
};

export default JoinBoatSelector;
