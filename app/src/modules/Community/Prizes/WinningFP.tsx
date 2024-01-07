import { badgeTypes } from "@models/Prizes/Prizes";
import { getbadgeColor } from "./Badges/utils";
import clsx from "clsx";
import { Text, View } from "react-native";
import { CloudinaryMedia, AWSMedia } from "@models/Media/MediaTypeInterface";
import UserImage from "@components/UserImage";

interface Props {
  isMe: boolean;
  name: string;
  points: number;
  myPoints: number;
  badgeType: badgeTypes;
  isGoalWidget?: boolean;
  image?: CloudinaryMedia | AWSMedia;
}

const WinningFP: React.FC<Props> = ({
  isMe,
  name,
  image,
  points,
  myPoints,
  badgeType,
  isGoalWidget,
}) => {
  return (
    <View className="bg-gradient-to-b from-[#242424] via-[#262626] to-[#1A1A1A] rounded-xl">
      <View className="flex flex-row justify-center items-center pb-2">
        <UserImage image={image} name={name} width="w-8" height="h-8" />
        <Text
          className={clsx(
            isGoalWidget
              ? "text-[8px] iphoneX:text-[10px]"
              : "text-[10px] iphoneX:text-xs",
            "pl-2.5 text-white"
          )}
          style={{ color: isMe ? "#6EC576" : getbadgeColor(badgeType).color1 }}
        >
          {name} is Winning at {points} Fitpoints
        </Text>
      </View>
      <View
        className={clsx(
          isGoalWidget ? "text-xs iphoneX:text-sm" : "iphoneX:text-lg",
          "bg-[#575757] rounded-xl flex flex-row justify-between items-center p-2"
        )}
      >
        <Text className="text-white ">Your Fitpoints</Text>
        <Text className="text-white pl-4">{myPoints}FP</Text>
      </View>
    </View>
  );
};

export default WinningFP;
