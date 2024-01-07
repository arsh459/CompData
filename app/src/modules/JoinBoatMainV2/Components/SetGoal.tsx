import { LocalUser } from "@hooks/user/useLocalUserV2";
import { fitnessGoalTypes } from "@models/User/User";
import clsx from "clsx";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface Props {
  localUser?: LocalUser | undefined;
  onGoalUpdate: (val: fitnessGoalTypes) => void;
}

const SetGoal: React.FC<Props> = ({ localUser, onGoalUpdate }) => {
  const hasVal = (key: fitnessGoalTypes) => {
    if (localUser?.fitnessGoal?.includes(key)) {
      return true;
    }
    return false;
  };

  return (
    <View className="p-4">
      <TouchableOpacity
        className={clsx(
          "px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("lose_weight") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onPress={() => onGoalUpdate("lose_weight")}
      >
        <Text
          className={clsx(
            "flex-1 text-xl iphoneX:text-2xl capitalize",
            hasVal("lose_weight") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          Lose Weight
        </Text>
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Vector_rho83m8Ts.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666001190124",
          }}
          className="w-12 iphoneX:w-16 aspect-square"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View className="h-6" />
      <TouchableOpacity
        className={clsx(
          "px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("gain_muscle") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onPress={() => onGoalUpdate("gain_muscle")}
      >
        <Text
          className={clsx(
            "flex-1 text-xl iphoneX:text-2xl capitalize",
            hasVal("gain_muscle") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          Gain Muscle
        </Text>
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Vector_511_BoX1lT5KQ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666001190109",
          }}
          className="w-16 iphoneX:w-20"
          style={{ aspectRatio: 80 / 70 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SetGoal;
