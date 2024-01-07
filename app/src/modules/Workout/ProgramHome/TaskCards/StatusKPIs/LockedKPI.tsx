import { baseImageKit, lockedIconNoKeyHole } from "@constants/imageKitURL";
import clsx from "clsx";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image } from "react-native";

interface Props {
  overlay?: boolean;
  unlockText?: string;
  unlocksNext?: number;
  unlocksAtRank?: number;
  past?: boolean;
}

const LockedKPI: React.FC<Props> = ({
  overlay,
  unlocksNext,
  unlocksAtRank,
  past,
  unlockText,
}) => {
  return (
    <LinearGradient
      colors={overlay ? ["#000000DB", "#000"] : ["transparent", "transparent"]}
      className={clsx(
        "w-full absolute left-0 right-0 top-0 bottom-0 pb-2 px-4 z-50"
      )}
    >
      {/* flex flex-col items-center justify-center */}
      <View className="absolute left-0 right-0 top-0 bottom-0 justify-center items-center flex z-50">
        <View className="pb-2">
          <Image
            source={{
              uri: `${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`,
            }}
            className="w-5 h-5 iphoneX:w-7 iphoneX:h-7"
            resizeMode="contain"
          />
        </View>
        <View className="flex items-center justify-around px-4">
          <Text className="text-sm text-white ">
            <Text
              className="font-medium text-center"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              {unlockText
                ? unlockText
                : unlocksNext
                ? `Unlocking on ${format(new Date(unlocksNext), "d MMM")}`
                : unlocksAtRank
                ? `Only for top ${unlocksAtRank} ranks`
                : past
                ? "Task has expired"
                : ""}
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LockedKPI;
